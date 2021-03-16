package test.java.com.saucelabs.advancedselenium;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;


public class SauceLabsTest extends test.java.com.saucelabs.advancedselenium.SauceTestBase {

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

}

