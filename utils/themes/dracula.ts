import { PrismTheme } from "prism-react-renderer";

const draculaTheme: PrismTheme = {
  plain: {
    color: "#f8f8f2",
    backgroundColor: "#282a36",
  },
  styles: [
    {
      types: ["comment", "prolog", "doctype", "cdata"],
      style: { color: "#6272a4" },
    },
    {
      types: ["property", "tag", "boolean", "number", "constant", "symbol"],
      style: { color: "#bd93f9" },
    },
    {
      types: ["attr-name", "string", "char", "builtin", "inserted"],
      style: { color: "#f1fa8c" },
    },
    {
      types: ["operator", "entity", "url", "string", "variable"],
      style: { color: "#ff79c6" },
    },
    {
      types: ["function"],
      style: { color: "#50fa7b" },
    },
  ],
};
export default draculaTheme;