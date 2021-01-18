summary: Module1 of the Advanced Selenium Java Coures.
id: Module1_AdvancedSeleniumJava
categories: Java
tags: advjava  
environments: Web
status: Draft
feedback link: https://forms.gle/CGu4QchgBxxWnNJK8
author:Lindsay Walker
<!-- ------------------------ -->
# Module 1 – Advanced Selenium with Java

<!-- ------------------------ -->
## Section 1 Course Setup
Duration: 0:10:00

This course will guide you through creating a new test suite from scratch. Although it is recommended that you use Maven and a `requirements.txt` file to manage dependencies, this course will start with an complete set of dependencies in the .jar files in the /lib directory of a project


### Install Software

In this module we will walk you through getting the repository of files from Github. In order to have this set up, you should have:



*   A Github account
*   Git installed on your computer
*   A Java SDK ([Version 8 used in this example](https://www.oracle.com/java/technologies/javase/javase-jdk8-downloads.html))
*   An IDE ([IDEA Community Edition](https://www.jetbrains.com/idea/download/))


### Required Dependencies

In order to get your test files set up you should have some basic software already installed. The rest will be provided as `.jar` files as a part of the repository you will download. In this course, we will be using tools included in the IntelliJ IDE to manage which branch of test code you are looking at.

To download the base project, including the set of .jar files with dependencies, visit the **new_base** branch of the advanced-selenium course here: [https://github.com/saucelabs-training/advanced-selenium/tree/new_base](https://github.com/saucelabs-training/advanced-selenium/tree/new_base)

<img src="assets/ADV1.03A.png" alt="New base branch" width="750"/>

If you are familiar with using GitHub, you can fork the project, then use `git clone &lt;URL to repo>` in the directory you wish to store it.



*   First, login to your Git account and make sure you have it downloaded on your computer. For the easiest workflow, [set up SSH](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/connecting-to-github-with-ssh) so you don’t have to enter your password for many of the git actions.
*   Next, fork the repo to create your own version that you can commit to. Click the icon to fork the branch and place it in your personal account.

<img src="assets/ADV1.03B.png" alt="Fork the new base branch" width="750"/>

*   In Terminal, run the command `git clone your-git-branch` to create a local version of the repository. Copy the link from the repository you just created.

<img src="assets/ADV1.03C.png" alt="Dcopy the branch name" width="750"/>



#### Note

If you do not want to work with Git and would instead prefer to simply download the project content, simply download the .zip file wherever you would like to create your project.


<img src="assets/ADV1.03D.png" alt="Download the zip file" width="750"/>


Once you have a copy of the repository on your local maching, open your project with IntelliJ. Open the IntelliJ IDE, choose **Open** and navigate to where you created your local repository.

You should see a project with the following structure. Ensure that you are on the branch **new_base:**

<img src="assets/ADV1.03E.png" alt="view new base branch in IntelliJ" width="850"/>


Next, we will add our first elements for a test that can run both locally, and on Sauce Labs.


## Managing Drivers

There are three ways to manage a test. You can either check the version of the browser that you have on your machine (e.g. Chrome 86) then manually find and install the compatible driver. Doing it this way, you have to create either a Path variable (Option 1) or set the location to this driver in the code and place your driver there (Option 2) You will be using a third option.


```
// Option 1
    // Download Driver & Add to PATH Environment Variable
        for (String a : System.getenv("PATH").split(":"))
            System.out.println(a);

// Option 2
// Download manually and explicitly specify location:
        String location = System.getProperty("user.home") + "/.webdrivers/chromedriver";
        System.setProperty("webdriver.chrome.driver", location)
```


In this example, you are going to use a module called [WebDriver Manager](https://github.com/bonigarcia/webdrivermanager) which takes care of all this for you. Your Selenium Test should start out with the following code:


```
//filename: SeleniumTest
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

        // Start session & open browser
        RemoteWebDriver driver = new ChromeDriver();

        // Quit session (closes browser)
        driver.quit();
    }
}

```


Notice the imports at the top. WebDriver Manager helps you with local execution of your web driver, and ChromeDriver helps

Run this first simple test by right clicking the green arrow that appears next to the test name, and selecting **Run ‘openBrowser()’** in the menu that appears. You should see one test run successfully if you click on the **Run** menu in the bottom menu.


<img src="assets/ADV1.03F.png" alt="Run your tests and see results in IntelliJ" width="850"/>


You can see the code that you should have run passing with one passed test.


<!-- ------------------------ -->
## Section 2 – Run Local & Remote Tests
Duration: 0:10:00

One important basic thing that you need to be able to learn how to do is to create a test that can run using WebDriver Manager locally, or run on Sauce Labs. First you will need to create a new Java class (right click on the package **test.java.com.saucelabs.advancedselenium** and choose **New > Java Class)** called SauceLabsTest.java.

<img src="assets/ADV1.04A.png" alt="Create a new class Run your tests and see results in IntelliJ" width="450"/>


We are going to create a test that will allow you to switch between running locally and running on Sauce Labs




<!-- ------------------------ --
## Section 1
Duration: 0:10:00



<!-- ------------------------ --
## Section 1
Duration: 0:10:00



<!-- ------------------------ --
## Section 1
Duration: 0:10:00

-->
