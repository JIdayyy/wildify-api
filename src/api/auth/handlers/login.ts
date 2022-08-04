import { sign } from "jsonwebtoken";
import AuthHandlers from "../interfaces";
import prisma from "../../../../prisma/client";
import bcrypt from "bcryptjs";

const login: AuthHandlers["login"] = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        pseudo: username,
      },
    });

    if (!bcrypt.compareSync(password, user.password!)) {
      throw new Error("Invalid password");
    }

    const token = sign({ username: user.pseudo }, process.env.SECRET as string);

    res.status(200).json({
      token,
    });
  } catch (error) {
    next(error);
  }
};

export default login;
