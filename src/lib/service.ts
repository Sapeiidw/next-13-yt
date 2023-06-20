import { db } from "./db";

export async function getUser() {
  const res = await db.user.findMany({});
  return res;
}
