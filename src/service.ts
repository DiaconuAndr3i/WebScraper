import puppeteer from "puppeteer";
import { DataScraping } from "./dataScraping";

export const scrapeBrowser = async (url: string): Promise<DataScraping[]> => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });
    
    const data = await page.$$eval('body > div > main > div > div > div:nth-child(2) > div', nodes => nodes.map(n => {
        const element = n.querySelector("div > div:nth-child(2)");
        let title = '';
        let description = '';
        if (element) {
            const titleElement = element.querySelector('div:nth-child(1) > a');
            const descriptionElement = element.querySelector('div:nth-child(2) > div:nth-child(2) > div:nth-child(2)');
            title = titleElement ? titleElement.textContent || '' : '';
            description = descriptionElement ? descriptionElement.textContent || '' : '';
        }
        return { title, description };
    }));
    
    const scrapedDataArray = data.map(item => new DataScraping(item.title, item.description));
    

    await browser.close();

    return scrapedDataArray;
}