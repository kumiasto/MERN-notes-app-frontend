const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    [
      "/signup",
      "/signin",
      "/logout",
      "/dashboard",
      "/validToken",
      "/user",
      "/note/add",
      "/notes/get",
      "/note/get",
      "/note/search",
      "/note/delete",
      "/note/update",
    ],
    createProxyMiddleware({
      target: "https://quiet-savannah-13877.herokuapp.com",
      changeOrigin: true,
    })
  );
};
