import mysql from "mysql2/promise";

const options = {
  host: "mariadb-117845-0.cloudclusters.net",
  port: 10060,
  user: "crudweb",
  password: "dijao298djaA",
  database: "crudweb",
};

export const getDatabaseConnection = async () => {
  try {
    const connection = await mysql.createConnection(options);
    console.log("Conexão com o banco de dados MySQL estabelecida!");
    return connection;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Erro ao conectar com o banco de dados:", err.message);
    }
    throw err;
  }
};
