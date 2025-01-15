const jwt = require("jsonwebtoken");
const JWT_PASS = "your-secret-key"; // Use environment variables in production

function auth(req, res, next) {
  const token = req.header("token");
  if (!token) {
    return res.status(401).json({ msg: "No token provided" });
  }

  try {
    const decodedData = jwt.verify(token, JWT_PASS);
    req.userId = decodedData.id;
    next();
  } catch (err) {
    res.status(403).json({ msg: "Invalid token" });
  }
}