# Typesafe TypeScript REST HTTP API Client

The Typesafe TypeScript REST HTTP API Client is a library that provides a convenient and type-safe way to make RESTful HTTP requests in TypeScript. It enables you to define API endpoints, request options, and response types using TypeScript types and interfaces, ensuring type safety and enhancing developer productivity.

## Usage

To use the library, follow these steps:

1. Configure your `.env` environment variable or hard-code the [`baseUrl`](https://github.com/AdisonCavani/ts-rest-api-client/blob/master/src/app/http/client.ts#LL12C1-L12C1):

```
API_URL="https://jsonplaceholder.typicode.com"
```

2. Copy the code inside [`src`](https://github.com/AdisonCavani/ts-rest-api-client/tree/master/src) folder

3. Import an API client:

```typescript
import { client } from "./http/client";
```

1. Make requests to the defined API endpoints using the client:

```typescript
// GET  /posts
const posts = await client("/posts").get();

// GET  /posts/1/comments
await client("/posts/{id}/comments", "1").get();

// GET  /comments?postId=1
const comments = await client("/comments").get({
  queryParameters: {
    postId: 1,
  },
});

// POST  /posts
const newPost = await client("/posts").post({
  body: {
    title: "foo",
    body: "bar",
    userId: 1,
  },
});
```

4. Handle the API responses based on the defined response types:

```typescript
// The Post type is inhered, no need for typing it
const post = await client("/posts/{id}", "1").get();
console.log(post.title, post.body);
```

## API Documentation

The library provides the following methods for making HTTP requests:

- `get`: Sends a GET request to the specified endpoint.
- `post`: Sends a POST request to the specified endpoint.
- `put`: Sends a PUT request to the specified endpoint.
- `patch`: Sends a PATCH request to the specified endpoint.
- `delete`: Sends a DELETE request to the specified endpoint.

For each method, you need to provide the appropriate request options and handle the returned promises to access the response data.

### Customization

You can customize the library by modifying the types and interfaces defined in the [`http/requests.ts`](https://github.com/AdisonCavani/ts-rest-api-client/blob/master/src/app/http/requests.ts) and [`http/responses.ts`](https://github.com/AdisonCavani/ts-rest-api-client/blob/master/src/app/http/responses.ts) files. Update these files according to your API's request and response structures to ensure type safety and accurate data handling.

### Error Handling

If an API request fails, the library throws an `Error` object with detailed information about the failure. It includes the request URL, method, status code, status text, and reason (if available).

To handle errors, use `try-catch` blocks and catch the `Error` object:

```typescript
try {
  // API request
} catch (error) {
  console.error("API request failed:", error);
}
```
