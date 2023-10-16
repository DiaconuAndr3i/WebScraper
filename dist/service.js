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
    const data = yield page.$$eval('body > div > main > div > div > div:nth-child(2) > div', nodes => nodes.map(n => {
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
    const scrapedDataArray = data.map(item => new dataScraping_1.DataScraping(item.title, item.description));
    yield browser.close();
    return scrapedDataArray;
});
exports.scrapeBrowser = scrapeBrowser;
