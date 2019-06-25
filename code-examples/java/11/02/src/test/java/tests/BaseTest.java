package tests;

import org.junit.Rule;
import org.junit.rules.ExternalResource;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;

public class BaseTest {

    protected WebDriver driver;

    @Rule
    public ExternalResource resource = new ExternalResource() {

        @Override
        protected void before() throws Throwable {
            System.setProperty("webdriver.gecko.driver",
                    System.getProperty("user.dir") + "/vendor/geckodriver");
            driver = new FirefoxDriver();
        }

        @Override
        protected void after() {
            driver.quit();
        }

    };

}
