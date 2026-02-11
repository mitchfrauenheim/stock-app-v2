export type UserData = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  created_at: string;
};

export type UserWithPassword = User & {
  password_hash: string;
};

export type StockData = {
  id: string;
  symbol: string;
  name: string;
};

export type Stock = StockData & {
  created_at: string;
};

export type HoldingData = {
  email: string;
  stocks: {
    symbol: string;
    shares: number;
    buy_cost: number;
  }[];
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

export type Transactions = {
  id: string;
  user_id: string;
  stock_id: string;
  transaction_type: "BUY" | "SELL";
  shares: number;
  price_per_share: number;
  total_value: number;
  transaction_date: string;
  created_at: string;
};

export type TwelvedataTimeSeries = {
  meta: {
    symbol: string;
    interval: string;
    currency: string;
    exchange_timezone: string;
    exchange: string;
    mic_code: string;
    type: string;
  };
  values: {
    datetime: string;
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
  }[];
};
