import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(__dirname, '.env') });

interface MinioConfig {
  end_point: string;
  bucket_name: string;
}

interface BackendConfig {
  end_point: string;
}

interface Config {
  minio: MinioConfig;
  backend: BackendConfig
}

// Convert environment variables and set default values with proper types
const config: Config = {
  minio: {
    end_point: process.env.NEXT_PUBLIC_MINIO_ENDPOINT ?? "http://localhost:9000",
    bucket_name: process.env.NEXT_PUBLIC_MINIO_BUCKET_NAME ?? "images",
  },
  backend: {
    end_point: process.env.NEXT_PUBLIC_BACKEND_API_ENDPOINT ?? `http://localhost:8000`,
  }
}

export default config;
