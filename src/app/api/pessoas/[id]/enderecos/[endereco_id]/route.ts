import { addressController } from "@/main/server";
import { NextRequest } from "next/server";

export const DELETE = async (
  req: NextRequest,
  context: { params: { id: number } }
) => {
  const id = Number(context.params.id || 0);

  return Response.json(await addressController.delete(id));
};

export const GET = async (
  req: NextRequest,
  context: { params: { id: number; endereco_id: number } }
) => {
  const id = Number(context.params.endereco_id || 0);

  return Response.json(await addressController.findById(id));
};

export const PUT = async (req: NextRequest) => {
  console.log(req.body);
  const data = await new Response(req.body).json();

  return Response.json(await addressController.update(data));
};
