import { PutCommand, QueryCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";
import { docClient } from "../../config/dynamodb";

const tableName = process.env.TABLE_NAME || '';

export const getActivitiesService = async (userId: string, endDate: string): Promise<any[]> => {
    const params = {
        TableName: tableName,
        KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
        ExpressionAttributeValues: {
            ':pk': `USER#${userId}`,
            ':sk': `ACTIVITY#${endDate}`
        },
        ScanIndexForward: false
    };

    try {
        const command = new QueryCommand(params);
        const data = await docClient.send(command);
        const result = data.Items?.map(item => item.data);
        return result;
    } catch (error) {
        console.error('Error fetching reports:', error);
        throw new Error('Unable to fetch reports');
    }
};

export const createActivityService = async (userId: string, endDate: string, activity: any): Promise<any> => {
    const generateId = (length = 21) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    };

    const activityData = activity || {};
    activityData.activityId = generateId();

    const params = {
        TableName: tableName,
        Item: {
            PK: `USER#${userId}`,
            SK: `ACTIVITY#${endDate}#${activityData.activityId}`,
            data: activityData
        }
    };

    try {
        const cmd = new PutCommand(params);
        await docClient.send(cmd);
        return activityData;
    } catch (error) {
        console.error('Error creating activity:', error);
        throw new Error('Unable to create activity');
    }
}

export const deleteActivityService = async (userId: string, endDate: string, activityId: string): Promise<any> => {
    const params = {
        TableName: tableName,
        Key: {
            PK: `USER#${userId}`,
            SK: `ACTIVITY#${endDate}#${activityId}`
        }
    };
    
    try {
        const cmd = new DeleteCommand(params);
        await docClient.send(cmd);
        return activityId;
    } catch (error) {
        console.error('Error deleting activity:', error);
        throw new Error('Unable to delete activity');
    }
}