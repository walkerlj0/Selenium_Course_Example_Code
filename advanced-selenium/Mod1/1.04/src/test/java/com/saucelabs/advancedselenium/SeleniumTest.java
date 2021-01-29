package test.java.com.saucelabs.advancedselenium;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.remote.RemoteWebDriver;

public class SeleniumTest {

    @Test
    public void openBrowser() {
        // Let WebDriverManager handle drivers
        WebDriverManager.chromedriver().setup();

        // Start session (opens browser)
        RemoteWebDriver driver = new ChromeDriver();

        // Quit session (closes browser)
        driver.quit();
    }
}
