import { Address } from "@/domain/entities/Address";
import { AddressRepository } from "@/domain/repositories/AddressRepository";

export class UpdateAddressUseCase {
  constructor(private addressRepository: AddressRepository) {}

  async execute(data: {
    id: number;
    road: string;
    number: string;
    complement: string;
    neighborhood: string;
    cep: string;
    city: string;
    state: string;
    country: string;
    personId: number;
  }): Promise<void> {
    const address = new Address(
      data.id,
      data.road,
      data.number,
      data.complement,
      data.neighborhood,
      data.cep,
      data.city,
      data.state,
      data.country,
      data.personId
    );
    await this.addressRepository.update(address);
  }
}
