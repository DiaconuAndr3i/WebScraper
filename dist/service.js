"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrapeBrowser = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const dataScraping_1 = require("./dataScraping");
const scrapeBrowser = (url) => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield puppeteer_1.default.launch();
    const page = yield browser.newPage();
    yield page.goto(url, { waitUntil: 'networkidle2' });
    const titleElements = [];
    const data = yield page.$$eval('body > div > main > div > div > div:nth-child(2) > div', nodes => nodes.map(n => {
        const element = n.querySelector("div > div:nth-child(2)");
        let title = '';
        let description = '';
        let link = '';
        if (element) {
            const titleElement = element.querySelector('div:nth-child(1) > a');
            const descriptionElement = element.querySelector('div:nth-child(2) > div:nth-child(2) > div:nth-child(2)');
            title = titleElement ? titleElement.textContent || '' : '';
            description = descriptionElement ? descriptionElement.textContent || '' : '';
            link = titleElement ? titleElement.href : '';
        }
        return { title, description, link };
    }));
    const scrapedDataArray = [];
    for (const item of data) {
        yield page.goto(item.link, { waitUntil: 'networkidle2' });
        const img = yield page.$eval("img", el => el.src);
        const longDescription = yield page.$eval("body > div > div > div > div > div:nth-child(2) > div:nth-child(1) > div:nth-child(3) > div:nth-child(2)", el => el ? el.textContent || '' : '');
        //const allContent = await page.$eval("body > div", el => el ? el.textContent || '' : '')
        const textContent = yield page.evaluate(() => {
            function getTextWithSpaces(node) {
                let text = '';
                node.childNodes.forEach(child => {
                    if (child.nodeType === Node.TEXT_NODE) {
                        text += child.textContent;
                    }
                    else if (child.nodeType === Node.ELEMENT_NODE) {
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
        scrapedDataArray.push(new dataScraping_1.DataScraping(item.title, item.description, item.link, img, longDescription, cleanedTextContent, wordCount));
    }
    yield browser.close();
    return scrapedDataArray;
});
exports.scrapeBrowser = scrapeBrowser;
