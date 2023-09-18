+---------------------------+
| Setup Instructions        |
+---------------------------+

Backend (C# ASP.NET Core - .NET 6):

1. Prerequisites:
   - Install Visual Studio: https://visualstudio.microsoft.com/downloads/
   - Ensure required .NET 6 SDK and runtime versions are installed.

2. Opening the Backend in Visual Studio:
   - Open Visual Studio.
   - Click on File > Open > Project/Solution.
   - Navigate to the backend project's root folder, find the .sln file, and click Open.

3. Running Migrations and Database Update:
   - Open Package Manager Console (PMC) from Tools > NuGet Package Manager > Package Manager Console.
   - Make sure the default project is set to your Entity Framework project.

   - Create the Initial Migration:
     - In the Package Manager Console, run the following command to create the initial migration:
       ```
       Add-Migration InitialCreate
       ```
       This command will generate the necessary migration files based on your current database model.

   - Apply Migrations and Update the Database:
     - After creating the initial migration, run the following command to apply the migrations and update the database:
       ```
       Update-Database
       ```
       This will apply any pending migrations and create/update the database accordingly.

4. Running the Backend:
   - Press Ctrl+F5 or click the "Start" button (green triangle) in Visual Studio.

5. Accessing Swagger Documentation:
   - With the backend running, open your browser and navigate to the Swagger URL.
   - By default, the Swagger UI can be accessed at `/swagger/index.html` or a similar endpoint.
   - For example, if your backend is running locally on `http://localhost:5000`, the Swagger URL might be `http://localhost:5000/swagger/index.html`.

Frontend (React):

1. Prerequisites:
   - Install Node.js and npm: https://nodejs.org/

2. Setting up the Frontend:
   - Open a terminal in the frontend project's root folder.
   - Run: npm install

3. Running the Frontend:
   - Run: npm start

Accessing the App:
   - With both backend and frontend running, open your browser and navigate to http://localhost:3000.

Important Notes:
- Ignore node_modules in version control.
- Check the database connection string in appsettings.json or web.config.
- Consider using environment-specific configuration.

----------------------------------