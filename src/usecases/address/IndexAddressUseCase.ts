import { Address } from "@/domain/entities/Address";
import { AddressRepository } from "@/domain/repositories/AddressRepository";

export class IndexAddressUseCase {
  constructor(private addressRepository: AddressRepository) {}

  async execute(id: number): Promise<Address[]> {
    const addresses = await this.addressRepository.index(id);
    return addresses;
  }
}
