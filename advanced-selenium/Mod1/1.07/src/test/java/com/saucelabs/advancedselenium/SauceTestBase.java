package test.java.com.saucelabs.advancedselenium;

import com.saucelabs.saucebindings.*;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.TestInfo;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.api.extension.ExtensionContext;
import org.junit.jupiter.api.extension.TestWatcher;
import org.openqa.selenium.Platform;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.remote.RemoteWebDriver;
import java.util.Collections

@ExtendWith(SauceTestBase.SauceTestWatcher.class) // added

public class SauceTestBase {

    RemoteWebDriver driver = null;
    SauceSession session = null;

    @BeforeEach
    public void setUp(TestInfo testinfo) {  // change method name, added testinfo parameters
        System.setProperty("SELENIUM_PLATFORM"="SAUCE");
        ChromeOptions chromeOptions = new ChromeOptions();
        chromeOptions.setExperimentalOption("excludeSwitches", // added 1.07
                Collections.singletonList("disable-popup-blocking")); // add in 1.07
        if (System.getProperty("SELENIUM_PLATFORM") == null) {
            WebDriverManager.chromedriver().setup();
            driver = new ChromeDriver(chromeOptions);
        } else if (System.getProperty("SELENIUM_PLATFORM").equals("SAUCE")) {
            SauceOptions sauceOptions = new SauceOptions(chromeOptions);
            sauceOptions.setBrowserName(Browser.CHROME);
            sauceOptions.setPlatformName(Platform.MAC);








            sauceOptions.setJobVisibility(JobVisibility.PUBLIC); // add in 1.07
            sauceOptions.setName(testinfo.getDisplayName()); // added
            SauceSession sauceSession = new SauceSession(sauceOptions);
//            SauceTestWatcher.setsession // get from titus or Diego
            driver = sauceSession.start();
        }
        else {
            throw new RuntimeException("You have no environment variable set that specifies the local or remote host");
        }
    }


    @AfterEach
    public void endSession() {
        if (session != null) { // this will be null if you run locally
            session.stop(true);
        } else if (driver != null) { // this is null if there was a problem initializing the driver
            driver.quit();
        }
    }

    public class SauceTestWatcher implements TestWatcher { // entire class added
        private SauceSession session;

        public void setSession(SauceSession session) {
            this.session = session;
        }

        @Override
        protected void testFailed(ExtensionContext context, Throwable cause) {
            session.stop(false);
        }

        @Override
        protected void testSuccessful(ExtensionContext context) {
            session.stop(true);
        }

    }
}
