import { PersonController } from "@/adapters/controllers/PersonController";
import { PersonRepositoryImpl } from "@/external/db/PersonRepositoryImpl";
import { CreatePersonUseCase } from "@/usecases/pessoa/CreatePersonUseCase";
import { IndexPersonUseCase } from "@/usecases/pessoa/IndexPersonUseCase";

const personRepository = new PersonRepositoryImpl();
const createPersonUseCase = new CreatePersonUseCase(personRepository);
const indexPersonUseCase = new IndexPersonUseCase(personRepository);
const personController = new PersonController(
  createPersonUseCase,
  indexPersonUseCase
);

export { personController };
