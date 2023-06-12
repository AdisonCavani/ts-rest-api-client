import { Post } from "./responses";

interface RequestOptions {
  headers?: HeadersInit;
  jwtToken?: string;
}

export interface QueryOptions extends RequestOptions {
  queryParameters?: unknown;
}

export interface AuthQueryOptions extends QueryOptions {
  jwtToken: string;
}

export interface MutationOptions extends RequestOptions {
  body: unknown;
}

export interface AuthMutationOptions extends MutationOptions {
  jwtToken: string;
}

// TODO: define your schema BELOW
export interface CreatePostOptions extends MutationOptions {
  body: {
    title: string;
    body: string;
    userId: number;
  };
}

export interface PutPostOptions extends MutationOptions {
  body: Post;
}

export interface PatchPostOptions extends MutationOptions {
  body: {
    title: string;
  };
}

export interface GetCommentsByPostIdOptions extends QueryOptions {
  queryParameters: {
    postId: number;
  };
}
