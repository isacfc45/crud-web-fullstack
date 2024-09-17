import { Address } from "@/domain/entities/Address";
import { AddressRepository } from "@/domain/repositories/AddressRepository";

export class CreateAddressUseCase {
  constructor(private addressRepository: AddressRepository) {}

  async execute(data: {
    road: string;
    number: string;
    complement: string;
    neighborhood: string;
    cep: string;
    city: string;
    state: string;
    country: string;
    personId: number;
  }): Promise<number> {
    const address = new Address(
      0,
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
    const id = await this.addressRepository.create(address);
    return id;
  }
}
