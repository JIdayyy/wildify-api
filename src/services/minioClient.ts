import * as Minio from "minio";
import dotenv from "dotenv";
dotenv.config();

const { MINIO_USERNAME, MINIO_PASSWORD, MINIO_ENDPOINT } = process.env;

const minioClient = new Minio.Client({
  endPoint: MINIO_ENDPOINT as string,
  port: 80,
  useSSL: false,
  accessKey: MINIO_USERNAME || "minio_acces_key",
  secretKey: MINIO_PASSWORD || "minio_secret_key",
});

export default minioClient;
