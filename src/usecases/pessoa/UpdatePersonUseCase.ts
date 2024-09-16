import { Person } from "@/domain/entities/Person";
import { PersonRepository } from "@/domain/repositories/PessoaRepository";

export class UpdatePersonUseCase {
  constructor(private personRepository: PersonRepository) {}

  async execute(data: {
    id: number;
    name: string;
    nickname: string;
    taxType: string;
    cpfCnpj: string;
  }): Promise<void> {
    const person = new Person(
      data.id,
      data.name,
      data.nickname,
      data.taxType,
      data.cpfCnpj
    );
    const id = await this.personRepository.update(person);
    return id;
  }
}
