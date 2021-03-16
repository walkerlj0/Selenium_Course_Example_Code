package test.java.com.saucelabs.advancedselenium;

import com.saucelabs.saucebindings.*;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.TestInfo;
import org.junit.jupiter.api.extension.ExtensionContext;
import org.junit.jupiter.api.extension.RegisterExtension;
import org.junit.jupiter.api.extension.TestWatcher;
import org.openqa.selenium.UnexpectedAlertBehaviour;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.remote.RemoteWebDriver;

import java.util.Collections;

public class SauceTestBase {

    RemoteWebDriver driver = null;
    SauceSession session = null;

    @RegisterExtension
    public MyTestWatcher myTestWatcher = new MyTestWatcher();

    @BeforeAll
    public static void setExecution() {
        // NOTE: This code is for convenience in this tutorial
        // Normally this would be set in pom file or with IntelliJ
        // Toggle this setting to determine whether tests run on SAUCE or LOCAL
        System.setProperty("SELENIUM_PLATFORM", "SAUCE");
    }

    @BeforeEach
    public void setUp(TestInfo testinfo) {  // change method name in 1.06, added testinfo parameters in 1.06
        System.setProperty("SELENIUM_PLATFORM", "SAUCE");
        ChromeOptions chromeOptions = new ChromeOptions();
        chromeOptions.setExperimentalOption("excludeSwitches", // added 1.07
                Collections.singletonList("disable-popup-blocking")); // add in 1.07
        chromeOptions.setUnhandledPromptBehaviour(UnexpectedAlertBehaviour.IGNORE); //added in mod 2? Which one? Can we add in test class?
        if (System.getProperty("SELENIUM_PLATFORM").equals("LOCAL")) {
            WebDriverManager.chromedriver().setup();
            driver = new ChromeDriver(chromeOptions);
        } else if (System.getProperty("SELENIUM_PLATFORM").equals("SAUCE")) {
            SauceOptions sauceOptions = new SauceOptions(chromeOptions);
            sauceOptions.setJobVisibility(JobVisibility.PUBLIC); // add in 1.07
            sauceOptions.setPageLoadStrategy(PageLoadStrategy.EAGER); // add in 1.08
            TimeoutStore timeoutStore = new TimeoutStore(); // below added in 1.08
            timeoutStore.setImplicitWait(0);
            timeoutStore.setPageLoad(300000);
            timeoutStore.setScript(30000);
            sauceOptions.setTimeout(timeoutStore);

            sauceOptions.setName(testinfo.getDisplayName()); // added
            SauceSession sauceSession = new SauceSession(sauceOptions);
            driver = sauceSession.start();
        } else {
            throw new RuntimeException("You have no environment variable set that specifies the local or remote host");
        }
    }


    public class MyTestWatcher implements TestWatcher { // entire class added
        @Override
        public void testFailed(ExtensionContext context, Throwable cause) {
            if (session != null) {
                session.stop(false);
            } else {
                System.out.println("Test Failed!");
                driver.quit();
            }
        }

        @Override
        public void testSuccessful(ExtensionContext context) {
            if (session != null) {
                session.stop(true);
            } else {
                System.out.println("Test Passed!");
                driver.quit();
            }
        }
    }
}
