import { AddressRepository } from "@/domain/repositories/AddressRepository";

export class DeleteAddressUseCase {
  constructor(private addressRepository: AddressRepository) {}

  async execute(id: number): Promise<void> {
    await this.addressRepository.delete(id);
  }
}
