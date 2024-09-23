import { personController } from "@/main/server";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  const data = await new Response(req.body).json();
  return Response.json(await personController.create(data));
};

export const GET = async () => {
  return Response.json(await personController.index());
};

export const DELETE = async (
  req: NextRequest,
  context: { params: { id: string } }
) => {
  const id = Number(context.params.id || 0);

  return Response.json(await personController.delete(id));
};
