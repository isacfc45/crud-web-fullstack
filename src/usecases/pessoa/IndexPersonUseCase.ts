import { Person } from "@/domain/entities/Person";
import { PersonRepository } from "@/domain/repositories/PersonRepository";

export class IndexPersonUseCase {
  constructor(private personRepository: PersonRepository) {}

  async execute(): Promise<Person[]> {
    const pessoas = await this.personRepository.index();
    return pessoas;
  }
}
