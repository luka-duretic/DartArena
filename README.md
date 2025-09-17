# DartArena
## Assignment 
Web-application for the game of darts with the ability to track scores and statistics.
## Description
This project is the result of independet student work as part of the project assignment for the [Final thesis course](https://www.fer.unizg.hr/predmet/zavrad) at the Faculty of Electrical Engineering and Computing, University of Zagreb.

Darts is a popular board game traditionally played with a physical target and an automated scoring system. Given that many players want to accurately track their results, as well as their achievements in different types of games, there is a need for an application that would allow the game without a physical target, but with the ability to record all statistics. In this work, it is necessary to develop a web application that simulates the game of classic darts, while allowing users to enter the results of each game themselves. The application should support different types of games, such as X01, Cricket, Shanghai, Count Up and Split, and enable correct scoring depending on the type of game selected. In addition, the application should record statistical parameters such as three darts average, number of maximum scores hit (180 points), etc., and visually display them to users. All games should be created so that they can be played individually as a training session or as a duel against another user.

## Technologies
Front-end - React + TypeScript
 - frameworks - Next.js, Tailwind CSS
 - libraries - Material UI, React-Icons, Bootstrap, Zod

Back-end - Java + Spring Boot

Database - Supabase PostgreSQL

Authentication - JSON Web Token

Deployment - on Render as web-services (frontend, backend)
 - [dartarena-frontend.onrender.com](https://dartarena-frontend.onrender.com/), currently web-app is not LIVE!

## Local Installation
Instructions how to run DartArena project localy on your device.
1. Open terminal and execute ```git clone https://github.com/luka-duretic/DartArena.git```

2. Setup project's front-end:
   - open DartArena/IzvorniKod/frontend in your IDE (Visual Studio Code, ...)
   - there execute:
   ```
   1. npm install
   2. echo "NEXT_PUBLIC_BACKEND_API=http://localhost:8080" > .env
   3. npm run dev
   ```
   - front-end is live

3. Setup project's database:
   - open account at [Supabase platform](https://supabase.com/) and sign in
   - create new/open existing organization
   - create new project (get project password)
   - click Connect at navbar, select session pooler, get database connection string
   - find project id at Project Settings
   - find secret service role at Project Settings/API Keys
   - go to Storage, add new bucket with name "avatars"

4. Setup project's back-end:
     - open DartArena/IzvorniKod/backend in your IDE (IntelliJ IDEA, ...)
     - if needed setup your SDK to configure opened project
     - open src/main/java/dartarena/backend/DartarenaApplication.java
     - in app's Run Configurations add Enviromental variables listed belove, and apply
     ```
     SPRING_DATABASE_PASSWORD=your-supabase-project-passwd
     SPRING_DATABASE_URL=jdbc:[your-supabase-project-connection-string]?sslmode=require
     SPRING_DATABASE_USERNAME=postgres.your-supabase-project-id
     SPRING_JWT_SECRET=your-secretly-generated-256bits-key
     SUPABASE_PROJECT_ID=your-supabase-project-id
     SUPABASE_SERVICE_ROLE=your-supabase-project-secret-service-role

     * you will find this variables in your supabase project *
     ```
     - run app (DartarenaApplication.java)
