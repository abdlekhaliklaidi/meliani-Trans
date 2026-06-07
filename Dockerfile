FROM maven:3.9.8-eclipse-temurin-17 AS build

WORKDIR /workspace/backend

COPY backend/pom.xml .
RUN mvn dependency:go-offline -DskipTests

COPY backend/src ./src
RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

COPY --from=build /workspace/backend/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app/app.jar"]
