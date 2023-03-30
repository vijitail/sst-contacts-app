import * as uuid from 'uuid';
import AWS from "aws-sdk";
import { Table } from "sst/node/table";
import { APIGatewayProxyHandlerV2 } from "aws-lambda";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const main: APIGatewayProxyHandlerV2 = async (event) => {
 
  const data = JSON.parse(event?.body || '');

  const params = {
    TableName: Table.Contacts.tableName,
    Item: {
        id: uuid.v4(),
        email: data.email, 
        name: data.name , 
        createdAt: Date.now(), 
    },
  };


    await dynamoDb.put(params).promise();

    return {
        statusCode: 200,
        body: JSON.stringify(params.Item),
    };

}