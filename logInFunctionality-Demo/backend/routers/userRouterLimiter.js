import rateLimit from "../../node_modules/express-rate-limit/dist/index.cjs";

export const logInLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5,
  handler: (req, res) => {
    res.status(429).json({
      status: 429,
      message: "You have exceeded the request limit. Try again later",
    });
  }
});
