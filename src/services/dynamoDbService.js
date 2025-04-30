const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, PutCommand, GetCommand, QueryCommand, DeleteCommand } = require('@aws-sdk/lib-dynamodb');
require('dotenv').config();

// Configure the DynamoDB client
const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const dynamoDb = DynamoDBDocumentClient.from(client);
const TABLE_NAME = process.env.DYNAMODB_TABLE_NAME;

// Function to create an item in DynamoDB
const createItem = async (item) => {
  const params = {
    TableName: TABLE_NAME,
    Item: item,
  };

  try {
    await dynamoDb.send(new PutCommand(params));
    return { success: true, message: 'Item created successfully' };
  } catch (error) {
    console.error('Error creating item:', error);
    throw new Error('Failed to create item');
  }
};

// Function to get an item by PK and SK
const getItem = async (pk, sk) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      PK: pk,
      SK: sk,
    },
  };

  try {
    const result = await dynamoDb.send(new GetCommand(params));
    if (!result.Item) {
      throw new Error('Item not found');
    }
    return result.Item;
  } catch (error) {
    console.error('Error fetching item:', error);
    throw error;
  }
};

// Function to get all items for a specific day
const getItemsForDay = async (pk, date) => {
  const params = {
    TableName: TABLE_NAME,
    KeyConditionExpression: 'PK = :pk AND begins_with(SK, :skPrefix)',
    ExpressionAttributeValues: {
      ':pk': pk,
      ':skPrefix': `ACTIVITY#${date}`,
    },
  };

  try {
    const command = new QueryCommand(params);
    const result = await dynamoDb.send(command);
    return result.Items;
  } catch (error) {
    console.error('Error fetching items for day:', error);
    throw new Error('Failed to fetch items for day');
  }
};

// Function to delete an item by PK and SK
const deleteItem = async (pk, sk) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      PK: pk,
      SK: sk,
    },
  };

  try {
    const command = new DeleteCommand(params);
    await dynamoDb.send(command);
    return { success: true, message: 'Item deleted successfully' };
  } catch (error) {
    console.error('Error deleting item:', error);
    throw new Error('Failed to delete item');
  }
};

module.exports = { createItem, getItem, getItemsForDay, deleteItem };