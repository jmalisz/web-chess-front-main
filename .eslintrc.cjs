module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json", "./tsconfig.eslint.json"],
  },
  extends: [
    "airbnb",
    "airbnb-typescript",
    "airbnb/hooks",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:eslint-comments/recommended",
    "plugin:promise/recommended",
    "plugin:unicorn/recommended",
    "prettier",
  ],
  plugins: [
    "@typescript-eslint",
    "eslint-comments",
    "no-relative-import-paths",
    "promise",
    "react-refresh",
    "simple-import-sort",
    "unicorn",
  ],
  rules: {
    // https://basarat.gitbook.io/typescript/main-1/defaultisbad
    "import/extensions": "off",
    "import/no-default-export": "warn",
    "import/no-extraneous-dependencies": [
      "error",
      { devDependencies: ["vite.config.ts", "tailwind.config.ts"] },
    ],
    "import/prefer-default-export": "off",
    "no-relative-import-paths/no-relative-import-paths": [
      "error",
      { allowSameFolder: true, rootDir: "src" },
    ],
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    "react/jsx-sort-props": [
      "warn",
      {
        callbacksLast: true,
        ignoreCase: true,
        locale: "auto",
        multiline: "last",
        reservedFirst: true,
        shorthandLast: true,
      },
    ],
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        checksVoidReturn: false,
      },
    ],
    "@typescript-eslint/explicit-function-return-type": "off",
    "simple-import-sort/exports": "warn",
    "simple-import-sort/imports": "warn",
    // Use PascalCase for components/pages and camelCase for rest
    "unicorn/filename-case": [
      "error",
      {
        cases: {
          camelCase: true,
          pascalCase: true,
        },
        ignore: ["vite-env.d.ts"],
      },
    ],
    "unicorn/no-array-for-each": "off",
    "unicorn/no-useless-undefined": ["error", { checkArguments: false }],
    "unicorn/no-null": "off",
    // Common abbreviations are known and readable
    "unicorn/prevent-abbreviations": "off",
    "consistent-return": "off",
  },
  overrides: [
    // Some files require default exports
    {
      files: ["vite.config.ts", "tailwind.config.ts"],
      rules: {
        "import/no-default-export": "off",
      },
    },
  ],
};
