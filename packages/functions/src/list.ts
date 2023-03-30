import AWS from "aws-sdk";
import { Table } from "sst/node/table";
import { APIGatewayProxyHandlerV2 } from "aws-lambda";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const main: APIGatewayProxyHandlerV2 = async (event) => {
  const params = {
    TableName: Table.Contacts.tableName,
  };
  const results = await dynamoDb.scan(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(results.Items),
  };
}