# Hacker News Top 100 Article Sorting - Tested with Playwright

> [**Playwright**](https://playwright.dev/) test script that validates that the first 100 [Hacker News](https://news.ycombinator.com/newest) articles are sorted from newest to oldest 
> with [**Monocart**](https://github.com/cenfun/monocart-reporter) test reporter support.
> - The project was created for a [QA Wolf](https://www.qawolf.com/) take home [assignment](https://www.task-wolf.com/apply-qae).
> - Original QA Wolf [assignment README](QAWOLFREADME.md).


### Key Features:

- Navigates to https://news.ycombinator.com/newest
- Collects exactly 100 articles by paginating through "More" links as needed 
- Extracts timestamps from each article's age element 
- Validates that all articles are sorted from newest to oldest chronologically 
- Provides detailed error reporting if sorting violations are found 
- CI/CD Integration for [GitHub workflow support](https://github.com/badj/HackerNewsTop100SortingPlaywrightTest/actions) executing tests in [Docker](https://www.docker.com/) with GitHub Actions triggered on push/pull requests to main and for daily scheduled runs:
  - [![Playwright Tests in Docker](https://github.com/badj/HackerNewsTop100SortingPlaywrightTest/actions/workflows/main.yml/badge.svg)](https://github.com/badj/HackerNewsTop100SortingPlaywrightTest/actions/workflows/main.yml)

### To run this test:


1. Clone or Download
    - Clone this repository: `git clone https://github.com/badj/HackerNewsTop100SortingPlaywrightTest.git`
    - Alternatively, download the ZIP file and extract it.

2. Navigate to Project Directory:

   ```bash
   cd HackerNewsTop100SortingPlaywrightTest
   ```
3. Initialise a Node.js project

   ```bash
   npm init -y
   ```
4. Install node modules by running 

    ```bash
    npm i
    ```

5. Install Playwright
   ```bash
   npm i -D @playwright/test
   ```
6. Install browsers
   ```bash
   npx playwright install
   ```
   
7. Run the test:

    ```bash
    npx playwright test     
    ```

**Sample output for a passing test run:**

```terminaloutput
Running 1 test using 1 worker
[chromium] › tests/hackernews.spec.js:4:9 › Hacker News Article Sorting › should have first 100 articles sorted from newest to oldest
Scraping page 1, collected 0 articles so far...
Scraping page 2, collected 30 articles so far...
Scraping page 3, collected 60 articles so far...
Scraping page 4, collected 90 articles so far...

Collected 100 articles
First article: 1 minute ago (2025-11-25T06:11:44 1764051104)
Last article: 3 hours ago (2025-11-25T02:27:15 1764037635)

✅ All 100 articles are correctly sorted from newest to oldest
  1 passed (7.5s)
[MR] generating report data ...
[MR] generating test report ...
[MR] Playwright POC Test Report
┌─────────────┬────────────────────────┐
│ Tests       │ 1                      │
│ ├ Failed    │ 0 (0.0%)               │
│ ├ Flaky     │ 0 (0.0%)               │
│ ├ Skipped   │ 0 (0.0%)               │
│ └ Passed    │ 1 (100.0%)             │
│ Steps       │ 130                    │
│ Suites      │ 1                      │
│ ├ Projects  │ 1                      │
│ ├ Files     │ 1                      │
│ ├ Describes │ 1                      │
│ └ Shards    │ 0                      │
│ Errors      │ 0                      │
│ Retries     │ 0                      │
│ Logs        │ 8                      │
│ Attachments │ 3                      │
│ Artifacts   │ 0                      │
│ Playwright  │ v1.56.1                │
│ Date        │ 11/25/2025, 7:14:03 PM │
│ Duration    │ 7.5s                   │
└─────────────┴────────────────────────┘
[MR] json: monocart-report/index.json
[MR] view report: npx monocart show-report monocart-report/index.html

To open last HTML report run:

  npx playwright show-report
```

8. View the default built in HTML test results report in the browser:

    ```bash
    npx playwright show-report
    ```
9. View the Monocart test results report in the browser:

    ```bash
    npx monocart show-report monocart-report/index.html
    ```
