const PROXY_CONFIG = {
  "**": {
    //"target": 'http://lnxsapl1d.dev.unix.banorte.com:9080/wconfig-services/',
    "target": 'localhost:8080/wconfig-services/',
    "secure": false,
    "bypass": function (req) {
      if (req && req.headers && req.headers.accept &&
        req.headers.accept && req.headers.accept.indexOf("html") !== -1) {
        console.log("Skipping proxy for browser request.");
        return "/index.html";
      }
    },
    "changeOrigin": true,
    "logLevel": "debug"
  }
};

module.exports = PROXY_CONFIG;
