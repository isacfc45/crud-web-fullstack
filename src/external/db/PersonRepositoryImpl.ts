import { Person } from "@/domain/entities/Person";
import { PersonRepository } from "@/domain/repositories/PersonRepository";
import { getDatabaseConnection } from "@/main/config";

export class PersonRepositoryImpl implements PersonRepository {
  async create(person: Person): Promise<number> {
    const db = await getDatabaseConnection();

    try {
      await db.beginTransaction();

      const [result] = await db.execute(
        "INSERT INTO person (NAME, NICKNAME, TAX_TYPE, CPF_CNPJ) VALUES (?, ?, ?, ?)",
        [person.name, person.nickname, person.taxType, person.cpfCnpj]
      );

      const insertId = (result as any).insertId;
      await db.execute(
        "INSERT INTO person_copy (ID, NAME, NICKNAME, TAX_TYPE, CPF_CNPJ) VALUES (?, ?, ?, ?, ?)",
        [insertId, person.name, person.nickname, person.taxType, person.cpfCnpj]
      );

      await db.commit();
      return insertId;
    } catch (err) {
      await db.rollback();
      console.error(err);
      throw err;
    } finally {
      await db.end();
    }
  }

  async index(): Promise<Person[]> {
    const db = await getDatabaseConnection();

    try {
      const [rows] = await db.execute("SELECT * FROM person ORDER BY NAME");

      const people = (rows as any[]).map(
        (row) =>
          new Person(row.id, row.name, row.nickname, row.tax_type, row.cpf_cnpj)
      );

      return people;
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      await db.end();
    }
  }

  async findById(id: number): Promise<Person | undefined> {
    const db = await getDatabaseConnection();

    try {
      const [rows] = await db.execute("SELECT * FROM person WHERE ID = ?", [
        id,
      ]);

      if ((rows as any[]).length === 0) {
        return undefined;
      }

      const result = (rows as any[])[0];
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
      await db.end();
    }
  }

  async update(person: Person): Promise<void> {
    const db = await getDatabaseConnection();

    try {
      await db.execute(
        "UPDATE person SET NAME = ?, NICKNAME = ?, TAX_TYPE = ?, CPF_CNPJ = ? WHERE ID = ?",
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
      await db.end();
    }
  }

  async delete(id: number): Promise<void> {
    const db = await getDatabaseConnection();

    try {
      await db.execute("DELETE FROM person WHERE ID = ?", [id]);
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      await db.end();
    }
  }

  async checkCpfCnpj(cpfCnpj: string): Promise<boolean> {
    const db = await getDatabaseConnection();

    try {
      const [rows] = await db.execute(
        "SELECT * FROM person WHERE CPF_CNPJ = ?",
        [cpfCnpj]
      );

      return (rows as any[]).length > 0;
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      await db.end();
    }
  }
}
