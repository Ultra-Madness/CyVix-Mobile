export default [
  {
    ignores: ["node_modules/"],
  },
  {
    files: ["src/**/*.ts", "src/**/*.tsx"],
    rules: {
      "react-native/no-inline-styles": "warn",
      "react-hooks/exhaustive-deps": "warn",
    },
  },
];
