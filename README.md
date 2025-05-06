
# FinTime API

A RESTful API for managing user activities with DynamoDB storage. This API can be deployed as a standalone Express server or as an AWS Lambda function.

## Project Overview

FinTime API provides endpoints to create, retrieve, and delete activity records for users. Each activity is stored in DynamoDB with a partition key (PK) based on the user ID and a sort key (SK) based on the activity date.

## Technologies Used

- Node.js
- Express.js
- AWS DynamoDB
- AWS Lambda (via serverless-http)
- dotenv for environment variables

## Project Structure

```
fintime-api/
├── .env.example       # Example environment variables
├── .gitignore         # Git ignore file
├── README.md          # Project documentation
├── lambda.js          # AWS Lambda handler
├── package.json       # Project dependencies
├── src/
│   ├── app.js         # Express application setup
│   ├── server.js      # Server entry point
│   ├── controllers/   # Request handlers
│   │   └── activityController.js
│   ├── routes/        # API routes
│   │   └── activityRoutes.js
│   └── services/      # Business logic
│       └── dynamoDbService.js
```

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file based on `.env.example` with your AWS credentials and configuration:
   ```
   AWS_REGION=your-region
   AWS_ACCESS_KEY_ID=your-access-key
   AWS_SECRET_ACCESS_KEY=your-secret-key
   DYNAMODB_TABLE_NAME=your-table-name
   PORT=3000
   ```
4. Start the server:
   ```
   npm start
   ```

## API Endpoints

### Create Activity
- **URL**: `/api/activities`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "userId": "user123",
    "endDate": "2023-05-01",
    "data": {
      "activityType": "exercise",
      "duration": 30,
      "notes": "Morning run"
    }
  }
  ```
- **Response**: 201 Created

### Get Activity
- **URL**: `/api/activities/:pk/:sk`
- **Method**: `GET`
- **Example**: `/api/activities/USER#user123/ACTIVITY#2023-05-01`
- **Response**: 200 OK with activity data

### Get Activities for a Day
- **URL**: `/api/activities/:userId/day/:endDate`
- **Method**: `GET`
- **Example**: `/api/activities/user123/day/2023-05-01`
- **Response**: 200 OK with array of activities

### Delete Activity
- **URL**: `/api/activities/:userId/day/:endDate`
- **Method**: `DELETE`
- **Example**: `/api/activities/user123/day/2023-05-01`
- **Response**: 200 OK with success message

## Deployment

### As Express Server
Run the application using:
```
npm start
```

### As AWS Lambda
The project includes a Lambda handler in `lambda.js` that can be deployed to AWS Lambda. Use your preferred deployment method (AWS SAM, Serverless Framework, etc.) to deploy the function.

## License
ISC