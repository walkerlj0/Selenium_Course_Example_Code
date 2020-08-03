//filename: tests/TestLogin.java
package companyname;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

public class TestLogin {

    private WebDriver driver;

    @Before
    public void setUp() {
        System.setProperty("webdriver.chrome.driver", "<insert filepath to chromedriver here>");
        ChromeOptions browserOptions = new ChromeOptions();
        driver = new ChromeDriver(/*browserOptions*/);
    }


    @After
    public void tearDown() {
        driver.quit();
    }
}
