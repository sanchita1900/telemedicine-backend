const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
      console.log(decodedToken);
      if (decodedToken.type !== "doctor") {
        return res
          .status(403)
          .json({ message: " unauthorized, should be doctor" });
      }
      req.decodedToken = decodedToken;
      next();
    }
  } catch (err) {
    console.log(err);
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};
