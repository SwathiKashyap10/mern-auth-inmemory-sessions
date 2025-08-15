const {v4:uuidv4} = require("uuid");
const User = require("../models/User");
const {setUser} = require("../utils/sessionMapping");
const bcrypt = require("bcrypt");

async function handelUserSignup(req, res) {
  try {
    const { name, email, password } = req.body;

    // 1. Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // 2. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already in use" });
    }

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Create user
    await User.create({ name, email, password: hashedPassword });
    //or 
    //const user = new User({ name, email, password });
    //await user.save();
    //You’d use .save() when:
    // You first create an object in memory
    //const user = new User({ name, email, password });
    // Do some modifications before saving
    //user.role = "admin";
    // Save it to DB
    //await user.save();

    // 5. Respond
    return res.status(201).json({ success: true, message: "Signup successful" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}


async function handelUserLogin(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: "Wrong Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Wrong Credentials" });
    }

    // creating session id for the user 
    const sessionId = uuidv4();
    // mapping the sessionId with the user and storing it
    setUser(sessionId, user);

    res.cookie("uid", sessionId, {
      httpOnly: true, // safer from XSS attacks
      secure: false,  // set to true in production (to use HTTPS)
      sameSite: "lax" // set "none" in production
      // If frontend & backend are on same domain → sameSite: "strict" or "lax".
      // If on different domains → sameSite: "none", secure: true.
    });

    return res.status(200).json({
      success: true,
      message: "Login successful"
    });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ success: false, message: "Server error during login" });
  }
}



module.exports = {handelUserSignup,handelUserLogin};