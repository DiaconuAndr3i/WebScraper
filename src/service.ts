import puppeteer from "puppeteer";
import { DataScraping } from "./dataScraping";
import fs from 'fs';

// Load the lists of positive and negative words
const positiveWords = new Set(fs.readFileSync('./src/positive.txt', 'utf-8').split('\r\n'));
const negativeWords = new Set(fs.readFileSync('./src/negative.txt', 'utf-8').split('\r\n'));

export const scrapeBrowser = async (url: string): Promise<DataScraping[] | undefined> => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle2' });

        // Extract the necessary data from the page
        const data = await page.$$eval('body > div > main > div > div > div:nth-child(2) > div', nodes => nodes.map(n => {
            const element = n.querySelector("div > div:nth-child(2)");
            let title = '';
            let description = '';
            let link = '';
            if (element) {
                const titleElement = element.querySelector('div:nth-child(1) > a') as HTMLAnchorElement;
                const descriptionElement = element.querySelector('div:nth-child(2) > div:nth-child(2) > div:nth-child(2)');
                title = titleElement ? titleElement.textContent || '' : '';
                description = descriptionElement ? descriptionElement.textContent || '' : '';
                link = titleElement ? titleElement.href : '';
            }
            return { title, description, link };
        }));

        const scrapedDataArray: DataScraping[] = [];
        for (const item of data) {
            await page.goto(item.link, { waitUntil: 'networkidle2' });
            const img = await page.$eval("img", el => el.src);
            const longDescription = await page.$eval("body > div > div > div > div > div:nth-child(2) > div:nth-child(1) > div:nth-child(3) > div:nth-child(2)", 
            el => el ? el.textContent || '' : '');

            // Extract all text within the 'body > div' element
            const textContent = await page.evaluate(() => {
                function getTextWithSpaces(node: Node): string {
                    let text = '';
                    node.childNodes.forEach(child => {
                        if (child.nodeType === Node.TEXT_NODE) {
                            text += child.textContent;
                        } else if (child.nodeType === Node.ELEMENT_NODE) {
                            text += ' ' + getTextWithSpaces(child) + ' ';
                        }
                    });
                    return text;
                }
                const divElement = document.querySelector('body > div');
                return divElement ? getTextWithSpaces(divElement) : '';
            });

            // Clean up the extracted text
            const cleanedTextContent = textContent.replace(/\s+/g, ' ');

            // Analyze the sentiment of the cleaned text
            const sentiment = analyzeSentiment(cleanedTextContent);

            // Count the number of words in the cleaned text
            const wordCount = cleanedTextContent.split(' ').length;

            // Add the scraped data to the array
            scrapedDataArray.push(new DataScraping(item.title, item.description, 
                item.link, img, longDescription, cleanedTextContent, wordCount, sentiment));
        }

        await browser.close();

        return scrapedDataArray;
    } catch (error) {
        console.error(`Failed to scrape data from ${url}:`, error);
        return;
    }
}

function analyzeSentiment(text: string): string{
    // Split the text into words and convert to lowercase
    const words = text.toLowerCase().split(' ');
    let positiveCount = 0;
    let negativeCount = 0;

    // Count the number of positive and negative words
    for (const word of words) {
        if (positiveWords.has(word)) {
            positiveCount++;
        } else if (negativeWords.has(word)) {
            negativeCount++;
        }
    }

    // Determine the overall sentiment
    if (positiveCount > negativeCount) {
        return 'Positive';
    } else if (negativeCount > positiveCount) {
        return 'Negative';
    } else {
        return 'Neutral';
    }
}
