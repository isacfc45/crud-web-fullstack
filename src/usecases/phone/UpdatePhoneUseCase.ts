import { Phone } from "@/domain/entities/Phone";
import { PhoneRepository } from "@/domain/repositories/PhoneRepository";

export class UpdatePhoneUseCase {
  constructor(private phoneRepository: PhoneRepository) {}

  async execute(data: {
    id: number;
    area: string;
    number: string;
    device: string;
    description: string;
    personId: number;
  }): Promise<void> {
    const phone = new Phone(
      data.id,
      data.area,
      data.number,
      data.device,
      data.description,
      data.personId
    );
    const id = await this.phoneRepository.update(phone);
    return id;
  }
}
