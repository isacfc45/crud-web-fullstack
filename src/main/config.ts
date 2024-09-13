import Firebird from "node-firebird";

const options: Firebird.Options = {
  host: "127.0.0.1",
  port: 30500,
  database: "/firebird/data/db2.fdb",
  user: "sysdba",
  password: "masterkey",
  pageSize: 4096,
};

export const getDatabaseConnection = (): Promise<Firebird.Database> => {
  return new Promise((resolve, reject) => {
    Firebird.attach(options, (err, db) => {
      if (err) {
        reject(err.message);
      } else {
        resolve(db);
      }
    });
  });
};
