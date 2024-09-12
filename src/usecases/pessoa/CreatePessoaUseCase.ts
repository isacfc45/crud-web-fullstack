import { Person } from "@/domain/entities/Person";
import { PersonRepository } from "@/domain/repositories/PessoaRepository";

export class CreatePersonUseCase {
  constructor(private personRepository: PersonRepository) {}
  async execute(data: {
    id: number;
    name: string;
    age: number;
    email: string;
    password: string;
  }): Promise<number> {
    const pessoa = new Person(
      data.id,
      data.name,
      data.age,
      data.email,
      data.password
    );
    const id = await this.personRepository.create(pessoa);
    return id;
  }
}
