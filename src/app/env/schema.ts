import { z } from "zod";
import { withDevDefault } from "./helpers";

export const configSchema = z.object({
  API_URL: withDevDefault(
    z.string().url(),
    "https://jsonplaceholder.typicode.com"
  ),
});
