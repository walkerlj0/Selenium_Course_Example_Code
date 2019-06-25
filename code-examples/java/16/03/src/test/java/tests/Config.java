package tests;

public class Config {
    public static final String baseUrl          = System.getProperty("baseUrl", "http://the-internet.herokuapp.com");
    public static final String host             = System.getProperty("host", "saucelabs");
    public static final String browserNameName      = System.getProperty("browserNameName", "internet explorer");
    public static final String browserVersion   = System.getProperty("browserVersion", "11.0");
    public static final String platformNameName     = System.getProperty("platformNameName", "Windows 10");
    public static final String sauceUser        = System.getenv("SAUCE_USERNAME");
    public static final String sauceKey         = System.getenv("SAUCE_ACCESS_KEY");
}
