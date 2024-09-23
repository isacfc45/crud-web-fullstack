import { personController } from "@/main/server";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  const data = await new Response(req.body).json();
  return Response.json(await personController.checkCpfCnpj(data));
};
