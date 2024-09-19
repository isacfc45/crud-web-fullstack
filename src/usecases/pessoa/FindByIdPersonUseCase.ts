import { Person } from "@/domain/entities/Person";
import { PersonRepository } from "@/domain/repositories/PersonRepository";

export class FindByIdPersonUseCase {
  constructor(private personRepository: PersonRepository) {}

  async execute(id: number): Promise<Person> {
    const person = await this.personRepository.findById(id);
    if (!person) {
      throw new Error(`Pessoa com id ${id} não encontrada`);
    }
    return person;
  }
}
