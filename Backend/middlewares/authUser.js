import jwt from 'jsonwebtoken';

const authUser = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authorization token missing or invalid format" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token not found" });
    }

    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    
    if (!token_decode || !token_decode.id) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    req.userId = token_decode.id;  // 🔁 This was the bug

    next();
  } catch (error) {
    console.error("authUser error:", error);
    return res.status(401).json({ message: "Authentication failed", error: error.message });
  }
};

export default authUser;
