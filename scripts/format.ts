// scripts/format-folders.ts
import * as fs from 'fs';
import * as path from 'path';
import { FoldersData } from '../types';

try {
  const filePath = path.join(process.cwd(), 'data', 'folders.json');
  const raw: string = fs.readFileSync(filePath, 'utf-8');
  
  if (!raw.trim()) {
    console.error('❌ folders.json is empty');
    process.exit(1);
  }
  
  const parsed: FoldersData = JSON.parse(raw);

  // フォルダ一覧をMarkdownに変換
  let md: string = `# 📂 Research Papers Collection\n\n`;

  // フォルダをorder順にソート
  const sortedFolders = parsed.data.sort((a, b) => a.order - b.order);

  sortedFolders.forEach((folder) => {
    md += `## ${folder.name}\n`;
    md += `**Type:** ${folder.type} | **Papers:** ${folder.papers.length}\n\n`;
    
    if (folder.papers.length === 0) {
      md += `No papers yet.\n\n`;
      return;
    }

    md += `| Title | Authors | ArXiv ID | Date | Votes | Organizations |\n`;
    md += `|-------|---------|----------|------|-------|---------------|\n`;

    folder.papers.forEach((paper) => {
      const details = paper.details;
      
      // ArXivのURLを抽出
      const urlMatch = details.citation?.bibtex?.match(/url=\{(.+?)\}/);
      const url: string = urlMatch?.[1] || `https://arxiv.org/abs/${details.paper_id}`;
      
      // 著者名を短縮（最初の3人まで）
      const authorsText: string = details.authors.slice(0, 3).join(', ') + 
        (details.authors.length > 3 ? ' et al.' : '');
      
      // 日付をフォーマット
      const date: string = details.publication_date.split('T')[0];
      
      // 投票数
      const votes: string = details.public_total_votes ? details.public_total_votes.toString() : 'N/A';
      
      // 組織名を短縮（最初の2つまで）
      const orgNames: string = details.organizationInfo
        .slice(0, 2)
        .map(org => org.name)
        .join(', ') + (details.organizationInfo.length > 2 ? ' et al.' : '');
      
      md += `| [${details.title}](${url}) | ${authorsText} | ${details.paper_id} | ${date} | ${votes} | ${orgNames || 'N/A'} |\n`;
    });

    md += `\n`;
  });

  // 統計情報を追加
  md += `## 📊 Statistics\n\n`;
  const totalPapers = parsed.data.reduce((sum, folder) => sum + folder.papers.length, 0);
  md += `- **Total Folders:** ${parsed.data.length}\n`;
  md += `- **Total Papers:** ${totalPapers}\n`;
  
  parsed.data.forEach(folder => {
    if (folder.papers.length > 0) {
      md += `- **${folder.name}:** ${folder.papers.length} papers\n`;
    }
  });

  fs.writeFileSync('FOLDERS.md', md, 'utf-8');
  console.log('✅ FOLDERS.md generated successfully');
  console.log(`📁 ${parsed.data.length} folders processed`);
  console.log(`📄 ${totalPapers} papers formatted`);

} catch (error) {
  console.error('❌ Error:', error);
  process.exit(1);
}
