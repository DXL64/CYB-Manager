import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(__dirname, '.env') });

console.log(process.env)
// Define the type for the config object
interface MinioConfig {
  end_point: string;
  port: number;
  useSSL: boolean;
  bucket_name: string;
}

interface BackendConfig {
  end_point: string;
  port: string;
}

interface Config {
  minio: MinioConfig;
  backend: BackendConfig
}

// Convert environment variables and set default values with proper types
const config: Config = {
  minio: {
    end_point: process.env.NEXT_PUBLIC_MINIO_ENDPOINT ?? "localhost",
    port: Number(process.env.MINIO_PORT) ?? 9000,
    useSSL: process.env.MINIO_USE_SSL === 'true' ? true : false,
    bucket_name: process.env.MINIO_BUCKET_NAME ?? "",
  },
  backend: {
    end_point: process.env.BACKEND_API_ENDPOINT ?? `localhost`,
    port: process.env.BACKEND_API_PORT ?? `8000`
  }
}

export default config;
