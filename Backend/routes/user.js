const express = require("express");
const router = express.Router();
const {handelUserSignup,handelUserLogin} = require("../controllers/user")
const { checkAuth, getLoggedInUser } = require("../utils/authUtils");
const {getUser,deleteUser} = require("../utils/sessionMapping");

router.post("/",handelUserSignup);
router.post("/login",handelUserLogin);

router.post("/logout", (req, res) => {
  try {
    const sessionId = req.cookies?.uid;

    if (!sessionId) {
      return res.status(200).json({ success: false, message: "No active session" });
    }

    const user = getUser(sessionId);

    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid session" });
    }

    deleteUser(sessionId); // Remove from in-memory store

    // Ensure cookie is cleared with same options as set in login
    res.clearCookie("uid", {
      httpOnly: true,
      secure: false,
      sameSite: "lax"
    });

    return res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.error("Error during logout:", error);
    return res.status(500).json({ success: false, message: "Server error while logging out" });
  }
});


router.get("/check-auth", (req, res) => {
  try {
    if (!checkAuth(req)) {
      return res.status(401).json({ success: false, message: "User is not authenticated" });
    }

    const user = getLoggedInUser(req);
    return res.status(200).json({ success: true, message: "User is authenticated", user });
  } catch (error) {
    console.error("Error checking authentication:", error);
    return res.status(500).json({ success: false, message: "Server error while checking authentication" });
  }
});



router.get("/profile", (req, res) => {
  try {
    if (!checkAuth(req)) {
      return res.status(401).json({ success: false, message: "Unauthorized", user: null });
    }

    const user = getLoggedInUser(req);
    res.json({ success: true, message: "Profile fetched", user: user });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ success: false, message: "Server error while fetching profile" });
  }
});


module.exports = router;