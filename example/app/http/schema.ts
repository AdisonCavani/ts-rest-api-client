import {
  CreatePostOptions,
  GetCommentsByPostIdOptions,
  PatchPostOptions,
  PutPostOptions,
} from "./requests";
import { Post } from "./responses";

export interface EndpointsSchema {
  "/posts": {
    get: () => Promise<Post[]>;
    post: (options: CreatePostOptions) => Promise<Post>;
  };
  "/posts/{id}": {
    get: () => Promise<Post>;
    put: (options: PutPostOptions) => Promise<Post>;
    patch: (options: PatchPostOptions) => Promise<Post>;
    delete: () => Promise<void>;
  };
  "/comments": {
    get: (options: GetCommentsByPostIdOptions) => Promise<Comment[]>;
  };
  "/posts/{id}/comments": {
    get: () => Promise<Comment[]>;
  };
}
