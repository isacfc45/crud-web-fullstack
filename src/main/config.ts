import sqlite3 from "sqlite3";
import { open } from "sqlite";

const options = {
  filename: "./database.db",
  driver: sqlite3.Database,
};

export const getDatabaseConnection = async () => {
  try {
    const db = await open(options);
    console.log("Conexão com o banco de dados SQLite estabelecida!");
    return db;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Erro ao conectar com o banco de dados:", err.message);
    }
    throw err;
  }
};
