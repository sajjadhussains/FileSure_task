import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT || 3000,
  database_url:
    process.env.DATABASE_URL || "mongodb://localhost:27017/file_sure",
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS || "12",
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
};
