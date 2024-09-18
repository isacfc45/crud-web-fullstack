import { Address } from "../entities/Address";

export interface AddressRepository {
  create(address: Address): Promise<number>;
  index(id: number): Promise<Address[]>;
  update(address: Address): Promise<void>;
  delete(id: number): Promise<void>;
}
