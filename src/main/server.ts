import { AddressController } from "@/adapters/controllers/AddressController";
import { PersonController } from "@/adapters/controllers/PersonController";
import { PhoneController } from "@/adapters/controllers/PhoneController";
import { AddressRepositoryImpl } from "@/external/db/AddressRepositoryImpl";
import { PersonRepositoryImpl } from "@/external/db/PersonRepositoryImpl";
import { PhoneRepositoryImpl } from "@/external/db/PhoneRepositoryImpl";
import { CreateAddressUseCase } from "@/usecases/address/CreateAddressUseCase";
import { DeleteAddressUseCase } from "@/usecases/address/DeleteAddressUseCase";
import { FindByIdAddressUseCase } from "@/usecases/address/FindByIdAddressUseCase";
import { IndexAddressUseCase } from "@/usecases/address/IndexAddressUseCase";
import { UpdateAddressUseCase } from "@/usecases/address/UpdateAddressUseCase";
import { CheckCpfCnpjPersonUseCase } from "@/usecases/pessoa/CheckCpfCnpjPersonUseCase";
import { CreatePersonUseCase } from "@/usecases/pessoa/CreatePersonUseCase";
import { DeletePersonUseCase } from "@/usecases/pessoa/DeletePersonUseCase";
import { FindByIdPersonUseCase } from "@/usecases/pessoa/FindByIdPersonUseCase";
import { IndexPersonUseCase } from "@/usecases/pessoa/IndexPersonUseCase";
import { UpdatePersonUseCase } from "@/usecases/pessoa/UpdatePersonUseCase";
import { CreatePhoneUseCase } from "@/usecases/phone/CreatePhoneUseCase";
import { DeletePhoneUseCase } from "@/usecases/phone/DeletePhoneUseCase";
import { FindByIdPhoneUseCase } from "@/usecases/phone/FindByIdPhoneUseCase";
import { IndexPhoneUseCase } from "@/usecases/phone/IndexPhoneUseCase";
import { UpdatePhoneUseCase } from "@/usecases/phone/UpdatePhoneUseCase";

const personRepository = new PersonRepositoryImpl();
const createPersonUseCase = new CreatePersonUseCase(personRepository);
const indexPersonUseCase = new IndexPersonUseCase(personRepository);
const findByIdPersonUseCase = new FindByIdPersonUseCase(personRepository);
const updatePersonUseCase = new UpdatePersonUseCase(personRepository);
const deletePersonUseCase = new DeletePersonUseCase(personRepository);
const checkCpfCnpj = new CheckCpfCnpjPersonUseCase(personRepository);
const personController = new PersonController(
  createPersonUseCase,
  indexPersonUseCase,
  findByIdPersonUseCase,
  updatePersonUseCase,
  deletePersonUseCase,
  checkCpfCnpj
);

const addressRepository = new AddressRepositoryImpl();
const createAddressUseCase = new CreateAddressUseCase(addressRepository);
const indexAddressUseCase = new IndexAddressUseCase(addressRepository);
const updateAddressUseCase = new UpdateAddressUseCase(addressRepository);
const deleteAddressUseCase = new DeleteAddressUseCase(addressRepository);
const findByIdAddressUseCase = new FindByIdAddressUseCase(addressRepository);
const addressController = new AddressController(
  createAddressUseCase,
  indexAddressUseCase,
  updateAddressUseCase,
  deleteAddressUseCase,
  findByIdAddressUseCase
);

const phoneRepository = new PhoneRepositoryImpl();
const createPhoneUseCase = new CreatePhoneUseCase(phoneRepository);
const indexPhoneUseCase = new IndexPhoneUseCase(phoneRepository);
const updatePhoneUseCase = new UpdatePhoneUseCase(phoneRepository);
const deletePhoneUseCase = new DeletePhoneUseCase(phoneRepository);
const findByIdPhoneUseCase = new FindByIdPhoneUseCase(phoneRepository);
const phoneController = new PhoneController(
  createPhoneUseCase,
  indexPhoneUseCase,
  updatePhoneUseCase,
  deletePhoneUseCase,
  findByIdPhoneUseCase
);

export { personController, addressController, phoneController };
