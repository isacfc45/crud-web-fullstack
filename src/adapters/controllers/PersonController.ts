import { CreatePersonUseCase } from "@/usecases/pessoa/CreatePersonUseCase";
import { IndexPersonUseCase } from "@/usecases/pessoa/IndexPersonUseCase";
import { NextApiRequest, NextApiResponse } from "next";

export class PersonController {
  constructor(
    private createPersonUseCase: CreatePersonUseCase,
    private indexPersonUseCase: IndexPersonUseCase
  ) {}

  async create(person: any) {
    const id = await this.createPersonUseCase.execute(person);
    return { id };
  }

  async index(req: NextApiRequest, res: NextApiResponse) {
    const pessoas = await this.indexPersonUseCase.execute();
    return res.status(200).json({ pessoas });
  }
}
