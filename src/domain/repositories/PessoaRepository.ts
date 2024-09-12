import { Person } from "../entities/Person";

export interface PersonRepository {
  create(person: Person): Promise<number>;
  findById(id: number): Promise<Person | undefined>;
  update(person: Person): Promise<void>;
  delete(id: number): Promise<void>;
}
