package test.java;

import com.saucelabs.saucebindings.SauceOptions;
import com.saucelabs.saucebindings.SauceSession;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.junit.After;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.TestName;
import org.openqa.selenium.MutableCapabilities;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.remote.RemoteWebDriver;

import java.net.MalformedURLException;
import java.net.URL;

public class SauceLabsTest {
    RemoteWebDriver driver = null;
    SauceSession session = null;

    @Rule
    public TestName name = new TestName() {
        public String getMethodName() {
            return String.format("%s", super.getMethodName());
        }
    };

    @Test
    public void remoteDriver() throws MalformedURLException {
        MutableCapabilities sauceOpts = new MutableCapabilities();
        sauceOpts.setCapability("name", System.getenv("SAUCE_USERNAME") + " - " + name.getMethodName());
        sauceOpts.setCapability("username", System.getenv("SAUCE_USERNAME"));
        sauceOpts.setCapability("accessKey", System.getenv("SAUCE_ACCESS_KEY"));

        ChromeOptions chromeOptions = new ChromeOptions();
        chromeOptions.setCapability("sauce:options", sauceOpts);

        URL url = new URL("https://ondemand.us-west-1.saucelabs.com/wd/hub");
        driver = new RemoteWebDriver(url, chromeOptions);
    }

    @Test
    public void sauceBindings() {
        ChromeOptions chromeOptions = new ChromeOptions();

        SauceOptions sauceOptions = new SauceOptions(chromeOptions);
        sauceOptions.setName(System.getenv("SAUCE_USERNAME") + " - " + name.getMethodName());

        session = new SauceSession(sauceOptions);
        driver = session.start();
    }

    @Test
    public void togglePlatform() throws MalformedURLException {
        ChromeOptions chromeOptions = new ChromeOptions();

        if (System.getenv("SELENIUM_PLATFORM") == null) {
            WebDriverManager.chromedriver().setup();
            driver = new ChromeDriver(chromeOptions);
        } else if (System.getenv("SELENIUM_PLATFORM").equals("SAUCE")) {
            SauceOptions sauceOptions = new SauceOptions(chromeOptions);
            SauceSession sauceSession = new SauceSession(sauceOptions);
            driver = sauceSession.start();
        }
//        else if (System.getenv("SELENIUM_PLATFORM").equals("GRID")) {
//            URL url = new URL("https://remote-grid-machine-url/wd/hub");
//            driver = new RemoteWebDriver(url, chromeOptions);
//        }
        else {
            WebDriverManager.chromedriver().setup();
            driver = new ChromeDriver(chromeOptions);
        }
    }

    @After
    public void endSession() {
        if (session != null) {
            session.stop(true);
        } else if (driver != null) {
            driver.quit();
        }
    }
}

