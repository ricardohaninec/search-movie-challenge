import { BaseModel } from './base.model';

export class Movie extends BaseModel {

    public genre: [];
    public cast: [];
    public title: string;
    public releaseDate: string;
    public length: string;
    public director: string;
    public certification: string;
    public rating: number;
    public plot: number;
    public __v: number;
    public ratingPercentage: string;


    constructor(data?: any) {
        super(data);
        if (data) {
            this.genre = data.genre;
            this.cast = data.cast;
            this.title = data.title;
            this.releaseDate = data.releaseDate;
            this.director = data.director;
            this.length = data.length;
            this.certification = data.certification;
            this.rating = data.rating;
            this.ratingPercentage = `${(data.rating / 5 * 100).toFixed(2)}%`;
            this.plot = data.plot;
            this.__v = data.__v;
        }
    }
}
