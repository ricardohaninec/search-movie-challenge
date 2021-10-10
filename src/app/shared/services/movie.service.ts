import { Injectable, SkipSelf } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseService } from './base.service';
import { Movie } from '../models/movie.model';

@Injectable()
export class MovieService extends BaseService<Movie> {

    serviceName = 'movies/';

    constructor(
        @SkipSelf() protected http: HttpClient) {
        super(http);
    }
}
