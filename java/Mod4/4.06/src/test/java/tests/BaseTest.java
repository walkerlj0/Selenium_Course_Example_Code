// filename: tests/BaseTest.java
package tests;

import org.junit.Rule;
import org.junit.rules.ExternalResource;
import org.junit.rules.TestName;
import org.junit.rules.TestRule;
import org.junit.rules.TestWatcher;
import org.junit.runner.Description;
import com.saucelabs.saucebindings.Browser;
import com.saucelabs.saucebindings.SauceOptions;
import com.saucelabs.saucebindings.SaucePlatform;
import com.saucelabs.saucebindings.SauceSession;
import org.openqa.selenium.MutableCapabilities;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.remote.RemoteWebDriver;

import java.net.URL;

import static tests.Config.*;

public class BaseTest {

    protected WebDriver driver;
//    private String testName;
    public SauceSession session;

    @Rule
    public SauceTestWatcher testWatcher = new SauceTestWatcher();

    @Rule
    public TestName name = new TestName() {
        public String getMethodName() {
            return String.format("%s", super.getMethodName());
        }

    @Rule
    public ExternalResource resource = new ExternalResource() {

        @Override
        protected void before() throws Throwable {
            if (host.equals("saucelabs")) {
                MutableCapabilities sauceOptions = new MutableCapabilities();
                sauceOptions.setCapability("username", sauceUser);
                sauceOptions.setCapability("accessKey", sauceKey);
                MutableCapabilities capabilities = new MutableCapabilities();
                capabilities.setCapability("browserName", browserName);
                capabilities.setCapability("browserVersion", browserVersion);
                capabilities.setCapability("platformName", platformName);
                capabilities.setCapability("name", name.getMethodName());
                capabilities.setCapability("sauce:options", sauceOptions);
                String sauceUrl = String.format("https://ondemand.saucelabs.com/wd/hub");
                driver = new RemoteWebDriver(new URL(sauceUrl), capabilities);
            } else if (host.equals("localhost")) {
                if (browserName.equals("firefox")) {
                    System.setProperty("webdriver.gecko.driver",
                            System.getProperty("webdriver.gecko.driver", "src/test/java/drivers/geckodriver"));
                    driver = new FirefoxDriver();
                } else if (browserName.equals("chrome")) {
                    System.setProperty("webdriver.chrome.driver", "src/test/java/drivers/chromedriver");
                    ChromeOptions browserOptions = new ChromeOptions();
                    driver = new ChromeDriver();
                }
            }
        }

        @Override
        protected void after() {
            driver.quit();
        }

    };

//    @Rule
//    public TestRule watcher = new TestWatcher() {
//        @Override
//        protected void starting(Description description) {
//            testName = description.getDisplayName();
//        }
//    };
}