import { PersonController } from "@/app/adapters/controllers/PersonController";
import { PersonRepositoryImpl } from "@/external/db/PersonRepositoryImpl";
import { CreatePersonUseCase } from "@/usecases/pessoa/CreatePessoaUseCase";

const personRepository = new PersonRepositoryImpl();
const createPersonUseCase = new CreatePersonUseCase(personRepository);
const personController = new PersonController(createPersonUseCase);

export { personController };
