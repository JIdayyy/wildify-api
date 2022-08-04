import prisma from "../../../../prisma/client";
import jwt, { Secret } from "jsonwebtoken";

const githubCb = async (req: any, res: any) => {
  let user;

  if (!req.user) {
    throw new Error("no user !");
  }

  user = await prisma.user.findUnique({
    where: {
      pseudo: req.user.username,
    },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        pseudo: req.user.username,
      },
    });
  }

  const token = jwt.sign(
    {
      username: user.pseudo,
    },
    process.env.SECRET as Secret,
    {
      expiresIn: "24h",
    }
  );

  res.redirect(
    `${req.query.state}?token=${token}&id=${user.id}&pseudo=${user.pseudo}`
  );
};

export default githubCb;
