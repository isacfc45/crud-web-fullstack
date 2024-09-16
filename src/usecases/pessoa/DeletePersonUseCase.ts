import { PersonRepository } from "@/domain/repositories/PessoaRepository";

export class DeletePersonUseCase {
  constructor(private personRepository: PersonRepository) {}

  async execute(id: number): Promise<void> {
    const person = await this.personRepository.findById(id);
    if (!person) {
      throw new Error(`Pessoa com id ${id} não encontrada`);
    }
    const personId = await this.personRepository.delete(id);
    return personId;
  }
}
