   
# FinTime API

A RESTful API for managing user activities with DynamoDB storage. This API can be deployed as a standalone Express server or as an AWS Lambda function.

## Project Overview

FinTime API provides endpoints to create, retrieve, and delete activity records for users. Each activity is stored in DynamoDB with a partition key (PK) based on the user ID and a sort key (SK) based on the activity date.

## Technologies Used

- Node.js
- TypeScript
- Express.js
- AWS DynamoDB
- AWS Lambda (via serverless-http)
- dotenv for environment variables

## Project Structure

```
fintime-api/
├── .env.example                # Example environment variables
├── .gitignore                  # Git ignore file
├── README.md                   # Project documentation
├── lambda.js                   # AWS Lambda handler
├── package.json                # Project dependencies
├── tsconfig.json               # TypeScript configuration
├── src/
│   ├── app.ts                  # Express application setup
│   ├── local.ts                # Local server entry point
│   ├── config/
│   │   └── dynamodb.ts         # DynamoDB client configuration
│   └── modules/
│       └── activities/
│           ├── controllers.ts  # Request handlers
│           ├── routes.ts       # API routes
│           └── services.ts     # Business logic
└── dist/                       # Compiled JavaScript files
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
   TABLE_NAME=your-table-name
   PORT=3000
   ```
4. Start the development server:
   ```
   npm run dev
   ```
5. Build the project:
   ```
   npm run build
   ```
6. Start the production server:
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
- **Response**: 200 OK with created activity data including generated activityId

### Get Activities for a Day

- **URL**: `/api/activities/:userId/day/:endDate`
- **Method**: `GET`
- **Example**: `/api/activities/user123/day/2023-05-01`
- **Response**: 200 OK with array of activities

### Delete Activity

- **URL**: `/api/activities/:userId/:endDate/:activityId`
- **Method**: `DELETE`
- **Example**: `/api/activities/user123/2023-05-01/abc123`
- **Response**: 200 OK with deleted activityId

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