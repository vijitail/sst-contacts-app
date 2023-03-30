import { Api, use, StackContext } from "sst/constructs";
import { StorageStack } from "./StorageStack";

export function ApiStack({ stack, app }: StackContext) {
  const { table } = use(StorageStack);

  const api = new Api(stack, "Api", {
    defaults: {
      function: {
        bind: [table],
      },
    },
    routes: {
      "POST /contacts": "packages/functions/src/create.main",
      "GET /contacts": "packages/functions/src/list.main",
      "DELETE /contacts/{id}": "packages/functions/src/delete.main"
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });

  return {
    api,
  };
}