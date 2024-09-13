import { Phone } from "../entities/Phone";

export interface PhoneRepository {
  create(phone: Phone): Promise<number>;
  findById(id: number): Promise<Phone | undefined>;
  update(phone: Phone): Promise<void>;
  delete(id: number): Promise<void>;
}
