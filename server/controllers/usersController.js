import {
  createUser,
  getUserByEmail,
  getAllUsersByRoleUser,
  generateToken,
  updateUserInDb,
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
    user: user
  });
}

export async function update(req, res) {
  try {
    const { id } = req.params;
    const { name, phone, email, password, address, city, postal_code } = req.body;

    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(404).json({ message: "Utilizador não encontrado" });
    }

    let updatedUserData = {
      name: name || user.name,
      phone: phone || user.phone,
      email: email || user.email,
      address: address || user.address,
      city: city || user.city,
      postal_code: postal_code || user.postal_code,
    };

    if (password) {
      updatedUserData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await updateUserInDb(id, updatedUserData);

    res.status(200).json({
      message: "Utilizador atualizado com sucesso!",
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        address: updatedUser.address,
        city: updatedUser.city,
        postal_code: updatedUser.postal_code,
      },
    });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
}

export async function getUsersRoleUser(req, res) {
  const users = await getAllUsersByRoleUser();
  res.status(200).json(users);
}