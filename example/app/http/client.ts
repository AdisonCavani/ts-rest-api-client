import { MutationOptions, QueryOptions } from "./requests";
import { EndpointsSchema } from "./schema";

export function client<TPath extends keyof EndpointsSchema>(
  path: TPath,
  ...pathParam: PathParameter<TPath>
): EndpointsSchema[TPath] {
  // TODO: You can try to move it to the top
  const baseUrl = process.env.API_URL;

  const fullPath =
    baseUrl +
    path
      .split("/")
      .map((segment) =>
        segment.startsWith("{") && segment.endsWith("}")
          ? pathParam.shift() // Use pathParam values for path parameters
          : segment
      )
      .join("/");

  return {
    get: (options?: any) => query(fullPath, options, "GET"),
    post: (options?: any) => mutate(fullPath, options, "POST"),
    put: (options?: any) => mutate(fullPath, options, "PUT"),
    patch: (options?: any) => mutate(fullPath, options, "PATCH"),
    delete: (options?: any) => query(fullPath, options, "DELETE"),
  };
}

async function query<TReqOptions extends QueryOptions>(
  url: string,
  options: TReqOptions | undefined,
  method: HttpMethod
) {
  const newUrl = options?.queryParameters
    ? `${url}?${appendParams(options.queryParameters)}`
    : url;

  const headers = new Headers(options?.headers);

  if (options?.jwtToken)
    headers.append("Authorization", `Bearer ${options.jwtToken}`);

  return await fetchApi(newUrl, headers, method);
}

async function mutate<TReqOptions extends MutationOptions>(
  url: string,
  options: TReqOptions | undefined,
  method: HttpMethod
) {
  const headers = new Headers(options?.headers);

  if (options?.jwtToken)
    headers.append("Authorization", `Bearer ${options.jwtToken}`);

  return await fetchApi(url, headers, method, JSON.stringify(options?.body!));
}

async function fetchApi(
  url: string,
  headers: Headers,
  method: HttpMethod,
  body?: BodyInit
) {
  headers.append("Content-Type", "application/json");

  const response = await fetch(url, {
    method: method,
    headers: headers,
    body: body ?? null,
  });

  if (response.status === 204) return;

  if (response.ok) return await response.json();

  const text = await response.text();

  const errorObj = {
    message: "Fetch failed",
    queryUrl: url,
    method: method,
    statusCode: response.status,
    statusText: response.statusText,
    ...(text.length > 0 && { reason: text }),
  };

  throw new Error(JSON.stringify(errorObj, null, 2));
}

function appendParams(obj: any): URLSearchParams {
  const params = new URLSearchParams();

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      params.append(key, obj[key]);
    }
  }

  return params;
}

type PathParameter<TPath extends string> =
  // Define our template in terms of Head/{Parameter}Tail
  TPath extends `${infer _Head}/{${infer _Parameter}}${infer Tail}`
    ? // We can call PathParameter<Tail> recursively to
      // match the template against the Tail of the path
      [pathParameter: string, ...params: PathParameter<Tail>]
    : // If no parameters were found we get an empty tuple
      [];

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
