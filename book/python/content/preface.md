# Preface

This book is not a full and comprehensive treatise that outlines every possible permutation of [Selenium](http://seleniumhq.org/) (the open-source software test automation tool for web applications). There are other books that already do this. My goal, instead, is to teach you the necessary pieces to use Selenium __successfully__ for your circumstance.

What you have before you is a distilled and actionable guide culled from my consulting practice and full time positions held doing Quality Assurance over the past ten years.

My goal in writing this is to provide you with the materials I wish existed when I was starting out with automated acceptance testing. I hope it serves you well.

## What This Book Will Cover

This book focuses on the latest stable version of Selenium 4 (a.k.a. Selenium WebDriver) and its use to test desktop browsers.

Record and Playback tools like [Selenium IDE](https://www.seleniumhq.org/selenium-ide/) are a great option to understand the ins and outs of Selenium, but they will not be covered in this book because test suites created with Record and Playback tools do not scale well. Instead, an approach of writing well factored tests, in code, is the focus of this book.

## Who This Book Is For

This book is for anyone who wants to take automated acceptance testing seriously and isn't afraid to get their hands a little dirty.

That is to say, this book is for anyone who wants to use computers for what they're good at, and free you up (and potentially the people on your team) to do what they are inherently good at (which does not include repetitive, mundane testing tasks). And don't worry if you're new to programming. I'll cover the essentials so you'll have a good place to start from.

## About The Examples In This Book

The examples in this book are written in Python 3, but the strategies and patterns used are applicable regardless of your technical stack.

The tests in this book are written to exercise functionality from an open-source project I created and maintain called the-internet -- available [here on GitHub](https://github.com/tourdedave/the-internet) and viewable [here on Heroku](http://the-internet.herokuapp.com/).

The test examples are written to run against [pytest](http://docs.pytest.org/en/latest/) with [pip3](https://pip.pypa.io/en/stable/) managing the third-party dependencies.

All of the code examples from the book are available in an accompanying zip file. It contains folders for each chapter where code was written or altered. Chapters with multiple parts will have multiple sub-folders (e.g., code examples referenced in Part 2 of Chapter 9 can be found in `09/02/` in the zip file).

## How To Read This Book

Chapters 1 through 5 focus on the things you need to consider when it comes to test strategy, programming language selection, and good test design. Chapter 6 is where we first start to code. From there, the examples build upon each other through chapter 16.

Chapter 17 paints a picture of the Selenium landscape so you're better able to find information on your own.

## Feedback

If you find an error in the book (e.g., grammar issue, code issue, etc.) or have questions/feedback -- please feel free to e-mail me at <dhaeffner@gmail.com>.

If you submit something and I end up using it in a future version of the book I'll give you a shout-out in the Acknowledgements.

