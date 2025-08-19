# My Research Papers

A TypeScript project for managing and formatting research paper collections.

## 📖 Quick Links

- 📂 **[View Research Papers Collection](./FOLDERS.md)** - Browse all organized papers by folder
- 📊 **[View Statistics](./FOLDERS.md#-quick-stats)** - Overview of paper counts and folders

## Features

- 📂 Organize research papers into folders
- 📝 Generate Markdown documentation from JSON data
- 🔧 Built with TypeScript for type safety

## Setup

1. Install dependencies:

```bash
npm install
```

2. Build the project:

```bash
npm run build
```

3. **For GitHub Actions (Required for automatic updates):**
   - Set up `ALPHAXIV_TOKEN` and `ALPHAXIV_USER_ID` repository secrets (see [Usage](#usage) section for details)

## Usage

### Automatic Updates (GitHub Actions)

This project includes a GitHub Actions workflow that automatically fetches the latest papers from AlphaXiv API and updates the `FOLDERS.md` file daily.

**🔑 Required Setup:**

1. **Set up AlphaXiv API credentials:**

   - Go to your GitHub repository settings
   - Navigate to `Settings` → `Secrets and variables` → `Actions`
   - Click `New repository secret` and add the following secrets:

   **First secret:**

   - Name: `ALPHAXIV_TOKEN`
   - Value: Your AlphaXiv API token
   - Click `Add secret`

   **Second secret:**

   - Name: `ALPHAXIV_USER_ID`
   - Value: Your AlphaXiv user ID
   - Click `Add secret`

2. **Workflow runs automatically:**
   - Daily at 00:00 UTC (09:00 JST)
   - Can also be triggered manually from the Actions tab

### Manual Format

```bash
npm run format
```

This will read from `data/folders.json` and generate `FOLDERS.md` with a formatted table of papers.

## Project Structure

```
├── data/
│   └── folders.json     # Research paper data
├── scripts/
│   └── format.ts        # TypeScript formatting script
├── types/
│   └── index.ts         # Type definitions
├── tsconfig.json        # TypeScript configuration
└── package.json         # Project configuration
```

## Data Format

The `data/folders.json` file should follow this structure:

```json
{
  "data": [
    {
      "_id": "folder_id",
      "user_id": "user_id",
      "name": "Folder Name",
      "type": "folder_type",
      "order": 1,
      "papers": [
        {
          "paper_id": "paper_id",
          "added_at": "2025-08-19T00:01:00.140Z",
          "details": {
            "_id": "paper_id",
            "subcategories": ["cs.CV"],
            "citation": {
              "bibtex": "bibtex_string_with_url"
            },
            "organizationInfo": [
              {
                "_id": "org_id",
                "name": "Organization Name",
                "aliases": [],
                "image": "path/to/image"
              }
            ],
            "id": "paper_id",
            "paper_id": "arxiv_id",
            "title": "Paper Title",
            "abstract": "Paper abstract...",
            "authors": ["Author 1", "Author 2"],
            "publication_date": "2025-08-15T17:59:49.000Z",
            "imageURL": "image/path.png",
            "public_total_votes": 27
          }
        }
      ],
      "created_at": "2025-06-17T18:48:24.772Z",
      "updated_at": "2025-06-17T18:48:24.772Z",
      "id": "folder_uuid"
    }
  ]
}
```

## Development

- **TypeScript**: For type safety and better development experience
- **Node.js**: Runtime environment
- **ts-node**: For running TypeScript files directly

## Scripts

- `npm run build`: Compile TypeScript to JavaScript
- `npm run format`: Generate FOLDERS.md from data/folders.json
