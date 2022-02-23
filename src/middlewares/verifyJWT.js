function verifyJWT(req, res, next) {
  const jwt = require("jsonwebtoken");
  const JWT_SECRET = process.env.JWT_SECRET;
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ token: false, message: "Acesso negado" });
  }

  try {
    jwt.verify(token, JWT_SECRET);
    next();
  } catch (error) {
    res.status(400).json({ token: false, message: "Token inválido" });
  }
}

module.exports = verifyJWT;
