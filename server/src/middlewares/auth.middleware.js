/**
 * The `protect` function in the JavaScript code snippet is used to verify and decode a JWT token from
 * the request headers to protect routes by ensuring authentication.
 * @param req - `req` is the request object representing the HTTP request made by the client to the
 * server. It contains information about the request such as headers, parameters, body content, and
 * more. In this context, `req` is used to extract the JWT token from the request headers for
 * authentication purposes in the
 * @param res - The `res` parameter in the `protect` function is the response object in Express.js. It
 * is used to send a response back to the client making the request. In the provided code snippet,
 * `res` is used to send a JSON response with an appropriate status code and message if certain
 * conditions
 * @param next - The `next` parameter in the `protect` function is a callback function that is used to
 * pass control to the next middleware function in the request-response cycle. When called, it invokes
 * the next middleware function in the stack. This is commonly used in Express.js middleware functions
 * to move to the next middleware
 * @returns If there is no token provided in the request headers, a response with status code 401 and a
 * JSON object containing the message "No token" will be returned. If there is a token provided but it
 * is invalid or expired, a response with status code 401 and a JSON object containing the message
 * "Unauthorized" will be returned.
 */
import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};