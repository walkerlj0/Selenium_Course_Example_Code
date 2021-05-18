// filename: tests/BaseTest.java
package tests;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.junit.Rule;
import org.junit.rules.ExternalResource;
import org.openqa.selenium.MutableCapabilities;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.remote.RemoteWebDriver;


import java.net.URL;

import static tests.Config.*;


public class
BaseTest {

    protected WebDriver driver;

    @Rule
    public ExternalResource resource = new ExternalResource() {
        @Override
        protected void before() throws Exception {
            switch (host) {
                case "saucelabs": {
                    String sauceUrl = "https://ondemand.us-west-1.saucelabs.com/wd/hub";
                    MutableCapabilities sauceOptions = new MutableCapabilities();
                    sauceOptions.setCapability("username", sauceUser);
                    sauceOptions.setCapability("accesskey", sauceKey);
                    MutableCapabilities capabilities = new MutableCapabilities();
                    capabilities.setCapability("browserName", browserName);
                    capabilities.setCapability("browserVersion", browserVersion);
                    capabilities.setCapability("platformName", platformName);
                    capabilities.setCapability("sauce:options", sauceOptions);
                    driver = new RemoteWebDriver(new URL(sauceUrl), capabilities);
                    break;
                }
                case "localhost": {
                    if ("firefox".equals(browserName)) {
                        WebDriverManager.firefoxdriver().setup();
                        driver = new FirefoxDriver();
                    } else if ("chrome".equals(browserName)) {
                        WebDriverManager.chromedriver().setup();
                        driver = new ChromeDriver();
                    }
                    break;
                }
            }
        }
        @Override
        protected void after() {
            driver.quit();
        }
        };
    };

