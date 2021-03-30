//filename: tests/TestLogin.java
package tests;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import pageobjects.Login;
import static org.junit.Assert.assertTrue;

public class TestLogin {
    private WebDriver driver;
    private Login login;

    @Before
    public void setUp() {
        if (System.getProperty("os.name").startsWith("Windows")) {
            System.setProperty("webdriver.chrome.driver", "lib/chromedriver.exe");
        } else {
            System.setProperty("webdriver.chrome.driver", "lib/chromedriver");
        }
        ChromeOptions browserOptions = new ChromeOptions();
        driver = new ChromeDriver(browserOptions);
        login = new Login(driver);
    }

    @Test
    public void succeeded() {
        login.with("tomsmith", "SuperSecretPassword!");
        assertTrue("success message not present",
                login.successMessagePresent());

    }

    @After
    public void tearDown() {
        driver.quit();
    }
}
