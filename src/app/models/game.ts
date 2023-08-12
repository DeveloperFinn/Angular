export class Game {
    public name: String;
    public releaseDate: Date;
    public description: String;
    public price: Number;
    constructor(name: string, releaseDate: Date, description: string, price: number) {
        this.name = name;
        this.releaseDate = releaseDate;
        this.description = description;
        this.price = price;
    }
    toString() {
        return this.name + ', ' + this.releaseDate + ', ' + this.description + ', '+ this.price;
    }
}
