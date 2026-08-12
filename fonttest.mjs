import fs from "node:fs";
import postcss from "postcss";
import tailwindcss from "@tailwindcss/postcss";

const css = fs.readFileSync("fonttest.css", "utf8");

postcss([tailwindcss()])
  .process(css, { from: undefined })
  .then((r) => {
    const out = r.css;
    console.log("UTILITIES:", out.match(/\.font-(display|body|mono)\{[^}]*\}/g));
    console.log("archivo var present:", out.includes("--font-archivo"));
  })
  .catch((e) => console.error("ERR", e));
