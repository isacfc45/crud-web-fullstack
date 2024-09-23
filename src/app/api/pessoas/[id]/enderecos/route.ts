import { addressController } from "@/main/server";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  const data = await new Response(req.body).json();
  return Response.json(await addressController.create(data));
};

export const GET = async (
  req: NextRequest,
  context: { params: { id: string } }
) => {
  const id = Number(context.params.id || 0);
  return Response.json(await addressController.index(id));
};
