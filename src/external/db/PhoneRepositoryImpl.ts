import { Phone } from "@/domain/entities/Phone";
import { PhoneRepository } from "@/domain/repositories/PhoneRepository";
import { getDatabaseConnection } from "@/main/config";

export class PhoneRepositoryImpl implements PhoneRepository {
  async create(phone: Phone): Promise<number> {
    const db = await getDatabaseConnection();
    try {
      const [result] = await db.execute(
        "INSERT INTO phone (AREA, NUMBER, DESCRIPTION, PERSON_ID) VALUES (?, ?, ?, ?)",
        [phone.area, phone.number, phone.description, phone.personId]
      );

      const insertId = (result as any).insertId;
      return insertId;
    } catch (err) {
      throw err;
    } finally {
      await db.end();
    }
  }

  async index(id: number): Promise<Phone[]> {
    const db = await getDatabaseConnection();

    try {
      const [rows] = await db.execute(
        "SELECT * FROM phone WHERE PERSON_ID = ?",
        [id]
      );

      const phones = (rows as any[]).map(
        (row) =>
          new Phone(
            row.id,
            row.area,
            row.number,
            row.description,
            row.person_id
          )
      );

      return phones;
    } catch (err) {
      throw err;
    } finally {
      await db.end();
    }
  }

  async update(phone: Phone): Promise<void> {
    const db = await getDatabaseConnection();

    try {
      await db.execute(
        "UPDATE phone SET AREA = ?, NUMBER = ?, DESCRIPTION = ?, PERSON_ID = ? WHERE ID = ?",
        [phone.area, phone.number, phone.description, phone.personId, phone.id]
      );
    } catch (err) {
      throw err;
    } finally {
      await db.end();
    }
  }

  async delete(id: number): Promise<void> {
    const db = await getDatabaseConnection();

    try {
      await db.execute("DELETE FROM phone WHERE ID = ?", [id]);
    } catch (err) {
      throw err;
    } finally {
      await db.end();
    }
  }

  async findById(id: number): Promise<Phone> {
    const db = await getDatabaseConnection();

    try {
      const [rows] = await db.execute("SELECT * FROM phones WHERE ID = ?", [
        id,
      ]);

      if ((rows as any[]).length === 0) {
        throw new Error(`Telefone com id ${id} não encontrado`);
      }

      const result = (rows as any[])[0];
      return new Phone(
        result.id,
        result.area,
        result.number,
        result.description,
        result.person_id
      );
    } catch (err) {
      throw err;
    } finally {
      await db.end();
    }
  }
}
