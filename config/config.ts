import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(__dirname, '../.env') })

// Define the type for the config object
interface MinioConfig {
  endPoint: string;
  port: number;
  useSSL: boolean;
  access_key: string;
  secret_key: string;
  bucket_name: string;
}

interface Config {
  minio: MinioConfig;
}

// Convert environment variables and set default values with proper types
const config: Config = {
  minio: {
    endPoint: process.env.MINIO_ENDPOINT ?? "localhost",
    port: Number(process.env.MINIO_PORT) ?? 9000,
    useSSL: process.env.MINIO_USE_SSL === 'true' ? true : false,
    access_key: process.env.ACCESS_KEY ?? "",
    secret_key: process.env.SECRET_KEY ?? "",
    bucket_name: process.env.BUCKET_NAME ?? "",
  }
}

export default config;
