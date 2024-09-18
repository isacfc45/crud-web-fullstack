import { Phone } from "@/domain/entities/Phone";
import { PhoneRepository } from "@/domain/repositories/PhoneRepository";

export class IndexPhoneUseCase {
  constructor(private phoneRepository: PhoneRepository) {}

  async execute(id: number): Promise<Phone[]> {
    const phones = await this.phoneRepository.index(id);
    return phones;
  }
}
