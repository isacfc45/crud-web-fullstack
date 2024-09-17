import { Phone } from "@/domain/entities/Phone";
import { PhoneRepository } from "@/domain/repositories/PhoneRepository";

export class CreatePhoneUseCase {
  constructor(private phoneRepository: PhoneRepository) {}

  async execute(data: {
    area: string;
    number: string;
    description: string;
    personId: number;
  }): Promise<number> {
    const phone = new Phone(
      0,
      data.area,
      data.number,
      data.description,
      data.personId
    );
    const id = await this.phoneRepository.create(phone);
    return id;
  }
}
