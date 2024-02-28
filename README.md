# Prex Backend

### Done
- UserModule
- AuthModule
  - Signin
  - Signup
- AttachmentModule
  - Upload files
  - Share & Update files
  - Get files
  - Delete files
- Dockerfile
- Jest configuration for unit testing
- Vscode debbuging
- Hot reload
- Swagger Docs

## Run project

### Development Mode
To run the project in development mode, simply use the following command:
<code>npm run dev</code>
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

## Postman

Workspace: https://www.postman.com/ignacord/workspace/prex

## API DOC

http://localhost:3000/api-docs/

# To Do
- Diagrama del sistema
- Descargar archivos
- Unit Testing (Más casos de pruebas)
- Refactor
- Postman env vars
- Documentation fix
