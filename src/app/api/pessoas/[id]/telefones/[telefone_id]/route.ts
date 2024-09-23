import { phoneController } from "@/main/server";
import { NextRequest } from "next/server";

export const DELETE = async (
  req: NextRequest,
  context: { params: { id: string } }
) => {
  const id = Number(context.params.id || 0);

  return Response.json(await phoneController.delete(id));
};

export const GET = async (
  req: NextRequest,
  context: { params: { id: number; telefone_id: number } }
) => {
  const id = Number(context.params.telefone_id || 0);

  return Response.json(await phoneController.findById(id));
};

export const PUT = async (req: NextRequest) => {
  console.log(req.body);
  const data = await new Response(req.body).json();

  return Response.json(await phoneController.update(data));
};
