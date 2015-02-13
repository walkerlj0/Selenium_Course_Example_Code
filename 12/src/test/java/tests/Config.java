package tests;

public interface Config {
    final String baseUrl = System.getProperty("baseUrl", "http://the-internet.herokuapp.com");
    final String browser = System.getProperty("browser", "firefox");
}