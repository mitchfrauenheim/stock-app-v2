import { holdings, stocks, users } from "@/lib/initial_data";
import bcrypt from "bcrypt";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

async function seedUsers() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT now()
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );

  return insertedUsers;
}

async function seedStocks() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
    CREATE TABLE IF NOT EXISTS stocks (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      symbol TEXT UNIQUE NOT NULL,
      name TEXT,
      created_at TIMESTAMP DEFAULT now()
    );
  `;

  const insertedStocks = await Promise.all(
    stocks.map(
      (stock) => sql`
        INSERT INTO stocks (id, symbol, name)
        VALUES (${stock.id}, ${stock.symbol}, ${stock.name})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedStocks;
}

async function seedHoldings() {
  await sql`
    CREATE TABLE IF NOT EXISTS holdings (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID REFERENCES users(id) ON DELETE CASCADE,
      stock_id UUID REFERENCES stocks(id) ON DELETE CASCADE,
      shares NUMERIC(18,10) NOT NULL,
      buy_cost NUMERIC(18,2) NOT NULL,
      created_at TIMESTAMP DEFAULT now(),
      UNIQUE(user_id, stock_id)
    );
  `;

  const insertedHoldings = await Promise.all(
    holdings.flatMap((holding) =>
      holding.stocks.map(
        (stock) =>
          sql`
          INSERT INTO holdings (user_id, stock_id, shares, buy_cost)
          VALUES (
            (SELECT id FROM users WHERE email = ${holding.email}),
            (SELECT id FROM stocks WHERE symbol = ${stock.symbol}),
            ${stock.shares},
            ${stock.buy_cost}
          )
        `,
      ),
    ),
  );

  return insertedHoldings;
}

async function createTransactions() {
  await sql`
    CREATE TABLE IF NOT EXISTS transactions (
      id UUID PRIMARY KEY DEFAULT  gen_random_uuid(),
      user_id UUID REFERENCES users(id) ON DELETE CASCADE,
      stock_id UUID REFERENCES stocks(id) ON DELETE CASCADE,
      transaction_type TEXT NOT NULL,
      shares NUMERIC(18,6) NOT NULL,
      price_per_share NUMERIC(18,2) NOT NULL,
      total_value NUMERIC(18,2) NOT NULL,
      transaction_date DATE NOTE NULL,
      created_at TIMESTAMP DEFAULT now(),
    );

    CREATE INDEX idx_transactions_user ON transactions(user_id, transaction_date);
  `;
}

async function createPortfolioSnapshots() {
  await sql`
    CREATE TABLE IF NOT EXISTS portfolio_snapshots (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID REFERENCES users(id) ON DELETE CASCADE,
      snapshot_date DATE NOT NULL,
      total_value NUMERIC(18,2) NOT NULL,
      cash_balance NUMERIC(18,2) DEFAULT 0,
      created_at TIMESTAMP DEFAULT now(),
      UNIQUE(user_id, snapshot_date)
    );

    CREATE INDEX idx_snapshots_user_date ON portfolio_snapshots(user_id, snapshot_date);
  `;
}

async function createStockPrices() {
  await sql`
    CREATE TABLE IF NOT EXISTS stock_prices (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      stock_id UUID REFERENCES stocks(id) ON DELETE CASCADE,
      price_date DATE NOT NULL,
      close_price NUMERIC(18,2) NOT NULL,
      created_at TIMESTAMP DEFAULT now(),
      UNIQUE(stock_id, price_date)
    );
    
    CREATE INDEX idx_prices_stock_date ON stock_prices(stock_id, price_date);
  `;
}

export async function GET() {
  try {
    await sql.begin(() => [
      seedUsers(),
      seedStocks(),
      seedHoldings(),
      createTransactions(),
      createPortfolioSnapshots(),
      createStockPrices(),
    ]);
    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
