// next.config.js
require('dotenv').config()

module.exports = {
  env: {
    ADMIN_USERNAME: process.env.ADMIN_USERNAME,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  },
}