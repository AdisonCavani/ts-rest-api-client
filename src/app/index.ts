import { client } from "./http/client";
import dotenv from "dotenv";

async function main() {
  dotenv.config();

  console.log("Starting requests");
  console.log("Api url:", process.env.API_URL);

  // GET  /posts
  await client("/posts").get();

  // GET  /posts/1
  await client("/posts/{id}", "1").get();

  // GET  /posts/1/comments
  await client("/posts/{id}/comments", "1").get();

  // GET  /comments?postId=1
  await client("/comments").get({
    queryParameters: {
      postId: 1,
    },
  });

  // POST  /posts
  await client("/posts").post({
    body: {
      title: "foo",
      body: "bar",
      userId: 1,
    },
  });

  // PUT  /posts/1
  await client("/posts/{id}", "1").put({
    body: {
      id: 1,
      title: "foo",
      body: "bar",
      userId: 1,
    },
  });

  // PATCH  /posts/1
  await client("/posts/{id}", "1").patch({
    body: {
      title: "foo",
    },
  });

  // DELETE  /posts/1
  await client("/posts/{id}", "1").delete();

  console.log("Requests finished");
}

main();
