import { Address } from "@/domain/entities/Address";
import { AddressRepository } from "@/domain/repositories/AddressRepository";

export class FindByIdAddressUseCase {
  constructor(private addressRepository: AddressRepository) {}

  async execute(id: number): Promise<Address> {
    const address = await this.addressRepository.findById(id);
    if (!address) {
      throw new Error(`Endereço com id ${id} não encontrado`);
    }
    return address;
  }
}
