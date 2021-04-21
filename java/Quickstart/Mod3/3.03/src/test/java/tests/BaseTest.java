// filename: tests/BaseTest.java
package tests;

//import com.saucelabs.saucerest.DataCenter;
//import com.saucelabs.saucerest.SauceREST;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.junit.BeforeClass;
import org.junit.Rule;
import org.junit.rules.ExternalResource;
//import org.junit.rules.TestRule;
//import org.junit.rules.TestWatcher;
//import org.junit.runner.Description;
import org.openqa.selenium.MutableCapabilities;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
//import org.openqa.selenium.edge.EdgeOptions;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxOptions;
//import org.openqa.selenium.ie.InternetExplorerOptions;
//import org.openqa.selenium.remote.BrowserType;
import org.openqa.selenium.remote.RemoteWebDriver;
//import org.openqa.selenium.safari.SafariOptions;

//import java.net.URL;
//import java.util.Date;

import static tests.Config.*;


public class
BaseTest {

    protected WebDriver driver;


    @BeforeClass
    public static void setupClass() {
        WebDriverManager.chromedriver().setup();
    }
    @Rule
    public ExternalResource resource = new ExternalResource() {


        @Override
        protected void before() throws Exception {
            String sauceUrl = "https://ondemand.us-west-1.saucelabs.com/wd/hub";
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

