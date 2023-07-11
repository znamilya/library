module.exports = {
  parser: "@typescript-eslint/parser",
  env: {
    browser: true,
  },
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./packages/*/tsconfig.json"],
  },
  plugins: ["@typescript-eslint", "prettier", "jest"],
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"],
  rules: {},
  overrides: [
    {
      files: ["**/*.stories.*"],
      rules: {
        "import/no-anonymous-default-export": "off",
      },
    },
  ],
};
