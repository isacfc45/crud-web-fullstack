import { personController } from "@/main/server";
import { NextApiRequest } from "next";

export const GET = async (
  req: NextApiRequest,
  context: { params: { id: string } }
) => {
  const id = Number(context.params.id || 0);

  return Response.json(await personController.findById(id));
};

export const PUT = async (req: NextApiRequest) => {
  const data = await new Response(req.body).json();

  return Response.json(await personController.update(data));
};

export const DELETE = async (
  req: NextApiRequest,
  context: { params: { id: string } }
) => {
  const id = Number(context.params.id || 0);

  return Response.json(await personController.delete(id));
};
