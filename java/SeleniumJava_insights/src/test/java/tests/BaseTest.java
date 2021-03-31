// filename: tests/BaseTest.java
package tests;

import com.saucelabs.saucerest.DataCenter;
import com.saucelabs.saucerest.SauceREST;
import org.junit.Rule;
import org.junit.rules.ExternalResource;
import org.junit.rules.TestRule;
import org.junit.rules.TestWatcher;
import org.junit.runner.Description;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;
import org.junit.runners.Parameterized.Parameter;
import org.junit.runners.Parameterized.Parameters;
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
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;

import static tests.Config.host;
import static tests.Config.sauceKey;
import static tests.Config.sauceTunnel;
import static tests.Config.sauceUser;

@RunWith(Parameterized.class)
public class BaseTest {

    @Parameters
    public static Collection<Object[]> data() {
        return Arrays.asList(
          new Object[][] {
            { BrowserType.FIREFOX, "82", "Windows 10" },
            { BrowserType.FIREFOX, "82", "macOS 10.15" },
            { BrowserType.SAFARI, "13.1", "macOS 10.15" },
            { BrowserType.SAFARI, "12", "macOS 10.14" },
            { BrowserType.EDGE, "18", "Windows 10" },
            { BrowserType.EDGE, "86", "Windows 10" },
            { BrowserType.EDGE, "86", "macOS 10.15" },
            { BrowserType.CHROME, "86", "Windows 10" },
            { BrowserType.CHROME, "86", "macOS 10.15" },
            { BrowserType.IE, "11", "Windows 10" }
          }
        );
    }

    @Parameter
    public String browserName;
    @Parameter(1)
    public String browserVersion;
    @Parameter(2)
    public String platformName;

    protected WebDriver driver;

    private String sessionId;
    private SauceREST sauceClient;
    private String testName;

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
                        System.getProperty("webdriver.gecko.driver",
                                           "src/test/java/drivers/geckodriver");
                        System.setProperty("webdriver.gecko.driver",
                                           System.getProperty("webdriver.gecko.driver",
                                                              "src/test/java/drivers/geckodriver"));
                        driver = new FirefoxDriver();
                    } else if ("chrome".equals(browserName)) {
                        System.setProperty("webdriver.chrome.driver",
                                           "src/test/java/drivers/chromedriver");
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
    public TestRule watcher;
    {
        watcher = new TestWatcher() {
            @Override
            protected void starting(Description description) {
                testName = description.getDisplayName();
            }

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
