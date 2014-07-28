# Preface

This book is not a full and comprehensive treatise that outlines every possible permutation of Selenium (the open-source software test automation tool for web applications). There are other books that already do this. My goal, instead, is to teach you the necessary bits to use Selenium __successfully__ for your circumstance.

What you have before you is a distilled and actionable guide culled from my consulting practice and full time positions held doing Quality Assurance over the last five years.

My goal in writing this is to provide you with the materials I wish existed when I was starting out with automated acceptance testing. I hope it serves you well.

## What This Book Will Cover

This book focuses on the latest version of Selenium (a.k.a. Selenium WebDriver) and its use to test desktop browsers. It's predecessor, Selenium RC, will be covered only insofar as to help you upgrade from it. Mobile testing with Appium will also briefly be covered.

Record and Playback tools like Selenium IDE and Selenium Builder are great for getting started, but abysmal for growing past that point. To that end, they will not be covered in this book. An approach on writing well factored tests, in code, will be the focus instead.

## Who This Book Is For

This book is for anyone who wants to take automated acceptance testing seriously and isn't afraid to get their hands a little dirty. That is to say, this book is for anyone who wants to use computers for what they are good at, and free up you and people on your team to do what they are inherently good at (which does not include repetitive, mundane testing tasks). And don't worry if you're super new to programming, I'll cover the basics so you'll have a good platform to build from.

## About The Examples In This Book

The examples in this book are written in Ruby. This is partly because that is the language in which I am strongest. But really, it has more to do with how readable and approachable the language is. By sticking with a scripting language that reads a lot like English, this book can be picked up by almost anyone regardless of their technical background and be immediately useful. And even if Ruby isn't your preferred language, the strategies and patterns used are applicable regardless of your tech stack.

The web functionality used to write tests against is from an open source project called the-internet -- available on [GitHub](https://github.com/tourdedave/the-internet) and viewable through [a Heroku site](http://the-internet.herokuapp.com/).

The tests are written for version 2.14 of [RSpec](http://rspec.info/) (a popular Ruby testing framework).

All third-party libraries (a.k.a. "gems") are specified in a `Gemfile` and installed using [Bundler](http://bundler.io/).

This book is accompanied by a zipfile of all code examples referenced in the text. If you get stuck or want a quick reference on how something is supposed to look -- take a look there. There are a number of issues you may run into, and this is sure to help save you some time and headache.

## How To Read This Book

Chapters 1 through 5 are focused on priming you with knowledge and questions to consider when it comes to test strategy, language selection, and test design. Chapter 6 is where we first start to code. From there, the examples build upon each other through chapter 16.

Chapter 17 is an accumulation of 13 sub-chapters which outline things you will likely see and how to address them. They do not build upon each other or other parts of the book, and are each meant to stand alone.

Code examples will correspond to each chapter number. For chapters with multiple parts, code examples will be broken up into numbered sub-folders (e.g., code examples referenced in Part 2 of Chapter 9 can be found in `code_examples/09_base_page_object/02/`).

## Feedback

If you find a glitch in the book (e.g., grammar issue, code issue, etc.) or have questions/feedback -- please feel free to e-mail me at <dhaeffner@gmail.com>.

If you submit something and I end up using it in a future version of the book, I'll give you a shout-out in the acknowledgements.
