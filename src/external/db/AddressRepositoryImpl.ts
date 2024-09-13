import { Address } from "@/domain/entities/Address";
import { AddressRepository } from "@/domain/repositories/AddressRepository";
import { getDatabaseConnection } from "@/main/config";

export class AddressRepositoryImpl implements AddressRepository {
  async create(address: Address): Promise<number> {
    const db = await getDatabaseConnection();
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO ADDRESS (PUBLIC_PLACE, NUMBER, COMPLEMENT, NEUGHBORHOOD, CEP, CITY, STATE, COUNTRY, PERSON_ID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING ID",
        [
          address.publicPlace,
          address.number,
          address.complement,
          address.neighborhood,
          address.cep,
          address.city,
          address.state,
          address.country,
          address.personId,
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

  async findById(id: number): Promise<Address | undefined> {
    const db = await getDatabaseConnection();
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM ADDRESS WHERE ID = ?", [id], (err, result) => {
        db.detach();
        if (err) {
          reject(err);
        } else {
          if (result.length === 0) {
            resolve(undefined);
          } else {
            const address = new Address(
              result[0].ID,
              result[0].PUBLIC_PLACE,
              result[0].NUMBER,
              result[0].COMPLEMENT,
              result[0].NEIGHBORHOOD,
              result[0].CEP,
              result[0].CITY,
              result[0].STATE,
              result[0].COUNTRY,
              result[0].PERSON_ID
            );
            resolve(address);
          }
        }
      });
    });
  }

  async update(address: Address): Promise<void> {
    const db = await getDatabaseConnection();
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE ADDRESS SET PUBLIC_PLACE = ?, NUMBER = ?, COMPLEMENT = ?, NEIGHBORHOOD = ?, CEP = ?, CITY = ?, STATE = ?, COUNTRY = ?, PERSON_ID = ? WHERE ID = ?",
        [
          address.publicPlace,
          address.number,
          address.complement,
          address.neighborhood,
          address.cep,
          address.city,
          address.state,
          address.country,
          address.personId,
          address.id,
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
      db.query("DELETE FROM ADDRESS WHERE ID = ?", [id], (err) => {
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
