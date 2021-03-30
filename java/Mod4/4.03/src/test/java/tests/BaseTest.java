// filename: tests/BaseTest.java
package tests;

import org.junit.Rule;
import org.junit.rules.ExternalResource;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

public class BaseTest {

    protected WebDriver driver;

    @Rule
    public ExternalResource resource = new ExternalResource() {

        @Override
        protected void before() throws Exception {
            System.setProperty("webdriver.chrome.driver", "<insert path to chromedriver here>");
            ChromeOptions browserOptions = new ChromeOptions();
            driver = new ChromeDriver(browserOptions);
        }

        @Override
        protected void after() {
            driver.quit();
        }

    };
}
