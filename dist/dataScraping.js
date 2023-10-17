"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataScraping = void 0;
class DataScraping {
    constructor(title, short_description, linkToPost, linkImage, longDescription, allContent, words) {
        this.title = title;
        this.short_description = short_description;
        this.linkToPost = linkToPost;
        this.linkImage = linkImage;
        this.longDescription = longDescription;
        this.allContent = allContent;
        this.words = words;
        this.title = title;
        this.short_description = short_description;
        this.linkToPost = linkToPost;
        this.linkImage = linkImage;
        this.longDescription = longDescription;
        this.allContent = allContent;
        this.words = words;
    }
    get getTitle() {
        return this.title;
    }
    get getShortDescription() {
        return this.short_description;
    }
    get getLinkToPost() {
        return this.linkToPost;
    }
    get getLinkImage() {
        return this.linkImage;
    }
    get getLongDescription() {
        return this.longDescription;
    }
    get getAllContent() {
        return this.allContent;
    }
    get getWords() {
        return this.words;
    }
}
exports.DataScraping = DataScraping;
