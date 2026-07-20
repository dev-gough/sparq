import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

/** @type {import('eslint').Linter.Config[]} */
const eslintConfig = [
  ...nextVitals,
  ...nextTs,
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "docs/baselines/**",
      "logs/**",
      "public/**",
      "next-env.d.ts",
      // Node scripts use require / CommonJS
      "scripts/**",
    ],
  },
];

export default eslintConfig;
