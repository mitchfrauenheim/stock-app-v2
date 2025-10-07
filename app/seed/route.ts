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
}

async function seedPortfolios() {
  await sql`
    CREATE TABLE IF NOT EXISTS portfolios (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID REFERENCES users(id) ON DELETE CASCADE,
      stock_id UUID REFERENCES stocks(id) ON DELETE CASCADE,
      shares NUMERIC(18,6) NOT NULL,
      buy_cost NUMERIC(18,2),
      created_at TIMESTAMP DEFAULT now(),
      UNIQUE(user_id, stock_id)
    )

  `;
}
