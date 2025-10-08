import { WebSocket } from "ws";

interface User {
  id: string;
  rooms: string[];
  ws: WebSocket;
}

class UserStore {
  private users: Map<string, User> = new Map();

  addUser(user: User) {
    this.users.set(user.id, user);
  }

  removeUser(userId: string) {
    this.users.delete(userId);
  }

  getUser(userId: string) {
    return this.users.get(userId);
  }

  addRoom(userId: string, room: string) {
    const user = this.users.get(userId);
    if (!user) return;
    if (!user.rooms.includes(room)) user.rooms.push(room);
  }

  removeRoom(userId: string, room: string) {
    const user = this.users.get(userId);
    if (!user) return;
    user.rooms = user.rooms.filter(r => r !== room);
  }

  getUsersInRoom(room: string) {
    return Array.from(this.users.values()).filter(u => u.rooms.includes(room));
  }
}

export const userStore = new UserStore();
