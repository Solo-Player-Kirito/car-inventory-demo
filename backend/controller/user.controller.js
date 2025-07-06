const {
  register,
  login,
  getMe,
} = require("../controller_servies/user.service");
const { generateToken } = require("../utils/auth");

module.exports = {
  register: async (req, res) => {
    try {
      const { name, email, password, phone } = req.body;

      if (!name || !email || !password || !phone) {
        return res.status(400).json({
          success: false,
          message: "All fields (name, email, password, phone) are required",
        });
      }

      const result = await register({ name, email, password, phone });

      return res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: {
          user: {
            id: result._id,
            name: result.name,
            email: result.email,
            phone: result.phone,
            createdAt: result.createdAt,
          },
          token: generateToken(result._id),
        },
      });
    } catch (err) {
      console.error("Error in registration:", err);

      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },

  login: async (req, res) => {
    try {
      const { email, phone, password } = req.body;

      if (!email && !phone) {
        return res.status(400).json({
          success: false,
          message: "Email or phone is required for login",
        });
      }

      if (!password) {
        return res.status(400).json({
          success: false,
          message: "Password is required",
        });
      }

      const result = await login({ email, phone, password });

      return res.status(200).json({
        success: true,
        message: "Login successful",
        data: {
          user: {
            id: result._id,
            name: result.name,
            email: result.email,
            phone: result.phone,
          },
          token: generateToken(result._id),
        },
      });
    } catch (err) {
      console.error("Error in login:", err);

      // Handle invalid credentials
      if (err.message === "Invalid credentials") {
        return res.status(401).json({
          success: false,
          message: "Invalid email/phone or password",
        });
      }

      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: process.env.NODE_ENV === "development" ? err.message : undefined,
      });
    }
  },

  getMe: async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await getMe(userId);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          createdAt: user.createdAt,
        },
      });
    } catch (err) {
      console.error("Error fetching user profile:", err);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch user profile",
        error: process.env.NODE_ENV === "development" ? err.message : undefined,
      });
    }
  },
};
