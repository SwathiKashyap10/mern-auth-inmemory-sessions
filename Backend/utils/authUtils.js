// utils/authUtils.js
const { getUser } = require("./sessionMapping");

// Check if user is authenticated (returns boolean)
function checkAuth(req) {
  const sessionId = req.cookies?.uid;
  if (!sessionId) return false;

  const user = getUser(sessionId);
  if (!user) return false;

  return true;
}

// Get logged-in user object (or null)
function getLoggedInUser(req) {
  const sessionId = req.cookies?.uid;
  if (!sessionId) return null;

  return getUser(sessionId) || null;
}

module.exports = { checkAuth, getLoggedInUser };
