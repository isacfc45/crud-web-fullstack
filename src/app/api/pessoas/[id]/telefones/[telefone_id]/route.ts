import { phoneController } from "@/main/server";
import { NextApiRequest } from "next";

export const DELETE = async (
  req: NextApiRequest,
  context: { params: { id: string } }
) => {
  const id = Number(context.params.id || 0);

  return Response.json(await phoneController.delete(id));
};
