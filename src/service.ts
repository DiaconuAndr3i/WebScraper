import puppeteer from "puppeteer";
import { DataScraping } from "./dataScraping";

export const scrapeBrowser = async (url: string): Promise<DataScraping[]> => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    const titleElements: Element[] | any = []
    
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

    const scrapedDataArray = [];
    for (const item of data) {
        await page.goto(item.link, { waitUntil: 'networkidle2' });
        const img = await page.$eval("img", el => el.src);
        const longDescription = await page.$eval("body > div > div > div > div > div:nth-child(2) > div:nth-child(1) > div:nth-child(3) > div:nth-child(2)", 
        el => el ? el.textContent || '' : '');
        //const allContent = await page.$eval("body > div", el => el ? el.textContent || '' : '')

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

        const cleanedTextContent = textContent.replace(/\s+/g, ' ');

        const wordCount = cleanedTextContent.split(' ').length;

        scrapedDataArray.push(new DataScraping(item.title, item.description, item.link, img, longDescription, cleanedTextContent, wordCount));
    }

    await browser.close();

    return scrapedDataArray;
}