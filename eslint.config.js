import js from "@eslint/js";
import tseslint from "typescript-eslint";
import solid from "eslint-plugin-solid/configs/typescript";
import jsxA11y from "eslint-plugin-jsx-a11y";
import prettier from "eslint-config-prettier";

export default [
  { ignores: [".output/", ".vinxi/", "dist/", "node_modules/", "src-tauri/target/"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ...solid,
    files: ["**/*.{ts,tsx}"],
  },
  {
    ...jsxA11y.flatConfigs.recommended,
    files: ["**/*.{ts,tsx}"],
  },
  prettier,
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      // Relax rules that conflict with SolidJS patterns
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "jsx-a11y/anchor-is-valid": "off", // SolidJS <A> component handles this
      "jsx-a11y/label-has-associated-control": "off", // SolidJS uses `for` not `htmlFor`; plugin doesn't support it
    },
  },
];
