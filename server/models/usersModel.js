import prisma from "../prisma/prisma.js";
import jwt from "jwt-simple";

export async function getUserByEmail(email) {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  return user;
}

export function generateToken(user) {
  const payload = {
    id: user.id,
    email: user.email,
  };
  return jwt.encode(payload, process.env.TOKEN_KEY);
}

export async function createUser(name, email, password) {
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
        phone: "",
      },
    });
    return user;
  } catch (e) {
    throw new Error("Esse endereço de email já está em uso");
    
  }
}
