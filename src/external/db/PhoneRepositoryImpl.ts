import { Phone } from "@/domain/entities/Phone";
import { PhoneRepository } from "@/domain/repositories/PhoneRepository";
import { getDatabaseConnection } from "@/main/config";

export class PhoneRepositoryImpl implements PhoneRepository {
  async create(phone: Phone): Promise<number> {
    const db = await getDatabaseConnection();
    try {
      const result = await db.run(
        "INSERT INTO PHONE (AREA, NUMBER, DEVICE, DESCRIPTION, PERSON_ID) VALUES (?, ?, ?, ?, ?)",
        [
          phone.area,
          phone.number,
          phone.device,
          phone.description,
          phone.personId,
        ]
      );

      return result.lastID;
    } catch (err) {
      throw err;
    } finally {
      db.close();
    }
  }

  async index(): Promise<Phone[]> {
    const db = await getDatabaseConnection();

    try {
      const result = await db.all("SELECT * FROM PHONE");

      const phones = result.map(
        (row) =>
          new Phone(
            row.id,
            row.area,
            row.number,
            row.device,
            row.description,
            row.person_id
          )
      );

      return phones;
    } catch (err) {
      throw err;
    } finally {
      db.close();
    }
  }

  async update(phone: Phone): Promise<void> {
    const db = await getDatabaseConnection();

    try {
      await db.run(
        "UPDATE PHONE SET AREA = ?, NUMBER = ?, DEVICE = ?, DESCRIPTION = ?, PERSON_ID = ? WHERE ID = ?",
        [
          phone.area,
          phone.number,
          phone.device,
          phone.description,
          phone.personId,
          phone.id,
        ]
      );
    } catch (err) {
      throw err;
    } finally {
      db.close();
    }
  }

  async delete(id: number): Promise<void> {
    const db = await getDatabaseConnection();

    try {
      await db.run("DELETE FROM PHONE WHERE ID = ?", [id]);
    } catch (err) {
      throw err;
    } finally {
      db.close();
    }
  }
}
