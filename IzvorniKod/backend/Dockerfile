# Stage 1: Build aplikaciju sa Mavenom
FROM maven:3.8.6-openjdk-21 AS build
WORKDIR /app

# Kopiraj pom.xml i izvorne fajlove
COPY pom.xml .
COPY src ./src

# Builduj aplikaciju, preskači testove da ubrzaš build
RUN mvn clean package -DskipTests

# Stage 2: Pokreni aplikaciju sa JRE
FROM openjdk:21-jdk-slim
WORKDIR /app

# Kopiraj gotov jar iz build faze
COPY --from=build /app/target/*.jar app.jar

# Izloži port koji koristi tvoja aplikacija (obično 8080)
EXPOSE 8080

# Pokreni aplikaciju
ENTRYPOINT ["java", "-jar", "app.jar"]
