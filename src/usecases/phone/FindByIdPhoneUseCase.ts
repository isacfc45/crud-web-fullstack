import { Phone } from "@/domain/entities/Phone";
import { PhoneRepository } from "@/domain/repositories/PhoneRepository";

export class FindByIdPhoneUseCase {
  constructor(private phoneRepository: PhoneRepository) {}

  async execute(id: number): Promise<Phone> {
    const person = await this.phoneRepository.findById(id);
    if (!person) {
      throw new Error(`Telefone com id ${id} não encontrada`);
    }
    return person;
  }
}
