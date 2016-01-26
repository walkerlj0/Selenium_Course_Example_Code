package pageobjects;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class DynamicLoading {

    private WebDriver driver;
    By startButton = By.cssSelector("#start button");
    By finishText  = By.id("finish");

    public DynamicLoading(WebDriver driver) {
        this.driver = driver;
    }

    public void loadExample(String exampleNumber) {
        driver.get("http://the-internet.herokuapp.com/dynamic_loading/" + exampleNumber);
        driver.findElement(startButton).click();
    }

    public Boolean finishTextPresent() {
        return waitForIsDisplayed(finishText, 10);
    }

    private Boolean waitForIsDisplayed(By locator, Integer timeout) {
        timeout = timeout != null ? timeout : 5;
        try {
            WebDriverWait wait = new WebDriverWait(driver, timeout);
            wait.until(ExpectedConditions.visibilityOfElementLocated(locator));
        } catch (org.openqa.selenium.TimeoutException exception) {
            return false;
        }
        return true;
    }

}