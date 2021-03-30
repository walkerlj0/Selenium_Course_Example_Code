//filename: tests/TestLogin.java
package tests;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import static org.junit.Assert.assertTrue;

public class TestLogin {

    private WebDriver driver;

    @Before
    public void setUp() {
        // Set location of chromedriver
        if (System.getProperty("os.name").startsWith("Windows")) {
            System.setProperty("webdriver.chrome.driver", "lib/chromedriver.exe");
        } else {
            System.setProperty("webdriver.chrome.driver", "lib/chromedriver");
        }
        ChromeOptions browserOptions = new ChromeOptions();
        driver = new ChromeDriver(browserOptions);
    }

    @Test
    public void succeeded() {
        driver.get("http://the-internet.herokuapp.com/login");
        driver.findElement(By.id("username")).sendKeys("tomsmith");
        driver.findElement(By.id("password")).sendKeys("SuperSecretPassword!");
        driver.findElement(By.cssSelector("button")).click();
        assertTrue("success message not present",
                driver.findElement(By.cssSelector(".flash.success")).isDisplayed());
    }

    @After
    public void tearDown() {
        driver.quit();
    }
}
