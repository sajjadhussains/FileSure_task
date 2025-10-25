import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["dist/**", "node_modules/**"], // 👈 ignore compiled files
  },
  eslint.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  {
    files: ["src/**/*.ts"], // 👈 only lint source files
    languageOptions: {
      parser: tseslint.parser,
    },
  }
);
