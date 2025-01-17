import {
  createUser,
  getUserByEmail,
  generateToken,
} from "../models/usersModel.js";
import bcrypt from "bcryptjs";

export async function register(req, res) {
  try {
    const { name, surname, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await createUser(name + " " + surname, email, hashedPassword);
    res.status(201).json({
      message: "Utilizador registrado com sucesso!",
    });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;

  const user = await getUserByEmail(email);

  if (!user)
    return res
      .status(400)
      .json({ message: "Utilizador/Palavra-passe inválido" });

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid)
    return res
      .status(400)
      .json({ message: "Utilizador/Palavra-passe inválido" });

  const token = generateToken(user);
  res.status(200).json({
    message: "Utilizador/Palavra-passe inválido",
    token: token,
    user: {
      id: user.id,
      name: user.name,
    },
  });
}
