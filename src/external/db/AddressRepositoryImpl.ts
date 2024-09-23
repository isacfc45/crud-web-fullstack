import { Address } from "@/domain/entities/Address";
import { AddressRepository } from "@/domain/repositories/AddressRepository";
import { getDatabaseConnection } from "@/main/config";

export class AddressRepositoryImpl implements AddressRepository {
  async create(address: Address): Promise<number> {
    const db = await getDatabaseConnection();

    try {
      const [result] = await db.execute(
        "INSERT INTO address (ROAD, NUMBER, COMPLEMENT, NEIGHBORHOOD, CEP, CITY, STATE, COUNTRY, PERSON_ID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
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

      const insertId = (result as any).insertId;
      return insertId;
    } catch (err) {
      throw err;
    } finally {
      await db.end();
    }
  }

  async index(id: number): Promise<Address[]> {
    const db = await getDatabaseConnection();

    try {
      const [rows] = await db.execute(
        "SELECT * FROM address WHERE PERSON_ID = ?",
        [id]
      );

      const addresses = (rows as any[]).map(
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
      await db.end();
    }
  }

  async update(address: Address): Promise<void> {
    const db = await getDatabaseConnection();

    try {
      await db.execute(
        "UPDATE address SET ROAD = ?, NUMBER = ?, COMPLEMENT = ?, NEIGHBORHOOD = ?, CEP = ?, CITY = ?, STATE = ?, COUNTRY = ?, PERSON_ID = ? WHERE ID = ?",
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
      await db.end();
    }
  }

  async delete(id: number): Promise<void> {
    const db = await getDatabaseConnection();

    try {
      await db.execute("DELETE FROM address WHERE ID = ?", [id]);
    } catch (err) {
      throw err;
    } finally {
      await db.end();
    }
  }

  async findById(id: number): Promise<Address> {
    const db = await getDatabaseConnection();

    try {
      const [rows] = await db.execute("SELECT * FROM address WHERE ID = ?", [
        id,
      ]);

      if ((rows as any[]).length === 0) {
        throw new Error("Endereço não encontrado");
      }

      const result = (rows as any[])[0];
      return new Address(
        result.id,
        result.road,
        result.number,
        result.complement,
        result.neighborhood,
        result.cep,
        result.city,
        result.state,
        result.country,
        result.person_id
      );
    } catch (err) {
      throw err;
    } finally {
      await db.end();
    }
  }
}
