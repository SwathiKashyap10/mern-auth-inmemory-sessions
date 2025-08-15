const { getUser } = require("../utils/sessionMapping");

async function protect(req, res, next) {
  const userId = req.cookies.uid;

  // No cookie found
  if (!userId) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: No session found",
    });
  }

  // Look up user from session mapping
  const user = getUser(userId);
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid or expired session",
    });
  }

  // Attach user to request object for use in next middleware/controller
  req.user = user;
  next();
}

module.exports = protect;
