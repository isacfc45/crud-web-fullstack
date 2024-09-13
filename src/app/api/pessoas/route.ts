import { personController } from "@/main/server";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: true,
  },
};

export const POST = async (req: NextApiRequest) => {
  const data = await new Response(req.body).json();
  console.log(Response.json(await personController.create(data)));
  return Response.json(await personController.create(data));
};

export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  return personController.index(req, res);
};
