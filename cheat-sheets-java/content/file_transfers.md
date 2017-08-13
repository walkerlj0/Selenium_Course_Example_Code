# File Transfers

## Upload

1. Find the form input field for uploading the file
2. Use `sendKeys` to input the full path of the file you want to upload
3. Submit the form

```java
String filename = "some-file.txt";
File file = new File(filename);
String path = file.getAbsolutePath();
driver.get("http://the-internet.herokuapp.com/upload");
driver.findElement(By.id("file-upload")).sendKeys(path);
driver.findElement(By.id("file-submit")).click();
```

## Download

1. Get the URL of the file you want to download
2. Perform a header (or HEAD) request on the URL with an HTTP library
3. Check the content type and content length of the response to make sure the file is what you expected

```java
driver.get("http://the-internet.herokuapp.com/download");
String link = driver.findElement(By.cssSelector(".example a:nth-of-type(1)")).getAttribute("href");

HttpClient httpClient = HttpClientBuilder.create().build();
HttpHead request = new HttpHead(link);
HttpResponse response = httpClient.execute(request);
String contentType = response.getFirstHeader("Content-Type").getValue();
int contentLength = Integer.parseInt(response.getFirstHeader("Content-Length").getValue());

assertThat(contentType, is("application/octet-stream"));
assertThat(contentLength, is(not(0)))
```
