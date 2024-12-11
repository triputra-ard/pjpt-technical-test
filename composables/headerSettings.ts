type MethodType =
  | "GET"
  | "HEAD"
  | "PATCH"
  | "POST"
  | "PUT"
  | "DELETE"
  | "CONNECT"
  | "OPTIONS"
  | "TRACE"
  | "get"
  | "head"
  | "patch"
  | "post"
  | "put"
  | "delete"
  | "connect"
  | "options"
  | "trace"
  | undefined;
export default function (
  methods: MethodType,
  config?: object,
  serverEvent?: any
) {
  return {
    method: methods,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
}
