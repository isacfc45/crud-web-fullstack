import { Person } from "@/domain/entities/Person";
import { PersonRepository } from "@/domain/repositories/PessoaRepository";
import { getDatabaseConnection } from "@/main/config";

export class PersonRepositoryImpl implements PersonRepository {
  async create(person: Person): Promise<number> {
    const db = await getDatabaseConnection();
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO PEOPLE (NAME, NICKNAME, TAX_TYPE, CPF_CNPJ) VALUES (?, ?, ?, ?) RETURNING ID",
        [person.name, person.nickname, person.taxType, person.cpfCnpj],
        (err, result) => {
          db.detach();
          if (err) {
            console.log(err);
            reject(err);
          } else {
            resolve(result[0].ID);
          }
        }
      );
    });
  }

  async index(): Promise<Person[]> {
    const db = await getDatabaseConnection();
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM PEOPLE", [], (err, result) => {
        db.detach();
        if (err) {
          reject(err);
        } else {
          const people = result.map(
            (row) =>
              new Person(
                row.ID,
                row.NAME,
                row.NICKNAME,
                row.TAX_TYPE,
                row.CPF_CNPJ
              )
          );
          resolve(people);
        }
      });
    });
  }

  async findById(id: number): Promise<Person | undefined> {
    const db = await getDatabaseConnection();
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM PEOPLE WHERE ID = ?", [id], (err, result) => {
        db.detach();
        if (err) {
          reject(err);
        } else {
          if (result.length === 0) {
            resolve(undefined);
          } else {
            const person = new Person(
              result[0].ID,
              result[0].NAME,
              result[0].NICKNAME,
              result[0].TAX_TYPE,
              result[0].CPF_CNPJ
            );
            resolve(person);
          }
        }
      });
    });
  }

  async update(person: Person): Promise<void> {
    const db = await getDatabaseConnection();
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE PEOPLE SET NAME = ?, NICKNAME = ?, TAX-TYPE = ?, CPF-CNPJ = ? WHERE ID = ?",
        [
          person.name,
          person.nickname,
          person.taxType,
          person.cpfCnpj,
          person.id,
        ],
        (err) => {
          db.detach();
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }

  async delete(id: number): Promise<void> {
    const db = await getDatabaseConnection();
    return new Promise((resolve, reject) => {
      db.query("DELETE FROM PEOPLE WHERE ID = ?", [id], (err) => {
        db.detach();
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}
