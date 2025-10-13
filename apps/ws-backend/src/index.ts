import dotenv from 'dotenv'
dotenv.config();

import http from 'http';
import { WebSocketServer } from "ws";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { userStore } from "./userStorage";
import client from "@repo/database/database";

const PORT = process.env.PORT || 8080;

const server = http.createServer();
const wss = new WebSocketServer({ server });

function checkUser(token: string) {
  try {
    if (!JWT_SECRET) throw new Error("JWT_SECRET is not defined");
    const decoded = jwt.verify(token, JWT_SECRET);
    if (typeof decoded === "string") return null;
    if (!decoded || !(decoded as any).id) return null;
    return (decoded as any).id as string;
  } catch {
    return null;
  }
}

function isString(value: unknown): value is string {
  return typeof value === "string";
}

type WSMessage =
  | { action: "join_room"; roomId: string }
  | { action: "leave_room"; roomId: string }
  | { action: "message"; roomId: string; content: string };

wss.on("connection", (ws, request) => {
  const url = request.url;
  if (!url) return ws.close();

  const queryParams = new URLSearchParams(url.split("?")[1]);
  const token = queryParams.get("token") || "";
  const userId = checkUser(token);

  if (!userId) return ws.close();

  userStore.addUser({ id: userId, rooms: [], ws });

  ws.on("message", async (rawData) => {
    if (!isString(rawData)) return;

    let parsed: WSMessage;
    try {
      parsed = JSON.parse(rawData);
    } catch {
      ws.send(JSON.stringify({ error: "Invalid JSON" }));
      return;
    }

    switch (parsed.action) {
      case "join_room":
        try {
          const apiUrl = process.env.HTTP_API_URL || 'http://localhost:3000';
          const res = await fetch(`${apiUrl}/api/v1/room_exists?roomId=${parsed.roomId}`);
          const data = (await res.json()) as { exists: boolean };

          if (!data.exists) {
            ws.send(JSON.stringify({ error: "Room does not exist" }));
            return;
          }

          userStore.addRoom(userId, parsed.roomId);
          ws.send(JSON.stringify({ message: `Joined room ${parsed.roomId}` }));
        } catch {
          ws.send(JSON.stringify({ error: "Failed to validate room" }));
        }
        break;

      case "leave_room":
        userStore.removeRoom(userId, parsed.roomId);
        ws.send(JSON.stringify({ message: `Left room ${parsed.roomId}` }));
        break;

      case "message":
        try {
          const { roomId, content } = parsed;

          await client.chatMessage.create({
            data: {
              message: content,
              roomId,
              adminId: userId,
            },
          });

          const usersInRoom = userStore.getUsersInRoom(roomId);
          usersInRoom.forEach((u) =>
            u.ws.send(
              JSON.stringify({
                type: "message",
                message: content,
                from: userId,
                roomId,
              })
            )
          );
        } catch (err) {
          ws.send(JSON.stringify({ error: "Failed to save message" }));
        }
        break;

      default:
        ws.send(JSON.stringify({ error: "Unknown action" }));
    }
  });

  ws.on("close", () => {
    userStore.removeUser(userId);
  });
});

server.listen(PORT, () => {
  console.log(`WebSocket server active on port: ${PORT}`);
});