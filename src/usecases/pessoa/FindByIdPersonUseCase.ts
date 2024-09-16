import { Person } from "@/domain/entities/Person";
import { PersonRepository } from "@/domain/repositories/PessoaRepository";

export class FindByIdPersonUseCase {
  constructor(private personRepository: PersonRepository) {}

  async execute(id: number): Promise<Person> {
    const person = await this.personRepository.findById(id);
    if (!person) {
      throw new Error(`Person with ID ${id} not found`);
    }
    return person;
  }
}
