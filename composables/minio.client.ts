import { Client } from 'minio'
import config from '@/config/config';

const minioClient = new Client({
  endPoint: config.minio.endPoint,
  port: config.minio.port,
  useSSL: config.minio.useSSL,
  accessKey: config.minio.access_key,
  secretKey: config.minio.secret_key,
});

export default minioClient;