/**
 * @type {import('prettier').Config}
 */
const prettierConfig = {
  printWidth: 120,
  tabWidth: 2,
  useTabs: false,
  trailingComma: "all",
  semi: true,
  bracketSpacing: true,
  importOrder: [
    "^module-alias/register$",
    "^[./]",
    "<THIRD_PARTY_MODULES>",
    "^@/app(/.*)?$",
    "^@/controllers(/.*)?$",
    "^@/dtos(/.*)?$",
    "^@/lib(/.*)?$",
    "^@/middlewares(/.*)?$",
    "^@/routes(/.*)?$",
    "^@/services(/.*)?$",
    "^@/types(/.*)?$",
    "^@/utils(/.*)?$",
  ],
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
  plugins: ["@trivago/prettier-plugin-sort-imports"],
};

export default prettierConfig;
