package tests;

import org.junit.Test;
import org.junit.Before;
import static org.junit.Assert.*;
import pageobjects.Login;
import org.junit.experimental.categories.Category;
import tests.groups.Shallow;

//@Category(Shallow.class)
public class TestLogin extends Base {

    private Login login;

    @Before
    public void setUp() {
        login = new Login(driver);
    }

    @Test
    @Category(Shallow.class)
    public void succeeded() {
        login.with("tomsmith", "SuperSecretPassword!");
        assertTrue("success message not present",
                login.successMessagePresent());
    }

    @Test
    @Category(Shallow.class)
    public void failed() {
        login.with("tomsmith", "bad password");
        assertTrue("failure message wasn't present after providing bogus credentials",
                login.failureMessagePresent());
        assertFalse("failure message wasn't present after providing bogus credentials",
                login.successMessagePresent());
    }

}
