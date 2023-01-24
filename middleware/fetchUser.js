const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const fetchUser = (req, res, next) => {
  const token = req.header("auth-token");

  if (!token) {
    return res.status(401).json({ error: "Please try using valid token." });
  }
  try {
    // Verifying if the token is valid
    const data = jwt.verify(token, JWT_SECRET);
    // Extracting user from data
    const user = data.user;
    req.user = user;
    // Sending it into the next method/function
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({error});
  }
};

module.exports = fetchUser;
