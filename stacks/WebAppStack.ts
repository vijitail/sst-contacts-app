import { StaticSite, use, StackContext } from "sst/constructs";
import { ApiStack } from "./ApiStack";

export function WebAppStack({ stack, app }: StackContext) {
  const { api } = use(ApiStack);

  // Define our React app
  const site = new StaticSite(stack, "ReactSite", {
    path: "packages/web-app",
    buildOutput: "build",
    buildCommand: "npm run build",
    environment: {
      REACT_APP_API_URL: api.url
    },
  });

  // Show the url in the output
  stack.addOutputs({
    SiteUrl: site.url || "http://localhost:3000",
  });
}