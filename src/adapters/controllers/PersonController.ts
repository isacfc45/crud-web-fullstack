import { Person } from "@/domain/entities/Person";
import { CheckCpfCnpjPersonUseCase } from "@/usecases/pessoa/CheckCpfCnpjPersonUseCase";
import { CreatePersonUseCase } from "@/usecases/pessoa/CreatePersonUseCase";
import { DeletePersonUseCase } from "@/usecases/pessoa/DeletePersonUseCase";
import { FindByIdPersonUseCase } from "@/usecases/pessoa/FindByIdPersonUseCase";
import { IndexPersonUseCase } from "@/usecases/pessoa/IndexPersonUseCase";
import { UpdatePersonUseCase } from "@/usecases/pessoa/UpdatePersonUseCase";

export class PersonController {
  constructor(
    private createPersonUseCase: CreatePersonUseCase,
    private indexPersonUseCase: IndexPersonUseCase,
    private findByIdPersonUseCase: FindByIdPersonUseCase,
    private updatePersonUseCase: UpdatePersonUseCase,
    private deletePersonUseCase: DeletePersonUseCase,
    private checkCpfCnpjPersonUseCase: CheckCpfCnpjPersonUseCase
  ) {}

  async create(person: Person) {
    const id = await this.createPersonUseCase.execute(person);
    return { id };
  }

  async index() {
    const pessoas = await this.indexPersonUseCase.execute();
    return pessoas;
  }

  async findById(id: number) {
    const pessoa = await this.findByIdPersonUseCase.execute(id);
    return pessoa;
  }

  async update(person: Person) {
    const id = await this.updatePersonUseCase.execute(person);
    return { id };
  }

  async delete(id: number) {
    const personId = await this.deletePersonUseCase.execute(id);
    return { id: personId };
  }

  async checkCpfCnpj(cpfCnpj: string) {
    console.log(cpfCnpj);
    const exists = await this.checkCpfCnpjPersonUseCase.execute(cpfCnpj);
    return { exists };
  }
}
