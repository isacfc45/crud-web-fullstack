import { Person } from "@/domain/entities/Person";
import { PersonRepository } from "@/domain/repositories/PersonRepository";
import { getDatabaseConnection } from "@/main/config";

export class PersonRepositoryImpl implements PersonRepository {
  async create(person: Person): Promise<number> {
    const db = await getDatabaseConnection();

    try {
      db.exec("BEGIN TRANSACTION");

      const result = await db.run(
        "INSERT INTO PERSON (NAME, NICKNAME, TAX_TYPE, CPF_CNPJ) VALUES (?, ?, ?, ?)",
        [person.name, person.nickname, person.taxType, person.cpfCnpj]
      );

      await db.run(
        "INSERT INTO PERSON_COPY (ID, NAME, NICKNAME, TAX_TYPE, CPF_CNPJ) VALUES (?, ?, ?, ?, ?)",
        [
          result.lastID,
          person.name,
          person.nickname,
          person.taxType,
          person.cpfCnpj,
        ]
      );

      db.exec("COMMIT");

      return result.lastID!;
    } catch (err) {
      db.exec("ROLLBACK");

      console.error(err);
      throw err;
    } finally {
      db.close();
    }
  }

  async index(): Promise<Person[]> {
    const db = await getDatabaseConnection();

    try {
      const result = await db.all("SELECT * FROM PERSON");

      const people = result.map(
        (row) =>
          new Person(row.id, row.name, row.nickname, row.tax_type, row.cpf_cnpj)
      );

      return people;
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      db.close();
    }
  }

  async findById(id: number): Promise<Person | undefined> {
    const db = await getDatabaseConnection();

    try {
      const result = await db.get("SELECT * FROM PERSON WHERE ID = ?", [id]);

      if (!result) {
        return undefined;
      }

      const person = new Person(
        result.id,
        result.name,
        result.nickname,
        result.tax_type,
        result.cpf_cnpj
      );

      return person;
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      db.close();
    }
  }

  async update(person: Person): Promise<void> {
    const db = await getDatabaseConnection();

    try {
      await db.run(
        "UPDATE PERSON SET NAME = ?, NICKNAME = ?, TAX_TYPE = ?, CPF_CNPJ = ? WHERE ID = ?",
        [
          person.name,
          person.nickname,
          person.taxType,
          person.cpfCnpj,
          person.id,
        ]
      );
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      db.close();
    }
  }
  async delete(id: number): Promise<void> {
    const db = await getDatabaseConnection();

    try {
      await db.run("DELETE FROM PERSON WHERE ID = ?", [id]);
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      db.close();
    }
  }

  async checkCpfCnpj(cpfCnpj: string): Promise<boolean> {
    const db = await getDatabaseConnection();

    try {
      const result = await db.get("SELECT * FROM PERSON WHERE CPF_CNPJ = ?", [
        cpfCnpj,
      ]);

      return !!result;
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      db.close();
    }
  }
}
