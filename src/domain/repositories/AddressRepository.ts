import { Address } from "../entities/Address";

export interface AddressRepository {
  create(address: Address): Promise<number>;
  findById(id: number): Promise<Address | undefined>;
  update(address: Address): Promise<void>;
  delete(id: number): Promise<void>;
}
