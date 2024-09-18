import { addressController } from "@/main/server";
import { NextApiRequest } from "next";

export const POST = async (req: NextApiRequest) => {
  const data = await new Response(req.body).json();
  return Response.json(await addressController.create(data));
};

export const GET = async (
  req: NextApiRequest,
  context: { params: { id: string } }
) => {
  const id = Number(context.params.id || 0);
  return Response.json(await addressController.index(id));
};
