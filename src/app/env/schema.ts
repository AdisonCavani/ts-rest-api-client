import { z } from "zod";
import { withDevDefault } from "./helpers";

export const configSchema = z.object({
  API_URL: withDevDefault(z.string().url(), "http://localhost"),
  PORT: z.string().transform(Number),
});
