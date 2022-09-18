import prisma from "./prisma/client";

const deleteUser = async () => {
  await prisma.user.deleteMany();
};

deleteUser();
