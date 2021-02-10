package com.saucelabs.advancedselenium;

import com.saucelabs.saucebindings.SauceOptions;
import com.saucelabs.saucebindings.SauceSession;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.TestInfo;
import org.junit.jupiter.api.extension.ExtensionContext;
import org.junit.jupiter.api.extension.RegisterExtension;
import org.junit.jupiter.api.extension.TestWatcher;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.remote.RemoteWebDriver;

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
        System.setProperty("SELENIUM_PLATFORM", "LOCAL");
    }

    @BeforeEach
    public void setUp(TestInfo testinfo) {  // added testinfo parameters in 1.06
        ChromeOptions chromeOptions = new ChromeOptions();

        if (System.getProperty("SELENIUM_PLATFORM").equals("LOCAL")) {
            WebDriverManager.chromedriver().setup();

            driver = new ChromeDriver(chromeOptions);
        } else if (System.getProperty("SELENIUM_PLATFORM").equals("SAUCE")) {
            SauceOptions sauceOptions = new SauceOptions(chromeOptions);
            sauceOptions.setName(testinfo.getDisplayName()); // added in 1.06

            session = new SauceSession(sauceOptions);
            driver = session.start();
        }
        else {
            throw new RuntimeException("Set System Property 'SELENIUM_PLATFORM' to determine where test is run");
        }
    }

    public class MyTestWatcher implements TestWatcher { // entire class added in 1.06
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
