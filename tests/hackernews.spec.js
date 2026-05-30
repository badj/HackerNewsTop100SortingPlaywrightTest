import { test, expect } from '@playwright/test';
test.describe('Hacker News Article Sorting', () => {
    test('should have first 100 articles sorted from newest to oldest', async ({ page }) => {

        // Navigate to Hacker News newest page
        await page.goto('https://news.ycombinator.com/newest');

        // Wait for the page to load
        await page.waitForSelector('.athing');

        const articles = [];
        let currentPage = 1;

        // Collect articles until we have at least 100
        while (articles.length < 100) {
            console.log(`🏴‍☠️.... Scraping page ${currentPage}, collected ${articles.length} articles so far...`);

            // Get all article rows on the current page
            const pageArticles = await page.$$eval('.athing', (rows) => {
                return rows.map(row => {
                    const id = row.getAttribute('id');
                    return { id };
                });
            });

            // Get timestamps for these articles
            for (const article of pageArticles) {
                if (articles.length >= 100) break;

                // Find the age element for this article using XPath to avoid CSS selector issues
                // const ageElement = await page.$(`#${article.id} + tr .age`);
                const ageElement = await page.locator(`xpath=//tr[@id='${article.id}']/following-sibling::tr[1]//span[@class='age']`).first();

                if (await ageElement.count() > 0) {
                    const ageTitle = await ageElement.getAttribute('title');
                    const ageText = await ageElement.textContent();

                    articles.push({
                        id: article.id,
                        timestamp: ageTitle, // ISO format timestamp
                        ageText: ageText.trim()
                    });
                }
            }

            // Click the "More" link to load more articles
            if (articles.length < 100) {
                const moreLink = await page.$('a.morelink');
                if (moreLink) {
                    await moreLink.click();
                    await page.waitForSelector('.athing');
                    await page.waitForLoadState('domcontentloaded');
                    currentPage++;
                } else {
                    console.warn(`Only found ${articles.length} articles before running out of pages`);
                    break;
                }
            }
        }

        // Trim to exactly 100 articles
        const first100Articles = articles.slice(0, 100);

        console.log(`\nCollected ${first100Articles.length} articles`);
        console.log(`First article: ${first100Articles[0].ageText} (${first100Articles[0].timestamp})`);
        console.log(`Last article: ${first100Articles[first100Articles.length - 1].ageText} (${first100Articles[first100Articles.length - 1].timestamp})`);

        // Verify we have exactly 100 articles
        expect(first100Articles.length).toBe(100);

        // Verify sorting: newest to oldest (timestamps should be descending)
        let sortingErrors = [];

        for (let i = 0; i < first100Articles.length - 1; i++) {
            const current = new Date(first100Articles[i].timestamp);
            const next = new Date(first100Articles[i + 1].timestamp);

            // The current article should be newer (greater timestamp) than the next article
            if (current < next) {
                sortingErrors.push({
                    position: i + 1,
                    currentArticle: {
                        id: first100Articles[i].id,
                        age: first100Articles[i].ageText,
                        timestamp: first100Articles[i].timestamp
                    },
                    nextArticle: {
                        id: first100Articles[i + 1].id,
                        age: first100Articles[i + 1].ageText,
                        timestamp: first100Articles[i + 1].timestamp
                    }
                });
            }
        }

        // Report any sorting errors
        if (sortingErrors.length > 0) {
            console.error('\n❌ SORTING ERRORS FOUND:');
            sortingErrors.forEach(error => {
                console.error(`\nPosition ${error.position} -> ${error.position + 1}:`);
                console.error(`  Article ${error.currentArticle.id}: ${error.currentArticle.age} (${error.currentArticle.timestamp})`);
                console.error(`  Article ${error.nextArticle.id}: ${error.nextArticle.age} (${error.nextArticle.timestamp})`);
                console.error(`  ⚠️  Older article appears before newer article!`);
            });

            expect(sortingErrors.length).toBe(0);
        } else {
            console.log('\n✅ All 100 articles are correctly sorted from newest to oldest');
        }
    });
});
