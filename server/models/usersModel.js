import prisma from "../prisma/prisma.js";
import jwt from "jwt-simple";

export async function getUserByEmail(email) {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  return user;
}

export async function getAllUsersByRoleUser() {
  const users = await prisma.user.findMany({
    where: { role: "user" },
    orderBy: { name: "asc" },
  });
  return users;
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
        role: "user",
      },
    });
    return user;
  } catch (e) {
    throw new Error("Esse endereço de email já está em uso");
  }
}

export async function updateUserInDb(id, updatedUserData) {
  try {
    const user = await prisma.user.update({
      where: { id: parseInt(id) },
      data: updatedUserData,
    });

    return user;
  } catch (e) {
    throw new Error("Erro ao atualizar usuário");
  }
}
