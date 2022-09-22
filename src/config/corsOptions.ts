const whiteListedUrls = process.env.CORS_WHITELISTED_URLS?.split(",") || [];

export const corsOptions = {
  origin: (
    origin: string,
    callback: (err: Error | null, allow?: boolean) => void
  ): void | Error => {
    if (whiteListedUrls.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
