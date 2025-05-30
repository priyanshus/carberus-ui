import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  rules: {
    "no-unused-vars": "off",  // disable base rule in favor of typescript version
    "@typescript-eslint/no-unused-vars": ["error", {
      vars: "all",
      args: "after-used",
      ignoreRestSiblings: true,
      caughtErrors: "none",    // ignore unused vars in catch clauses
    }],
  }
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  { rules: compat.rules }
];

export default eslintConfig;
