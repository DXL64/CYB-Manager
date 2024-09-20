import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(__dirname, '../.env') })

// Define the type for the config object
interface MinioConfig {
  end_point: string;
  port: number;
  useSSL: boolean;
  bucket_name: string;
}

interface Config {
  minio: MinioConfig;
}

// Convert environment variables and set default values with proper types
const config: Config = {
  minio: {
    end_point: process.env.MINIO_ENDPOINT ?? "localhost",
    port: Number(process.env.MINIO_PORT) ?? 9000,
    useSSL: process.env.MINIO_USE_SSL === 'true' ? true : false,
    bucket_name: process.env.MINIO_BUCKET_NAME ?? "",
  }
}

export default config;
