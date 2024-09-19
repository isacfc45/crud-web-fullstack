import { personController } from "@/main/server";
import { NextApiRequest } from "next";

export const POST = async (req: NextApiRequest) => {
  const data = await new Response(req.body).json();
  return Response.json(await personController.checkCpfCnpj(data));
};
