import fs from "fs";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

// ✅ Correct way for ESM projects
const pdfParseImport = require("pdf-parse");
const pdfParse = typeof pdfParseImport === "function" ? pdfParseImport : pdfParseImport.default;

// ✅ Sentiment import (handles both ESM/CommonJS)
import SentimentLib from "sentiment";
const Sentiment = SentimentLib.default || SentimentLib;
const sentiment = new Sentiment();

import User from "../models/User.js";

function getScoreFromText(text, domain) {
  const lower = text.toLowerCase();
  let keywordScore = lower.includes(domain.toLowerCase()) ? 70 : 30;
  const sentimentScore = Math.min(100, Math.max(0, Math.round(((sentiment.analyze(text).score + 10) / 20) * 100)));
  return Math.round((keywordScore * 0.6) + (sentimentScore * 0.4));
}

export const verifyExpertise = async (req, res) => {
  try {
    const userId = req.body.userId;
    const { fullName, domain, linkedinUrl, learningDomain } = req.body; // ✅ changed: frontend sends 'domain'
    const resume = req.files?.resume?.[0];
    const certificate = req.files?.certificate?.[0];

    let resumeScore = 0;
    let certScore = 0;
    let linkedinScore = 0;

    // Resume parsing
    if (resume) {
      const data = await pdfParse(fs.readFileSync(resume.path));
      resumeScore = getScoreFromText(data.text, domain);
      fs.unlinkSync(resume.path);
    }

    // Certificate parsing
    if (certificate) {
      const data = await pdfParse(fs.readFileSync(certificate.path));
      certScore = getScoreFromText(data.text, domain);
      fs.unlinkSync(certificate.path);
    }

    // LinkedIn simple check
    if (linkedinUrl && linkedinUrl.includes("linkedin.com")) {
      linkedinScore = 85;
    }

    const finalScore = Math.round(
      resumeScore * 0.5 + certScore * 0.5 + linkedinScore * 0.2
    );
    const isVerified = finalScore >= 80;

    // ✅ Update user properly
    await User.findByIdAndUpdate(
      userId,
      {
        fullName,
        bio: req.body.bio,
        expertiseDomain: domain,       // ✅ Correct mapping
        learningDomain: learningDomain || "", // ✅ Preserve if sent later
        expertVerificationScore: finalScore,
        isExpertVerified: isVerified,
        isOnboarded: true,
      },
      { new: true }
    );

    return res.json({
      success: true,
      finalScore, // ✅ make sure frontend uses this
      isVerified,
      message: isVerified
        ? "Expert verified successfully"
        : "Profile updated but not verified. Minimum 80% required.",
    });
  } catch (err) {
    console.error("Expert verification error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
