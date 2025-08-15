const express = require("express");
const router = express.Router();
const {handelUserSignup,handelUserLogin} = require("../controllers/user")
const { checkAuth, getLoggedInUser } = require("../utils/authUtils");
const {getUser,deleteUser} = require("../utils/sessionMapping");

router.post("/",handelUserSignup);
router.post("/login",handelUserLogin);
router.post("/logout", (req, res) => {
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
});


router.get("/check-auth", (req, res) => {
  if (!checkAuth(req)) {
    return res.status(401).json({ isAuth: false });
  }

  const user = getLoggedInUser(req);
  return res.status(200).json({ isAuth: true});
});

router.get("/profile", (req, res) => {
  if (!checkAuth(req)) {
    return res.status(401).json({ success:false,message: "Unauthorized",user: null });
  }

  const user = getLoggedInUser(req);
  res.json({ success: true,message: "Profile fetched", user:user });
});

module.exports = router;