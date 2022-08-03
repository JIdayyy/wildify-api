// import dotenv from "dotenv";
import app from "./server";

// dotenv.config();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT} 🌎💥`);
});
