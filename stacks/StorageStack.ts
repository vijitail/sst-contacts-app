import { StackContext, Table } from "sst/constructs";

export function StorageStack({ stack, app }: StackContext) {
  // Create the DynamoDB table
  const table = new Table(stack, "Contacts", {
    fields: {
      id: "string",  
      name: "string",
      email: "string",
    },
    primaryIndex: { partitionKey: "id", sortKey: "email" },
  });

  return {
    table,
  };
}