// scripts/format-folders.js
const fs = require("fs");

const raw = fs.readFileSync("data/folders.json", "utf-8");
const parsed = JSON.parse(raw);

// フォルダ一覧をMarkdownに変換
let md = `# 📂 AlphaXiv Folders\n\n`;

parsed.data.forEach((folder) => {
  md += `## ${folder.name}\n`;
  if (folder.papers.length === 0) {
    md += `（No papers yet）\n\n`;
    return;
  }

  md += `| Title | Authors | arXiv | Date |\n`;
  md += `|-------|---------|-------|------|\n`;

  folder.papers.forEach((p) => {
    const d = p.details;
    const url = d.citation?.bibtex?.match(/url=\{(.+?)\}/)?.[1] || "";
    md += `| [${d.title}](${url}) | ${d.authors.slice(0, 3).join(", ")}${
      d.authors.length > 3 ? " et al." : ""
    } | ${d.paper_id} | ${d.publication_date.split("T")[0]} |\n`;
  });

  md += `\n`;
});

fs.writeFileSync("FOLDERS.md", md, "utf-8");
console.log("✅ FOLDERS.md generated");
