import { PhoneRepository } from "@/domain/repositories/PhoneRepository";

export class DeletePhoneUseCase {
  constructor(private phoneRepository: PhoneRepository) {}

  async execute(id: number): Promise<void> {
    await this.phoneRepository.delete(id);
  }
}
