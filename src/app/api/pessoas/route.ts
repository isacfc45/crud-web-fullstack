import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  return Response.json({ message: "Hello, World!" });
};

export const POST = async (req: NextRequest) => {
  return Response.json({ message: "Hello, World!" });
};
