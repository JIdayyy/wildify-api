import * as Minio from "minio";
import dotenv from "dotenv";
dotenv.config();

const { MINIO_USERNAME, MINIO_PASSWORD, MINIO_ENDPOINT } = process.env;

const minioClient = new Minio.Client({
  endPoint: MINIO_ENDPOINT || "localhost",
  port: 9000,
  useSSL: false,
  accessKey: MINIO_USERNAME || "ROOTNAME",
  secretKey: MINIO_PASSWORD || "CHANGEME123",
});

export default minioClient;
