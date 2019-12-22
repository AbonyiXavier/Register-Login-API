import jwt from "jsonwebtoken";

const Auth = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    // return res.status(401).send("Access Denied");
    return res.status(401).json({
      status: "failure",
      message: "No access token provided!"
    });
  }
  if (token) {
    try {
      const verified = jwt.verify(token, process.env.TOKEN_SECRET);
      req.user = verified;
      next();
    } catch (error) {
      return res.status(400).send({
        status: "failure",
        message: "Invalid Token!"
      });
    }
  }
};
module.exports = Auth;
