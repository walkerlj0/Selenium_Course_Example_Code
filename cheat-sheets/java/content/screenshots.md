# Screenshots on Failure

1. Add a TestWatcher and configure a `failed` method within it
2. Capture a screenshot with Selenium, storing it in a file object
3. Write the file object to disk using a unique name
4. Move the test teardown into a `finished` method in the TestWatcher

```java
import org.junit.rules.TestRule;
import org.junit.rules.TestWatcher;
import org.junit.runner.Description;

public class TestClass {

    @Rule
    public TestRule watcher = new TestWatcher() {
        @Override
        protected void failed(Throwable throwable, Description description) {
            File scrFile = ((TakesScreenshot)driver).getScreenshotAs(OutputType.FILE);
            try {
                FileUtils.copyFile(scrFile,
                        new File("failshot_"
                                + description.getClassName()
                                + "_" + description.getMethodName()
                                + ".png"));
            } catch (IOException exception) {
                exception.printStackTrace();
            }
        }

        @Override
        protected void finished(Description description) {
            driver.quit();
        }
    };
// ...
```
