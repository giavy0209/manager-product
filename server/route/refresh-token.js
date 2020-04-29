const app = require('./express')
const jwt = require('jsonwebtoken')
const User = require('../schema/User')

const utils = require('./utils')

const TOKEN_LIST = require('./TOKEN_LIST.JS')
const variable = require('../variable')

app.post('/refresh_token', async (req, res) => {
  // User gửi mã Refresh token kèm theo trong body
  const { refreshToken } = req.body;
  // Kiểm tra Refresh token có được gửi kèm và mã này có tồn tại trên hệ thống hay không
  if ((refreshToken) && (refreshToken in TOKEN_LIST)) {
    try {
      // Kiểm tra mã Refresh token
      await utils.verifyJwtToken(refreshToken, variable.REFRESH_TOKEN_SECRET);
      // Lấy lại thông tin user
      const user = tokenList[refreshToken];
      // Tạo mới mã token và trả lại cho user
      const token = jwt.sign(user, variable.TOKEN_SECRET, {
        expiresIn: variable.TOKEN_LIFE,
      });
      const response = {
        token,
      }
      res.status(200).json(response);
    } catch (err) {
      res.status(403).json({
        message: 'Invalid refresh token',
      });
    }
  } else {
    res.status(400).json({
      message: 'Invalid request',
    });
  }
});
  