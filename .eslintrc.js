module.exports = {
  root          : true,
  env           : {
    node: true
  },
  extends       : [
    "plugin:vue/essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint"
  ],
  parserOptions : {
    ecmaVersion: 2020
  },
  overrides     : [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)"
      ],
      env  : {
        jest: true
      }
    }
  ],
  ignorePatterns: ["*.common.js"],
  rules         : {
    "no-console"                      : process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger"                     : process.env.NODE_ENV === "production" ? "warn" : "off",
    //
    //
    // TIP 确定下来的新规则
    "@typescript-eslint/no-this-alias": [
      "error",
      {
        "allowDestructuring": true, // Allow `const { props, state } = this`; false by default
        "allowedNames"      : ["self", "that"] // Allow `const self = this`; `[]` by default
      }
    ],

    // WARN 暂行规则
    "@typescript-eslint/camelcase"          : "off",
    "@typescript-eslint/no-empty-function"  : "off",
    "@typescript-eslint/no-unused-vars"     : "off",
    "@typescript-eslint/no-var-requires"    : "off",
    "prettier/prettier"                     : "off",
    "@typescript-eslint/ban-ts-ignore"      : "warn",
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/class-name-casing"  : "off",
    "no-var"                                : "warn",
    "@typescript-eslint/no-explicit-any"    : "off",
    "no-useless-escape"                     : "off"
  }
};

