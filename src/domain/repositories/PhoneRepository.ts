import { Phone } from "../entities/Phone";

export interface PhoneRepository {
  create(phone: Phone): Promise<number>;
  index(id: number): Promise<Phone[]>;
  update(phone: Phone): Promise<void>;
  delete(id: number): Promise<void>;
}
