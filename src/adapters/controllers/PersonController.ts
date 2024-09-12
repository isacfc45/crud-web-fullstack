import { CreatePersonUseCase } from "@/usecases/pessoa/CreatePessoaUseCase";
import { NextApiRequest, NextApiResponse } from "next";

export class PersonController {
  constructor(private createPersonUseCase: CreatePersonUseCase) {}

  async create(req: NextApiRequest, res: NextApiResponse) {
    const { person } = req.body;
    const id = await this.createPersonUseCase.execute(person);
    return res.status(201).json({ id });
  }

  async list(req: NextApiRequest, res: NextApiResponse) {
    const people = await this.createPersonUseCase.list();
    return res.status(200).json(people);
  }
}
