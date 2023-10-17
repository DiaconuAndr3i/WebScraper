export class DataScraping{
    constructor(private title: string, private short_description: string,
        private linkToPost: string,
        private linkImage: string,
        private longDescription: string,
        private allContent: string,
        private words: number,
        private sentiment: string){
        this.title = title;
        this.short_description = short_description;
        this.linkToPost = linkToPost;
        this.linkImage = linkImage;
        this.longDescription = longDescription;
        this.allContent = allContent;
        this.words = words;
        this.sentiment = sentiment;
    }

    get getTitle(){
        return this.title;
    }

    get getShortDescription(){
        return this.short_description;
    }

    get getLinkToPost(){
        return this.linkToPost;
    }

    get getLinkImage(){
        return this.linkImage;
    }

    get getLongDescription(){
        return this.longDescription;
    }

    get getAllContent(){
        return this.allContent;
    }

    get getWords(){
        return this.words;
    }

    get getSentiment(){
        return this.sentiment;
    }
}