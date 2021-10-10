import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

import { BaseComponent } from 'src/app/shared/base/base.component';
import { Movie } from 'src/app/shared/models/movie.model';
import { MovieService } from 'src/app/shared/services/movie.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
    selector: `app-home`,
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseComponent implements OnInit {

    public keywordTitle: string = '';
    public keywordYear: string = '';
    public keywordLength: string = '';
    public keywordRating: string = '';
    public directorFilter: string[] = [];
    public selectedCertification: string;
    public isCertificationSearchBoxOpen: boolean = false;
    public isDirectorSearchBoxOpen: boolean = false;
    
    public movies: Movie[] = [];
    public directors: any[] = [];
    public certifications: any[] = [];
    public tableColumns: string[] = [
        'Title',
        'Year',
        'Running Time',
        'Director',
        'Certification',
        'Rating'
    ];
    public selectedItem: string;
    public filteredMovies: Movie[] = [];

    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public movieService: MovieService,
        public dialog: MatDialog
    ) {
        super(router, activatedRoute);

        this.baseUrl = '';
    }

    public ngOnInit(): void {
        super.ngOnInit();
        this.loadMovies();
    }

    public loadMovies() {
        this.isLoading = true;
        this.movieService
            .get()
            .subscribe((response: any) => {
                response.map(item => {
                    this.movies.push(new Movie(item));
                    this.filteredMovies = this.movies;
                    this.movies.forEach(movie => {
                        if (!this.directorFilter.some(item => item === movie.director)) {
                            this.directorFilter.push(movie.director);
                        }

                        if (!this.directors.some(director => director.name === movie.director)) {
                            this.directors.push({
                                name: movie.director,
                                isFlagged: true
                            });
                        }

                        if (!this.certifications.some(certification => certification === movie.certification)) {
                            this.certifications.push(movie.certification);
                        }
                    });
                    this.isLoading = false;
                });
            });
    }

    public search(): void {
        const keywordTitleLowerCase = this.keywordTitle.toLowerCase();
        const keywordYearLowerCase = this.keywordYear.toLowerCase();
        const keywordLengthLowerCase = this.keywordLength.toLowerCase();
        const keywordRatingLowerCase = this.keywordRating.toLowerCase();

        this.filteredMovies = this.movies;

        // Filtering by title
        if (keywordTitleLowerCase) {
            this.filteredMovies = this.filteredMovies.filter(x =>
                x.title.toLowerCase().includes(keywordTitleLowerCase)
            );
        }

        // Filtering by year
        if (keywordYearLowerCase) {
            this.filteredMovies = this.filteredMovies.filter(x =>
                x.releaseDate.toLowerCase().includes(keywordYearLowerCase)
            );
        }

        // Filtering by lenght
        if (keywordLengthLowerCase) {
            this.filteredMovies = this.filteredMovies.filter(x =>
                x.length.toLowerCase().includes(keywordLengthLowerCase)
            );
        }

        // Filtering by rating
        if (keywordRatingLowerCase) {
            this.filteredMovies = this.filteredMovies.filter(x =>
                x.ratingPercentage.toLowerCase().includes(keywordRatingLowerCase)
            );
        }

        // Filtering by director
        this.filteredMovies = this.filteredMovies.filter(item =>
            this.directorFilter && this.directorFilter.find(director =>
                director.includes(item.director))
        );

        // Filtering by certification
        if(this.selectedCertification){
            this.filteredMovies = this.filteredMovies.filter(x =>
                x.certification.includes(this.selectedCertification)
            );
        }
    
    }

    public getCertificationColor(item: string) {
        let style = {};
        switch (item) {
            case '14 Accompaniment':
                style = {
                    'background-color': '#FFCDD2',
                    'color': '#cd393e'

                }
                break;
            case 'CA-PG':
                style = {
                    'background-color': '#FEEDAF',
                    'color': '#895040'
                }
                break;
            default:
                style = {
                    'background-color': '#C8E6C9',
                    'color': '#236134'
                }
        }
        return style;
    }

    public onDirectorSelection(item?: any, shouldSelectAll?: boolean) {
        if (shouldSelectAll) {
            this.directorFilter = [];
            this.directors.forEach((director, index) => {
                this.directorFilter.push(director.name);
                this.directors[index].isFlagged = true;
            });
        }

        if (shouldSelectAll === false) {
            this.directorFilter = [];
            this.directors.forEach((item, index) => {
                this.directors[index].isFlagged = false;
            });
        }

        if (item) {
            if (!this.directorFilter.some(director => director === item.name)) {
                this.directorFilter.push(item.name);
            } else {
                this.directorFilter = this.directorFilter.filter(director => director != item.name);
            }
        }

        // Manage State
        this.search();
    }

    public onCertificationSelection(item) {
        this.isCertificationSearchBoxOpen = false;
        this.selectedCertification = item;
        this.search();
    }


    // Open Dialog to tells about Mobile Dare Experience
    public openDialog(item: Movie): void {
        if(this.selectedItem === item._id){
            this.selectedItem = '';
        }else{
            this.selectedItem = item._id;
        }
        const dialogRef = this.dialog.open(DialogComponent, {
            width: '50vw',
            minWidth: '300px',
            minHeight: '80vh',
            position: { right: `5%`, bottom: `5%` },
            data: item
        });

        dialogRef.afterClosed().subscribe(result => { 
            this.selectedItem = '';
        });
    }

    public clearCertificationFilter(){
        this.isCertificationSearchBoxOpen = false;
        this.selectedCertification = null;
        this.search();
    }

    public closeAllFilterBoxs(){
        console.log('aqui')
    }

};
