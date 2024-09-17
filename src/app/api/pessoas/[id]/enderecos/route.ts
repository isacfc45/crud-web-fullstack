import { addressController } from "@/main/server";
import { NextApiRequest } from "next";

export const POST = async (req: NextApiRequest) => {
  const data = await new Response(req.body).json();
  return Response.json(await addressController.create(data));
};

export const GET = async () => {
  return Response.json(await addressController.index());
};
