import { Address } from "@/domain/entities/Address";
import { AddressRepository } from "@/domain/repositories/AddressRepository";
import { getDatabaseConnection } from "@/main/config";

export class AddressRepositoryImpl implements AddressRepository {
  async create(address: Address): Promise<number> {
    const db = await getDatabaseConnection();

    try {
      const result = await db.run(
        "INSERT INTO ADDRESS (ROAD, NUMBER, COMPLEMENT, NEIGHBORHOOD, CEP, CITY, STATE, COUNTRY, PERSON_ID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          address.road,
          address.number,
          address.complement,
          address.neighborhood,
          address.cep,
          address.city,
          address.state,
          address.country,
          address.personId,
        ]
      );

      return result.lastID;
    } catch (err) {
      throw err;
    } finally {
      db.close();
    }
  }

  async index(): Promise<Address[]> {
    const db = await getDatabaseConnection();

    try {
      const result = await db.all("SELECT * FROM ADDRESS");

      const addresses = result.map(
        (row) =>
          new Address(
            row.id,
            row.road,
            row.number,
            row.complement,
            row.neighborhood,
            row.cep,
            row.city,
            row.state,
            row.country,
            row.person_id
          )
      );

      return addresses;
    } catch (err) {
      throw err;
    } finally {
      db.close();
    }
  }

  async update(address: Address): Promise<void> {
    const db = await getDatabaseConnection();

    try {
      await db.run(
        "UPDATE ADDRESS SET ROAD = ?, NUMBER = ?, COMPLEMENT = ?, NEIGHBORHOOD = ?, CEP = ?, CITY = ?, STATE = ?, COUNTRY = ?, PERSON_ID = ? WHERE ID = ?",
        [
          address.road,
          address.number,
          address.complement,
          address.neighborhood,
          address.cep,
          address.city,
          address.state,
          address.country,
          address.personId,
          address.id,
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
      await db.run("DELETE FROM ADDRESS WHERE ID = ?", [id]);
    } catch (err) {
      throw err;
    } finally {
      db.close();
    }
  }
}
