import { Person } from "@/domain/entities/Person";
import { PersonRepository } from "@/domain/repositories/PessoaRepository";

export class IndexPersonUseCase {
  constructor(private personRepository: PersonRepository) {}

  async execute(): Promise<Person[]> {
    const pessoas = await this.personRepository.index();
    return pessoas;
  }
}
