import { RequestHandler } from "express";

import { scrapeBrowser } from "./service";

export const scrapeFunction: RequestHandler = async (req, res, next) => {
    const url = (req.body as {url: string}).url;

    const data = await scrapeBrowser(url);

    res.status(200).json(data);
}