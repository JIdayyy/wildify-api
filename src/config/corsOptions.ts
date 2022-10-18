import dotenv from "dotenv";

dotenv.config();
const whiteListedUrls = process.env.CORS_WHITELISTED_URLS?.split(",") || [];

export const corsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => Error | void
  ): void | Error => {
    console.log("origin", origin);

    if (process.env.NODE_ENV === "development") {
      return callback(null, true);
    }

    if (typeof origin === "undefined") {
      return callback(new Error("Not allowed by CORS"), false);
    }

    if (whiteListedUrls.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"), false);
  },
  credentials: true,
  exposedHeaders: ["Authorization"],
};

export default corsOptions;
