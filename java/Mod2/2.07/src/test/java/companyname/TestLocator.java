//filename: tests/TestLogin.java
package companyname;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

public class TestLocator {

    private WebDriver driver;

    @Before
    public void setUp() {
        System.setProperty("webdriver.chrome.driver", "/Users/lindsaywalker/Documents/chromedriver");
        ChromeOptions browserOptions = new ChromeOptions();
        driver = new ChromeDriver(/*browserOptions*/);
    }

    @Test
    public void locator_test() {
        driver.get("http://the-internet.herokuapp.com/challenging_dom");
        driver.findElement(By.id("  ")).click();
        driver.findElement(By.id("  ")).click();
        // Return the text of the red button id=button alert contains 'foo', 'bar', 'baz', or 'qux'
        String redButtonMessage = driver.findElement(        ).getText();
        System.out.println("The button reads: " + redButtonMessage);

}

    @After
    public void tearDown() {
        driver.quit();
    }
}
