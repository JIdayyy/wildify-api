import AuthHandlers from "../interfaces";
import bcrypt from "bcryptjs";
import prisma from "../../../../prisma/client";
import { sign } from "jsonwebtoken";

const register: AuthHandlers["register"] = async (req, res, next) => {
  const { username, password, email } = req.body;

  try {
    if (!username || !password) {
      throw new Error("Missing credentials");
    }

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: bcrypt.hashSync(password, 10),
      },
    });

    const { password: _, ...userWithoutPassword } = user;

    const token = sign(
      { ...userWithoutPassword },
      process.env.SECRET as string
    );

    res.setHeader("Authorization", `Bearer ${token}`);

    return res.status(201).json({
      ...userWithoutPassword,
    });
  } catch (error) {
    next(error);
  }
};

export default register;
