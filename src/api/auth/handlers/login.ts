import { sign } from "jsonwebtoken";
import AuthHandlers from "../interfaces";
import prisma from "../../../../prisma/client";
import bcrypt from "bcryptjs";

const login: AuthHandlers["login"] = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        email,
      },
    });

    if (!bcrypt.compareSync(password, user.password)) {
      throw new Error("Invalid password");
    }

    const { password: _, ...userWithoutPassword } = user;

    const token = sign(
      { ...userWithoutPassword },
      process.env.SECRET as string
    );

    res.setHeader("Authorization", `Bearer ${token}`);

    return res.status(200).json({
      ...userWithoutPassword,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export default login;
