# Prex Backend

### Done
- UserModule
- AuthModule
  - Signin
  - Signup
- AttachmentModule
  - Upload files
  - Share & Update files
  - Download
  - Get files
  - Delete files
- Dockerfile
- Jest configuration for unit testing
- Vscode debbuging
- Hot reload
- Swagger Docs

## Requirements

**Important:**
The system was developed and tested on Node.js version 19.9.0.

## Installation

To get started, you'll need to install all the necessary libraries:

```bash
npm install
```

## Configuration

To configure the platform, create a `.env` file in the root directory of your project and add the following environment variables. Ensure sensitive information such as passwords and access keys are kept secure and not shared publicly.

```dotenv
PORT=3000
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=[YourDatabasePassword]
DATABASE_NAME=prex
JWT_SECRET=password
JWT_EXPIRES=365d
SALT_PASSWORD_ENCRYPT=10
AWS_KEY=[YourAWSAccessKey]
AWS_SECRET=[YourAWSSecretKey]
BUCKET_REGION=sa-east-1
BUCKET_NAME=prex-challenge-ic
```
Replace `[YourDatabasePassword]` with your actual database password, `[YourAWSAccessKey]` with your AWS access key, and `[YourAWSSecretKey]` with your AWS secret key.

Make sure to secure your `.env` file properly and do not commit it to version control systems like Git to avoid exposing sensitive information.

## Run project

### Development Mode
To run the project in development mode, simply use the following command:
<code>npm run start:debug</code>
This command enables us to utilize the Visual Studio debugger and utilize hot reload with nodemon.

### Testing
To run the test cases, use the following command:
<code>npm run test</code>
This will run all unit tests with the extension ".spect.ts" located within the "src" folder.

### Production
To compile the TypeScript code for production, execute the following command:
<code>npm run build</code>
The result of the build will be hosted in the root directory within the "./dist" folder.

## Design

### Database design
![db_design](https://github.com/NachoCordoba/prex-back/assets/31554015/ac6d9a5f-5142-41c8-b1b8-0eb9b4258913)

### Diagram design
![diagram](https://github.com/NachoCordoba/prex-back/assets/31554015/11e05b01-a6f4-4df2-87c6-71e7ec5ea51d)

## Postman

Workspace: https://www.postman.com/ignacord/workspace/prex

## API DOC

http://localhost:3000/api-docs/

# To Do
- Typeorm Transactions: Rollback on fail file upload / update / delete
- Hidden user password with class-transfomer
- Supertest (E2E Testing)
- Refactor (Red - Green)
- Documentation fix
- Estaría bueno dejar de usar singleton para los controller, ver de abstract factory / factory tal vez uniendolo con el singleton para la construccion de los modulos.
- engines support:

```json
  # package.json
  "engines" : { 
      "npm" : ">=8.0.0 <9.0.0",
      "node" : ">=16.0.0 <17.0.0"
    }
  ```
```json
  # .npmrc
  engine-strict=true
```
