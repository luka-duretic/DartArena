# zadavanje compile-a koda za jdk-21
FROM openjdk:21-jdk-slim

# update okruzenja && instaliranje maven alata za buildanje koda && brisasnje cache-a
RUN apt-get update && apt-get install -y maven && rm -rf /var/lib/apt/lists/*

# postavljanje foldera /app kao glavnog dir, stvori se pri buildu
# tu se sd izvrsavaju sve naredbe COPY/RUN ...
WORKDIR /app
# kopiranje maven config i ovisnosti koje treba ubacit u projekt, u /app
COPY pom.xml .
COPY src ./src

# pokrecemo maven build koji izgradi .jar fajl u target/.
# -DskipTests preskače defaultne build testove da build bude brži i stabilniji u containera
# a maknuli smo to jer se za testove bit potrebne env var koje nemam nigdje zadane, tek na render platformi
RUN mvn clean package -DskipTests

# opet compile, ali bez maven-a, jer nam ovdje treba samo za runtime/pokretanje, ne za build
FROM openjdk:21-jdk-slim
# opet isto, tu cemo izgradeni target/build-app.jar stavit
WORKDIR /app
# kopiramo buildani jar u app.jar
COPY --from=0 /app/target/*.jar app.jar
# apk koristi port 8080
EXPOSE 8080
# naredba koju docker pokrece, da pokrene app.jar - nasu apk
ENTRYPOINT ["java", "-jar", "app.jar"]
