const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const RefreshToken = require("../models/RefreshToken");

const generateTokens = async (user) => {
  ///here we create an accesstoken using jwt
  const accessToken = jwt.sign(
    {
      userId: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "30m" }
  );

  ///generate a token
  const refreshToken = crypto.randomBytes(40).toString("hex");
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7); // refresh token expires in 7 days

  //here we store the refresh token in the db allocated to the user
  await RefreshToken.create({
    token: refreshToken,
    user: user._id,
    expiresAt,
  });

  return { accessToken, refreshToken };
};

module.exports = generateTokens;
/// the refresh token is stored in the db so when the 30min access token expires the user doesnt need to login we just generate a new access token
/// provided thers still a refresh token that hasnt expired
