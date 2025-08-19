export interface Citation {
  bibtex?: string;
}

export interface OrganizationInfo {
  _id: string;
  name: string;
  aliases: string[];
  image?: string;
}

export interface PaperDetails {
  _id: string;
  subcategories: string[];
  citation?: Citation;
  organizationInfo: OrganizationInfo[];
  id: string;
  paper_id: string;
  title: string;
  abstract: string;
  authors: string[];
  publication_date: string;
  imageURL?: string;
  public_total_votes?: number;
  activity_score?: number;
}

export interface Paper {
  paper_id: string;
  added_at: string;
  details: PaperDetails;
}

export interface Folder {
  _id: string;
  user_id: string;
  name: string;
  type: string;
  order: number;
  papers: Paper[];
  created_at: string;
  updated_at: string;
  id: string;
}

export interface FoldersData {
  data: Folder[];
}
