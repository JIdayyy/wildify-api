import { UserWithoutPassword } from "./../../../interfaces/user.d";
import AuthHandlers from "../interfaces";
import jwt from "jsonwebtoken";

const me: AuthHandlers["me"] = (req, res, next) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      throw new Error("No auth token provided");
    }

    const user = jwt.verify(
      token,
      process.env.SECRET as string
    ) as UserWithoutPassword;

    if (typeof user === "string") {
      throw new Error("Invalid token");
    }

    return res.status(200).send({ ...user });
  } catch (error) {
    console.log(error);

    next(error);
  }
};

export default me;
