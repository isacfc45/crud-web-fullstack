import { Phone } from "@/domain/entities/Phone";
import { CreatePhoneUseCase } from "@/usecases/phone/CreatePhoneUseCase";
import { DeletePhoneUseCase } from "@/usecases/phone/DeletePhoneUseCase";
import { IndexPhoneUseCase } from "@/usecases/phone/IndexPhoneUseCase";
import { UpdatePhoneUseCase } from "@/usecases/phone/UpdatePhoneUseCase";

export class PhoneController {
  constructor(
    private createPhoneUseCase: CreatePhoneUseCase,
    private indexPhoneUseCase: IndexPhoneUseCase,
    private updatePhoneUseCase: UpdatePhoneUseCase,
    private deletePhoneUseCase: DeletePhoneUseCase
  ) {}

  async create(phone: Phone) {
    const id = await this.createPhoneUseCase.execute(phone);
    return id;
  }

  async index() {
    const phones = await this.indexPhoneUseCase.execute();
    return phones;
  }

  async update(phone: Phone) {
    const id = await this.updatePhoneUseCase.execute(phone);
    return id;
  }

  async delete(id: number) {
    const phoneId = await this.deletePhoneUseCase.execute(id);
    return { id: phoneId };
  }
}
