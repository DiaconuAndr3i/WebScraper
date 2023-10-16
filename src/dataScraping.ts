export class DataScraping{
    constructor(private title: string, private short_description: string){
        this.title = title;
        this.short_description = short_description;
    }

    get getTitle(){
        return this.title;
    }

    get getShortDescription(){
        return this.short_description;
    }
}