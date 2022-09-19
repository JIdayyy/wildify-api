import prisma from "../../../../prisma/client";
import jwt, { Secret } from "jsonwebtoken";

const githubCb = async (req: any, res: any) => {
  let user;

  if (!req.user) {
    throw new Error("no user !");
  }

  user = await prisma.user.findUnique({
    where: {
      username: req.user.username,
    },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        username: req.user.username,
        email: req.user.email,
        password: "github",
      },
    });
  }

  const { password: _, ...userWithoutPassword } = user;

  const token = jwt.sign(
    {
      user: userWithoutPassword,
    },
    process.env.SECRET as Secret,
    {
      expiresIn: "24h",
    }
  );

  res.redirect(
    `${req.query.state}?token=${token}&id=${user.id}&pseudo=${user.username}`
  );
};

export default githubCb;
