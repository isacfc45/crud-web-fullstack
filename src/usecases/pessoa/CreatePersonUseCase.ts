import { Person } from "@/domain/entities/Person";
import { PersonRepository } from "@/domain/repositories/PessoaRepository";

export class CreatePersonUseCase {
  constructor(private personRepository: PersonRepository) {}
  async execute(data: {
    name: string;
    nickname: string;
    taxType: string;
    cpfCnpj: string;
  }): Promise<number> {
    const pessoa = new Person(
      0,
      data.name,
      data.nickname,
      data.taxType,
      data.cpfCnpj
    );
    const id = await this.personRepository.create(pessoa);
    return id;
  }
}
