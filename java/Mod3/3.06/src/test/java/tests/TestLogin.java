//filename: tests/TestLogin.java
package tests;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import pageobjects.Login;
import static org.junit.Assert.*;

public class TestLogin {
    private WebDriver driver;
    private Login login;

    @Before
    public void setUp() {
        System.setProperty("webdriver.chrome.driver", "<insert path to chromedriver here>");
        ChromeOptions browserOptions = new ChromeOptions();
        driver = new ChromeDriver(browserOptions);
    }

    @Test
    public void succeeded() {
        login.with("tomsmith", "SuperSecretPassword!");
        assertTrue("success message not present",
                login.successMessagePresent());
    }
//    @Test
//    public void failed() {
//        login.with("tomsmith", "bad password");
//        assertTrue("failure message wasn't present after providing bogus credentials",
//                login.failureMessagePresent());
//    }

    @Test
    public void failed() {
        login.with("tomsmith", "bad password");
        assertFalse("success message was present after providing bogus credentials",
                login.successMessagePresent());
    }

    @After
    public void tearDown() {
        driver.quit();
    }
}
