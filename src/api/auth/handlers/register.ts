import AuthHandlers from "../interfaces";
import bcrypt from "bcryptjs";
import prisma from "../../../../prisma/client";
import { sign } from "jsonwebtoken";

const register: AuthHandlers["register"] = async (req, res, next) => {
  const { username, password, secretKey } = req.body;

  try {
    if (!username || !password || !secretKey) {
      throw new Error("Missing username, password or secretKey");
    }

    if (secretKey !== process.env.SECRET_KEY) {
      throw new Error("Invalid secretKey");
    }

    const user = await prisma.user.create({
      data: {
        pseudo: username,
        password: bcrypt.hashSync(password, 10),
      },
    });

    res.status(200).json({
      token: sign({ username: user.pseudo }, process.env.SECRET as string),
    });
  } catch (error) {
    next(error);
  }
};

export default register;
