declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}
//couldnt for the life of me export types and i refuse to use ts ignore so herewe go

import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";

if (!JWT_SECRET) throw new Error("JWT_SECRET is not defined");

interface DecodedToken extends JwtPayload {
  id: string;
  email: string;
  username: string;
}

export async function middleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, JWT_SECRET as string) as DecodedToken;

    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.sendStatus(403);
  }
}