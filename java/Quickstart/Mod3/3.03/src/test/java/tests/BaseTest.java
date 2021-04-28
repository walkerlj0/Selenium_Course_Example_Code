// filename: tests/BaseTest.java
package tests;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.junit.Rule;
import org.junit.rules.ExternalResource;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;


import static tests.Config.*;


public class
BaseTest {

    protected WebDriver driver;

    @Rule
    public ExternalResource resource = new ExternalResource() {


        @Override
        protected void before() throws Exception {
//            String sauceUrl = "https://ondemand.us-west-1.saucelabs.com/wd/hub";
//            MutableCapabilities capabilities;
//            capabilities.setCapability("browserVersion", browserVersion);
//            capabilities.setCapability("platformName", platformName);
            if ("firefox".equals(browserName)) {
                WebDriverManager.firefoxdriver().setup();
                driver = new FirefoxDriver();
            } else if ("chrome".equals(browserName)) {
                WebDriverManager.chromedriver().setup();
                driver = new ChromeDriver();
            }

            }
        @Override
        protected void after() {
            driver.quit();
        }
        };

    };

