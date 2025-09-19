# DartArena
## Assignment 
Web-application for the game of darts with the ability to track scores and statistics.
## Description
This project is the result of independet student work as part of the project assignment for the [Final thesis course](https://www.fer.unizg.hr/predmet/zavrad) at the Faculty of Electrical Engineering and Computing, University of Zagreb.

Darts is a popular board game traditionally played with a physical target and an automated scoring system. Given that many players want to accurately track their results, as well as their achievements in different types of games, there is a need for an application that would allow the game without a physical target, but with the ability to record all statistics. In this work, it is necessary to develop a web application that simulates the game of classic darts, while allowing users to enter the results of each game themselves. The application should support different types of games, such as X01, Cricket, Shanghai, Count Up and Split, and enable correct scoring depending on the type of game selected. In addition, the application should record statistical parameters such as three darts average, number of maximum scores hit (180 points), etc., and visually display them to users. All games should be created so that they can be played individually as a training session or as a duel against another user.

The app provides signed-in users with personalized performance data, including detailed graphs and summaries. Track your progress over time by playing against opponents or practicing solo. Designed for all darts enthusiasts — from beginners to professionals — this application is the perfect tool to improve your game and analyze your statistics.

### Main Features
More detailed view of the list belove is represented with UML Use-Case diagram, [click here](https://github.com/luka-duretic/DartArena/tree/main/docs/app-functional-requirements).
 - user account management (UC1, UC2, UC3, UC4, UC5)
 - game modes (UC6, UC7)
 - result and statistics tracking (UC8, UC9 - detail statistics view)
 - game management (UC10, UC11, UC12 - temporary local save of subprofile's match data)
 - user-friendly UI (UC13 - every match summary and stats, UC14, UC15, UC16)

## Technologies
Front-end - React + TypeScript
 - frameworks - Next.js, Tailwind CSS
 - libraries - Material UI, React-Icons, Bootstrap, Zod

Back-end - Java (21) + Spring Boot (3.4.4)
 - build tool - Maven
 - framework dependencies - (spring-boot-starter) security, web, test, validation, data-jpa
 - database dependencies - postgresql, h2
 - authentication dependencies -  jjwt-jackson, jwt-impl, jjwt-api

Database - Supabase PostgreSQL

Authentication - JSON Web Token

Deployment - on Render as web-services (frontend, backend)
 - [dartarena-frontend.onrender.com](https://dartarena-frontend.onrender.com/), currently web-app is not LIVE!

## Architecture
This app is developed with principles of MVC architecture to achieve separation of user interface logic, business logic and data. Therefore communication between layers and data transaction are based on REST API. All communication is secured by JWT authentication and data filtering.
 - front-end - user interface logic, initiate interaction with server, file-based routing
 - back-end - business/server logic, database access, data validation
 - database - online platform Supabase, relational, connected to server with Hibernate ORM

## Local Installation
Instructions how to run DartArena project localy on your device.
1. Open terminal and execute ```git clone https://github.com/luka-duretic/DartArena.git```

2. Setup project's front-end:
   - open DartArena/IzvorniKod/frontend in your IDE (Visual Studio Code, ...)
   - there create .env file and write `NEXT_PUBLIC_BACKEND_API=http://localhost:8080`
   - execute:
   ```
   1. npm install
   2. npm run dev
   ```
   - front-end is live

3. Setup project's database:
   - open account at [Supabase platform](https://supabase.com/) and sign in
   - create new/open existing organization
   - create new project (get project password)
   - click Connect at navbar, select session pooler, get database connection string
   - find project id at Project Settings
   - find secret service role at Project Settings/API Keys
   - go to Storage, add new bucket with name "avatars" and "public" option

4. Setup project's back-end:
     - open DartArena/IzvorniKod/backend in your IDE (IntelliJ IDEA, ...)
     - if needed setup your SDK to configure opened project
     - open src/main/java/dartarena/backend/DartarenaApplication.java
     - in app's Run Configurations add Enviromental variables listed belove, and apply
     ```
     SPRING_DATABASE_PASSWORD=your-supabase-project-passwd
     SPRING_DATABASE_URL=jdbc:[your-supabase-project-connection-string-url-part]?sslmode=require
     SPRING_DATABASE_USERNAME=postgres.your-supabase-project-id
     SPRING_JWT_SECRET=your-secretly-generated-256bits-key
     SUPABASE_PROJECT_ID=your-supabase-project-id
     SUPABASE_SERVICE_ROLE=your-supabase-project-secret-service-role

     * you will find this variables in your supabase project *
     ```
     - run app (DartarenaApplication.java)

Application demo and image of pages are available [here](https://github.com/luka-duretic/DartArena/tree/main/docs/app-images) without need to install hole app.
