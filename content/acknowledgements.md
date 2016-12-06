# Acknowledgements

I intentionally saved JavaScript for last in my series of books because it is the most different of the languages to tackle given that it is fundamentally asynchronous (whereas all other officially supported programming languages for Selenium are synchronous). And with its explosive popularity in Selenium over the last couple of years there are far more options to choose from with regards to available frameworks and language bindings. Frankly, the thought of getting started was intimidating.

Thanks to the work of Mek Stittri and Alister Scott, getting started was infinitely easier.

[Mek Stittri](https://github.com/mekdev) spent a great deal of time looking through all of the prominent options in the JavaScript space for Selenium in late 2015. He provided a thorough overview in [a meetup talk he gave at the San Francisco Selenium Meetup last November](https://www.youtube.com/watch?v=CqeCUyoIEo8) which confirmed a lot of my suspicions and initial findings about the available tooling in the space. He also [open-sourced the JavaScript code that they are using for testing with Selenium](https://github.com/mekdev/mocha-selenium-pageobject) where he works (at [Airware](http://www.airware.com/)). His approach has continued to evolve in favor of a cleaner implementation that isn't so reliant on a third-party promise manager. You can see his latest work on this [here](https://github.com/airware/webdriver-mocha-async-await-example).

[Alister Scott](https://github.com/alisterscott) came to a similar conclusion as Mek with regards to his tool selection and published a multi-part series on getting started with the official Selenium JavaScript bindings and Mocha. You can see them [here](https://watirmelon.com/2015/10/28/getting-started-with-webdriverjs-mocha/), [here](https://watirmelon.com/2015/10/30/webdriverjs-mocha-part-2-hooks/), [here](https://watirmelon.com/2015/10/30/webdriverjs-mocha-part-3-page-objects/), and [here](https://watirmelon.com/2015/11/02/webdriverjs-mocha-part-4-more-page-objects-config/). He works at [Automattic](https://automattic.com/) (the company behind WordPress) and they [open-sourced their Selenium test code](https://watirmelon.com/2016/05/05/wordpress-com-e2e-automated-tests-now-open-source/) as well earlier this year.

Thanks you two. You served as a great inspiration and helped make my entry into JavaScript & Selenium far less turbulent than I had anticipated.

Also, a big thanks to Marucs Noll for finding a bug in my cloud configuration in the last edition and contributing a fix!


Cheers,  
Dave H
