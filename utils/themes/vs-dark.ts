import { PrismTheme } from "prism-react-renderer";

const vsDark: PrismTheme = {
  plain: {
    color: "#d4d4d4",
    backgroundColor: "#1e1e1e",
  },
  styles: [
    {
      types: ["comment", "prolog", "doctype", "cdata"],
      style: { color: "#6a9955", fontStyle: "italic" }, // xanh lá comment
    },
    {
      types: ["punctuation"],
      style: { color: "#d4d4d4" },
    },
    {
      types: ["property", "tag", "boolean", "number", "constant", "symbol"],
      style: { color: "#b5cea8" },
    },
    {
      types: ["attr-name", "string", "char", "builtin", "inserted"],
      style: { color: "#ce9178" }, // string
    },
    {
      types: ["variable", "operator"],
      style: { color: "#9cdcfe" }, // var, operator
    },
    {
      types: ["function"],
      style: { color: "#dcdcaa" }, // function vàng nhạt
    },
    {
      types: ["keyword", "selector", "doctype"],
      style: { color: "#569cd6" }, // keyword xanh dương
    },
    {
      types: ["class-name"],
      style: { color: "#4ec9b0" }, // class xanh ngọc
    },
    {
      types: ["deleted"],
      style: { color: "#ce9178" },
    },
  ],
};

export default vsDark;