module.exports = {
  presets: ["@babel/preset-env",
    ["@babel/preset-typescript", {
      //支持所有文件扩展名
      allExtensions: true,
      "targets": {
        "browsers": ["last 2 chrome version"]
      }
    },],
  ],
};

