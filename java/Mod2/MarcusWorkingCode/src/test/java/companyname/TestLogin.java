//filename: tests/TestLogin.java
package companyname;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.MutableCapabilities;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

import static org.junit.Assert.assertTrue;

public class TestLogin {

    private WebDriver driver;

    @Before
    public void setUp() {
//        System.setProperty("webdriver.gecko.driver",
//                System.getProperty("user.dir") + "/vendor/geckodriver");
        MutableCapabilities sauceOptions = new MutableCapabilities();
        ChromeOptions browserOptions = new ChromeOptions();
//        browserOptions.setExperimentalOption("w3c", true); // Don't need to have this anymore
        browserOptions.setCapability("platformName", "Windows 10");
        browserOptions.setCapability("browserVersion", "latest-1");
        browserOptions.setCapability("sauce:options", sauceOptions);
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
