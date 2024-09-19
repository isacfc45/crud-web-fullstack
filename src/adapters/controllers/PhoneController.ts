import { Phone } from "@/domain/entities/Phone";
import { CreatePhoneUseCase } from "@/usecases/phone/CreatePhoneUseCase";
import { DeletePhoneUseCase } from "@/usecases/phone/DeletePhoneUseCase";
import { FindByIdPhoneUseCase } from "@/usecases/phone/FindByIdPhoneUseCase";
import { IndexPhoneUseCase } from "@/usecases/phone/IndexPhoneUseCase";
import { UpdatePhoneUseCase } from "@/usecases/phone/UpdatePhoneUseCase";

export class PhoneController {
  constructor(
    private createPhoneUseCase: CreatePhoneUseCase,
    private indexPhoneUseCase: IndexPhoneUseCase,
    private updatePhoneUseCase: UpdatePhoneUseCase,
    private deletePhoneUseCase: DeletePhoneUseCase,
    private findByIdPhoneUseCase: FindByIdPhoneUseCase
  ) {}

  async create(phone: Phone) {
    const id = await this.createPhoneUseCase.execute(phone);
    return id;
  }

  async index(id: number) {
    const phones = await this.indexPhoneUseCase.execute(id);
    return phones;
  }

  async update(phone: Phone) {
    const id = await this.updatePhoneUseCase.execute(phone);
    return { id };
  }

  async delete(id: number) {
    const phoneId = await this.deletePhoneUseCase.execute(id);
    return { id: phoneId };
  }

  async findById(id: number) {
    const phone = await this.findByIdPhoneUseCase.execute(id);
    return phone;
  }
}
