// utils/authUtils.js
const { getUser } = require("./sessionMapping");

// Check if user is authenticated (returns boolean)
function checkAuth(req) {
  try {
    const sessionId = req.cookies?.uid;
    if (!sessionId) return false;

    const user = getUser(sessionId);
    if (!user) return false;

    return true;
  } catch (error) {
    console.error("Error in checkAuth:", error);
    return false;
  }
}


// Get logged-in user object (or null)
function getLoggedInUser(req) {
  try {
    const sessionId = req.cookies?.uid;
    if (!sessionId) return null;

    return getUser(sessionId) || null;
  } catch (error) {
    console.error("Error in getLoggedInUser:", error);
    return null;
  }
}


module.exports = { checkAuth, getLoggedInUser };
