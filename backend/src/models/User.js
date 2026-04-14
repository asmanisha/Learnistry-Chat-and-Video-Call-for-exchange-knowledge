import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    bio: {
      type: String,
      default: "",
    },

    profilePic: {
      type: String,
      default: "",
    },

    // 🔹 Expert Verification Fields
    expertVerificationScore: {
      type: Number,
      default: 0,
    },
    isExpertVerified: {
      type: Boolean,
      default: false,
    },
    expertiseDomain: {
      type: String,
      default: "",
    },
    learningDomain: {
      type: String,
      default: "",
    },

    // 🔹 Location and Onboarding
    location: {
      type: String,
      default: "",
    },
    isOnboarded: {
      type: Boolean,
      default: false,
    },

    // 🔹 Friend System
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

//
// 🔒 Hash password before saving
//
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

//
// 🔑 Compare entered password with stored hash
//
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//
// 🏷 Export Model
//
const User = mongoose.model("User", userSchema);
export default User;
