const { userModel } = require("../model/auth");
const {
  hashPassword,
  comparePasswords,
  generateToken,
} = require("../utils/auth");

async function register({ name, phone, password, email }) {
  const existingUser = await userModel.findOne({
    $or: [{ email }, { phone }],
  });

  if (existingUser) {
    throw new Error("User already exists with this email or phone");
  }

  const hashedPassword = await hashPassword(password);

  const user = await userModel.create({
    name,
    phone,
    password: hashedPassword,
    email,
  });

  const token = generateToken(user._id);

  const userObject = user.toObject();
  delete userObject.password;

  return {
    ...userObject,
    token,
  };
}

async function login({ email, phone, password }) {
  if (!email && !phone) {
    throw new Error("Email or phone is required");
  }

  // Find user by email or phone
  const user = await userModel.findOne({
    $or: [{ email }, { phone }],
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  // Check password
  const isMatch = await comparePasswords(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  // Generate token
  const token = generateToken(user._id);

  // Return user data without password and with token
  const userObject = user.toObject();
  delete userObject.password;

  return {
    ...userObject,
    token,
  };
}

async function getMe(userId) {
  const user = await userModel.findById(userId).select("-password");
  if (!user) {
    throw new Error("User not found");
  }
  return user;
}

module.exports = {
  register,
  login,
  getMe,
};
