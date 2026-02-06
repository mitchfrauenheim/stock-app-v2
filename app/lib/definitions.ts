export type User = {
  id: string;
  name: string;
  email: string;
  created_at: string;
};

export type UserWithPassword = User & {
  password_hash: string;
};

export type Stock = {
  id: string;
  symbol: string;
  name: string;
  created_at: string;
};

export type Holding = {
  id: string;
  user_id: string;
  stock_id: string;
  shares: number;
  buy_cost: number;
  created_at: string;
};

export type PortfolioSnapshot = {
  id: string;
  user_id: string;
  snapshot_date: string;
  total_value: number;
  cash_balance: number;
  created_at: string;
};

export type StockPrice = {
  id: string;
  stock_id: string;
  price_date: string;
  close_price: number;
  created_at: string;
};
