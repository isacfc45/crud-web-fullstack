import { PersonRepository } from "@/domain/repositories/PersonRepository";

export class CheckCpfCnpjPersonUseCase {
  constructor(private personRepository: PersonRepository) {
    this.personRepository = personRepository;
  }
  async execute(cpfCnpj: string): Promise<boolean> {
    return this.personRepository.checkCpfCnpj(cpfCnpj);
  }
}
