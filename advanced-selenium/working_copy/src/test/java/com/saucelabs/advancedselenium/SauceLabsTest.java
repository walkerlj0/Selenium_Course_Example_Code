package test.java.com.saucelabs.advancedselenium;

import com.saucelabs.saucebindings.JobVisibility;
import com.saucelabs.saucebindings.SauceOptions;
import com.saucelabs.saucebindings.SauceSession;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions; //added with test
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.util.Collections;

public class SauceLabsTest {
    RemoteWebDriver driver = null;
    SauceSession session = null;

    @BeforeEach
    public void togglePlatform() {
        ChromeOptions chromeOptions = new ChromeOptions();
        chromeOptions.setExperimentalOption("excludeSwitches", //added, allows popups
                Collections.singletonList("disable-popup-blocking")); //added allows popups
        if (System.getenv("SELENIUM_PLATFORM") == null) { // this will run a local chromedriver by default
            WebDriverManager.chromedriver().setup();
            driver = new ChromeDriver(chromeOptions);
        } else if (System.getenv("SELENIUM_PLATFORM").equals("SAUCE")) {
            SauceOptions sauceOptions = new SauceOptions(chromeOptions);
            sauceOptions.setJobVisibility(JobVisibility.PUBLIC);// Sets the job on SL to publicly viewable
            SauceSession sauceSession = new SauceSession(sauceOptions);
            driver = sauceSession.start();
        }
        else {
            throw new RuntimeException("You have no environment variable set that specifies the local or remote host");
        }
    }

    @Test
        public void exampleTest() {
        driver.get("https://www.saucedemo.com");
        By locator = By.className("btn_action");
        WebDriverWait wait = new WebDriverWait(driver, 30);
        wait.until(ExpectedConditions.visibilityOfAllElementsLocatedBy(locator));
        WebElement element = driver.findElement(locator);
        element.click();
        Assertions.assertEquals("Swag Labs", driver.getTitle());
    }

    @AfterEach
    public void endSession() {
        if (session != null) { // this will be null if you run locally
            session.stop(true);
        } else if (driver != null) { // this is null if there was a problem initializing the driver
            driver.quit();
        }
    }
}

