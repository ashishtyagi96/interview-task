export interface Commitment {
  id: number;
  type: string;
  added_at: string;
  updated_at: string;
  asset_class: string;
  amount: number;
  currency: string;
}

export interface Investor {
  id: number;
  name: string;
  type: string;
  date_added: string;
  total_commitment: number;
}

export interface CommitmentFilters {
  asset_class: string;
  amount: number;
}