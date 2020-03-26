module.exports = {
  presets: [
      [
          "@babel/preset-env", {
            //   "targets": {
            //       "browsers": [
            //           "> 1%",
            //           "last 2 versions"
            //       ]
            //   },
              "useBuiltIns": "usage",
              "corejs": 2
          }
      ]
  ],
  plugins: [
      // [
      //     "@babel/plugin-transform-runtime",
      //     {
      //         "corejs": false,
      //         "helpers": true,
      //         "regenerator": true,
      //         "useESModules": true
      //     }
      // ]
  ]
}