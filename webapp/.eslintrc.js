module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/recommended", "airbnb-base"],
  plugins: ["vue"],
  rules: {
    // don't require .vue extension when importing
    "import/extensions": [
      "error",
      "always",
      {
        js: "never",
        vue: "never"
      }
    ],
    // disallow reassignment of function parameters
    // disallow parameter object manipulation except for specific exclusions
    "no-param-reassign": [
      "error",
      {
        props: true,
        ignorePropertyModificationsFor: [
          "state", // for vuex state
          "acc", // for reduce accumulators
          "e" // for e.returnvalue
        ]
      }
    ],
    // allow optionalDependencies
    "import/no-extraneous-dependencies": [
      "error",
      {
        optionalDependencies: ["/front/test/unit/index.js"]
      }
    ],
    // allow debugger during development
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "import/prefer-default-export": "off",
    // Indent with 2 spaces
    indent: ["error", 2],
    "vue/html-indent": [
      "error",
      2,
      {
        alignAttributesVertically: true
      }
    ],
    "no-shadow": ["error", { allow: ["state"] }],
    "max-len": ["error", { code: 120, ignoreUrls: true }]
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
