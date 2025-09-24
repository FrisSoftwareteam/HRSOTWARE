export interface DatabaseEnvironment {
  development: DatabaseConfig
  production: DatabaseConfig
  test: DatabaseConfig
}

export interface DatabaseConfig {
  host: string
  port: number
  database: string
  username: string
  password: string
  ssl?: boolean
  connectionLimit?: number
}

// Database configuration for different environments
export const databaseConfig: DatabaseEnvironment = {
  development: {
    host: process.env.DB_HOST || "localhost",
    port: Number.parseInt(process.env.DB_PORT || "5432"),
    database: process.env.DB_NAME || "hr_appraisal_dev",
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "password",
    ssl: false,
    connectionLimit: 10,
  },
  production: {
    host: process.env.DATABASE_URL ? new URL(process.env.DATABASE_URL).hostname : "localhost",
    port: process.env.DATABASE_URL ? Number.parseInt(new URL(process.env.DATABASE_URL).port) : 5432,
    database: process.env.DATABASE_URL ? new URL(process.env.DATABASE_URL).pathname.slice(1) : "hr_appraisal_prod",
    username: process.env.DATABASE_URL ? new URL(process.env.DATABASE_URL).username : "postgres",
    password: process.env.DATABASE_URL ? new URL(process.env.DATABASE_URL).password : "password",
    ssl: true,
    connectionLimit: 20,
  },
  test: {
    host: process.env.TEST_DB_HOST || "localhost",
    port: Number.parseInt(process.env.TEST_DB_PORT || "5432"),
    database: process.env.TEST_DB_NAME || "hr_appraisal_test",
    username: process.env.TEST_DB_USER || "postgres",
    password: process.env.TEST_DB_PASSWORD || "password",
    ssl: false,
    connectionLimit: 5,
  },
}

// Get current environment configuration
export function getCurrentDatabaseConfig(): DatabaseConfig {
  const env = process.env.NODE_ENV || "development"
  return databaseConfig[env as keyof DatabaseEnvironment]
}

// Required environment variables for production
export const requiredEnvVars = [
  "DATABASE_URL", // For production deployment
  // Alternative individual variables:
  // 'DB_HOST',
  // 'DB_PORT',
  // 'DB_NAME',
  // 'DB_USER',
  // 'DB_PASSWORD',
]

// Validate environment variables
export function validateDatabaseConfig(): { valid: boolean; missing: string[] } {
  const missing: string[] = []

  if (process.env.NODE_ENV === "production") {
    if (!process.env.DATABASE_URL) {
      missing.push("DATABASE_URL")
    }
  }

  return {
    valid: missing.length === 0,
    missing,
  }
}
