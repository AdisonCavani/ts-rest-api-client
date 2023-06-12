import dotenv from "dotenv";
import { configSchema } from "./schema";

dotenv.config();

const parsed = configSchema.safeParse(process.env);

if (!parsed.success) {
  console.error(
    "Invalid environment variables:",
    JSON.stringify(parsed.error.format(), null, 2)
  );
  process.exit(1);
}

export const env = parsed.data;
