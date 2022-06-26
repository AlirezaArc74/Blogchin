/** @type {import('next').NextConfig} */
const path = require("path")

module.exports = {
  reactStrictMode: true,
  env: {
    customeKey: "http://localhost:4000",
  },

  resolve: {
    alies: {
      components: path.resolve(__dirname, "components/Avatar.js/")
    }
  }
};
