import { PrismTheme } from "prism-react-renderer";

const customDarkTheme: PrismTheme = {
  plain: {
    color: "#e5e7eb",           // text-gray-200
    backgroundColor: "#09090b", // bg-zinc-950
  },
  styles: [
    { types: ["comment"], style: { color: "#6b7280", fontStyle: "italic" } }, // gray-500
    { types: ["string", "inserted"], style: { color: "#22c55e" } }, // green-500
    { types: ["number", "constant", "variable"], style: { color: "#facc15" } }, // yellow-400
    { types: ["keyword", "operator"], style: { color: "#818cf8" } }, // indigo-400
    { types: ["function"], style: { color: "#38bdf8" } }, // sky-400
  ],
};
export default customDarkTheme;