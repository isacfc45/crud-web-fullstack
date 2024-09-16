import { Phone } from "../entities/Phone";

export interface PhoneRepository {
  create(phone: Phone): Promise<number>;
  index(): Promise<Phone[]>;
  update(phone: Phone): Promise<void>;
  delete(id: number): Promise<void>;
}
