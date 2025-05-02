/* eslint-disable */
module.exports = {
  importOrderSortSpecifiers: true,
  plugins: ["@trivago/prettier-plugin-sort-imports"],
  importOrder: ["(.*).css$", "<THIRD_PARTY_MODULES>", "^[./]"],
  importOrderSeparation: true,
};
