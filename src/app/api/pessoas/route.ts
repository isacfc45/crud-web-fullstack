import { personController } from "@/main/server";
import { NextApiRequest } from "next";

export const POST = async (req: NextApiRequest) => {
  const data = await new Response(req.body).json();
  return Response.json(await personController.create(data));
};

export const GET = async () => {
  return Response.json(await personController.index());
};

export const GET_id = async (req: NextApiRequest) => {
  const id = Number(req.query.id);
  return Response.json(await personController.findById(id));
};

export const PUT_id = async (req: NextApiRequest) => {
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
