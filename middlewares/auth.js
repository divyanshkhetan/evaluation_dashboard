const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  // Get token from cookies
  const token = req.cookies.token;

  // If no cookie
  if (!token) {
    // Return error
    res.clearCookie('token');
    return res
      .status(401)
      .send({ errors: [{ msg: 'No token, authorization denied' }] });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Store user id in request object
    req.user_id = decoded.id;

    // Go next
    next();
  } catch (err) {
    // Return error
    res.clearCookie('token');
    res.status(400).send({ errors: [{ msg: 'Token is not valid' }] });
  }
};

module.exports = auth;