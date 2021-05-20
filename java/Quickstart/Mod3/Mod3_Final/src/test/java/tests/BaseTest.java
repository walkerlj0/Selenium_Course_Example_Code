// filename: tests/BaseTest.java
package tests;

import com.saucelabs.saucerest.DataCenter;
import com.saucelabs.saucerest.SauceREST;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.junit.Rule;
import org.junit.rules.ExternalResource;
import org.junit.rules.TestRule;
import org.junit.rules.TestWatcher;
import org.junit.runner.Description;
import org.openqa.selenium.MutableCapabilities;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.edge.EdgeOptions;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxOptions;
import org.openqa.selenium.ie.InternetExplorerOptions;
import org.openqa.selenium.remote.BrowserType;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.safari.SafariOptions;

import java.net.URL;
import java.util.Date;

import static tests.Config.*;


public class
BaseTest {

    protected WebDriver driver;
    private String testName;
    private String sessionId;
    private SauceREST sauceClient;

    @Rule
    public ExternalResource resource = new ExternalResource() {


        @Override
        protected void before() throws Exception {
            String sauceUrl = "https://ondemand.us-west-1.saucelabs.com/wd/hub";
            MutableCapabilities capabilities;
            switch (browserName) {
                case BrowserType.SAFARI: {
                    capabilities = new SafariOptions();
                    break;
                }
                case BrowserType.FIREFOX: {
                    capabilities = new FirefoxOptions();
                    break;
                }
                case BrowserType.IE: {
                    capabilities = new InternetExplorerOptions();
                    break;
                }
                case BrowserType.EDGE: {
                    capabilities = new EdgeOptions();
                    break;
                }
                default: {
                    capabilities = new ChromeOptions();
                    break;
                }
            }
            capabilities.setCapability("browserVersion", browserVersion);
            capabilities.setCapability("platformName", platformName);

            MutableCapabilities sauceOptions = new MutableCapabilities();
            sauceOptions.setCapability("username", sauceUser);
            sauceOptions.setCapability("accessKey", sauceKey);
            sauceOptions.setCapability("name", testName);

            switch (host) {
                case "saucelabs": {
                    sauceOptions.setCapability("extendedDebugging", "true");
                    sauceOptions.setCapability("capturePerformance", "true");
                    capabilities.setCapability("sauce:options", sauceOptions);

                    driver = new RemoteWebDriver(new URL(sauceUrl), capabilities);
                    sessionId = ((RemoteWebDriver) driver).getSessionId().toString();
                    System.out.printf("Started %s", new Date().toString());
                    System.out.printf("SauceOnDemandSessionID=%s job-name=%s", sessionId, testName);
                    sauceClient = new SauceREST(sauceUser, sauceKey, DataCenter.US);

                    break;
                }
                case "localhost":
                    if ("firefox".equals(browserName)) {
                        WebDriverManager.firefoxdriver().setup();
                        driver = new FirefoxDriver();
                    } else if ("chrome".equals(browserName)) {
                        WebDriverManager.chromedriver().setup();
                        driver = new ChromeDriver();
                    }
                    break;
                case "saucelabs-tunnel": {
                    sauceOptions.setCapability("tunnelIdentifier", sauceTunnel);
                    capabilities.setCapability("sauce:options", sauceOptions);

                    driver = new RemoteWebDriver(new URL(sauceUrl), capabilities);
                    sessionId = ((RemoteWebDriver) driver).getSessionId().toString();
                    System.out.printf("Started %s", new Date().toString());
                    System.out.printf("SauceOnDemandSessionID=%s job-name=%s", sessionId, testName);
                    //these three options copied from Sauce Bindings, need to not reference this.
//                    String sauceReporter = String.format("SauceOnDemandSessionID=%s job-name=%s", this.driver.getSessionId(), this.sauceOptions.sauce().getName());
//                    String sauceTestLink = String.format("Test Job Link: https://app.saucelabs.com/tests/%s", this.driver.getSessionId());
//                    System.out.print(sauceReporter + "\n" + sauceTestLink + "\n");
                    sauceClient = new SauceREST(sauceUser, sauceKey, DataCenter.US);
                    break;
                }
            }
        }

        @Override
        protected void after() {
            driver.quit();

        }

    };
    @Rule
    public TestRule watcher;{
        watcher = new TestWatcher() {
            @Override
            protected void starting(Description description) {
                testName = description.getDisplayName();
            }
            //2 overrides below added
            @Override
            protected void failed(Throwable throwable, Description description) {
                if ("saucelabs".equals(host)) {
                    sauceClient.jobFailed(sessionId);
                    System.out.println(String.format("https://saucelabs.com/tests/%s", sessionId));
                }
            }
            @Override
            protected void succeeded(Description description) {
                if ("saucelabs".equals(host)) {
                    sauceClient.jobPassed(sessionId);
                }
            }
        };
    }
}
