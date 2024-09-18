import { Address } from "@/domain/entities/Address";
import { CreateAddressUseCase } from "@/usecases/address/CreateAddressUseCase";
import { DeleteAddressUseCase } from "@/usecases/address/DeleteAddressUseCase";
import { IndexAddressUseCase } from "@/usecases/address/IndexAddressUseCase";
import { UpdateAddressUseCase } from "@/usecases/address/UpdateAddressUseCase";

export class AddressController {
  constructor(
    private createAddressUseCase: CreateAddressUseCase,
    private indexAddressUseCase: IndexAddressUseCase,
    private updateAddressUseCase: UpdateAddressUseCase,
    private deleteAddressUseCase: DeleteAddressUseCase
  ) {}

  async create(address: Address) {
    const id = await this.createAddressUseCase.execute(address);
    return id;
  }

  async index(id: number) {
    const addresses = await this.indexAddressUseCase.execute(id);
    return addresses;
  }

  async update(address: Address) {
    const id = await this.updateAddressUseCase.execute(address);
    return id;
  }

  async delete(id: number) {
    const addressId = await this.deleteAddressUseCase.execute(id);
    return { id: addressId };
  }
}
