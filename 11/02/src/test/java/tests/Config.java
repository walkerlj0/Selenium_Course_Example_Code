package tests;

public interface Config {
    final String baseUrl = System.getProperty("baseUrl", "http://the-internet.herokuapp.com");
}