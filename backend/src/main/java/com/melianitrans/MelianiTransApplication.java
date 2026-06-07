package com.melianitrans;

import java.net.URI;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MelianiTransApplication {

    public static void main(String[] args) {
        configureRailwayDatabaseUrl();
        SpringApplication.run(MelianiTransApplication.class, args);
    }

    private static void configureRailwayDatabaseUrl() {
        if (System.getenv("SPRING_DATASOURCE_URL") != null) {
            return;
        }

        String databaseUrl = System.getenv("DATABASE_URL");
        if (databaseUrl == null || databaseUrl.startsWith("jdbc:postgresql:")) {
            return;
        }

        URI uri = URI.create(databaseUrl);
        if (!"postgres".equals(uri.getScheme()) && !"postgresql".equals(uri.getScheme())) {
            return;
        }

        String jdbcUrl = "jdbc:postgresql://" + uri.getHost()
                + (uri.getPort() == -1 ? "" : ":" + uri.getPort())
                + uri.getPath()
                + (uri.getQuery() == null ? "" : "?" + uri.getQuery());
        System.setProperty("spring.datasource.url", jdbcUrl);

        String userInfo = uri.getRawUserInfo();
        if (userInfo != null) {
            String[] credentials = userInfo.split(":", 2);
            System.setProperty("spring.datasource.username", decodeUrlPart(credentials[0]));
            if (credentials.length > 1) {
                System.setProperty("spring.datasource.password", decodeUrlPart(credentials[1]));
            }
        }
    }

    private static String decodeUrlPart(String value) {
        return URLDecoder.decode(value, StandardCharsets.UTF_8);
    }
}
