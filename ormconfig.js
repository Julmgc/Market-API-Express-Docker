const developmentEnv = {
  type: "postgres",

  host: process.env.PG_HOST,

  port: "5432",

  database: process.env.PG_DB,

  username: process.env.PG_USER,

  password: process.env.PG_PASSWORD,

  entities: ["./src/entities/**/*.ts"],

  migrations: ["./src/database/migrations/*.ts"],

  logging: false,

  synchronize: false,

  cli: {
    migrationsDir: "./src/database/migrations",
  },
};
const prodEnv = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  entities: ["./dist/entities/**/*.js"],
  migrations: ["./dist/database/migrations/*.js"],

  cli: {
    migrationsDir: "./dist/database/migrations",
  },
  synchronize: false,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
};

const testEnv = {
  type: "sqlite",
  database: ":memory:",
  entities: ["./src/entities/**/*.ts"],
  synchronize: true,
};

let exportModule = undefined;
if (process.env.NODE_ENV === "production") {
  exportModule = prodEnv;
} else if (process.env.NODE_ENV === "test") {
  exportModule = testEnv;
} else {
  exportModule = developmentEnv;
}

module.exports = exportModule;
