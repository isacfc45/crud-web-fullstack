import { Phone } from "@/domain/entities/Phone";
import { PhoneRepository } from "@/domain/repositories/PhoneRepository";
import { getDatabaseConnection } from "@/main/config";

export class PhoneRepositoryImpl implements PhoneRepository {
  async create(phone: Phone): Promise<number> {
    const db = await getDatabaseConnection();
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO PHONE (AREA, NUMBER, DEVICE, DESCRIPTION, PERSON_ID) VALUES (?, ?, ?, ?, ?) RETURNING ID",
        [
          phone.area,
          phone.number,
          phone.device,
          phone.description,
          phone.personId,
        ],
        (err, result) => {
          db.detach();
          if (err) {
            reject(err);
          } else {
            resolve(result[0].ID);
          }
        }
      );
    });
  }

  async findById(id: number): Promise<Phone | undefined> {
    const db = await getDatabaseConnection();
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM PHONE WHERE ID = ?", [id], (err, result) => {
        db.detach();
        if (err) {
          reject(err);
        } else {
          if (result.length === 0) {
            resolve(undefined);
          } else {
            const phone = new Phone(
              result[0].ID,
              result[0].AREA,
              result[0].NUMBER,
              result[0].DEVICE,
              result[0].DESCRIPTION,
              result[0].PERSON_ID
            );
            resolve(phone);
          }
        }
      });
    });
  }

  async update(phone: Phone): Promise<void> {
    const db = await getDatabaseConnection();
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE PHONE SET AREA = ?, NUMBER = ?, DEVICE = ?, DESCRIPTION = ?, PERSON_ID = ? WHERE ID = ?",
        [
          phone.area,
          phone.number,
          phone.device,
          phone.description,
          phone.personId,
          phone.id,
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
      db.query("DELETE FROM PHONE WHERE ID = ?", [id], (err) => {
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
