module.exports = {
  //环境定义了预定义的全局变量。更多在官网查看
    root: true,
    "env": {
      "browser": true
    },
    parserOptions: {
      "parser": "vue-eslint-parser",
      "sourceType": "module"
    },
    "extends": ["standard", 'plugin:vue/essential'],
    "plugins": [
      "vue"
    ],
    "rules": {
    // 规范的rules，可以在官方文档查询相关知识
      "quotes": [
        "error",
        "single"
      ],
      "semi": [
        "error",
        "never"
      ],
      'quote-props': [
        'error', 'consistent'
      ],
      "space-before-function-paren": ["error", {
          "anonymous": "always",
          "named": "always",
          "asyncArrow": "always"
      }]
    }
  };