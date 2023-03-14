// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class MoviesService {

//   constructor() { }
// }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Movie, MovieResponse } from '../interfaces/movies-response';
import { DetailsResponse } from '../interfaces/details-response';
import { Cast, CreditsResponse } from '../interfaces/credits-response';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private URL : string = 'https://api.themoviedb.org/3';
  private numberPage = 1;
  public load : boolean = false;

  constructor( private http: HttpClient ) { }

  get params(){
    return{
      api_key : '5e89f05c125bbae47c4cf57648fd87be',
      language: 'en-US',
      page    : this.numberPage.toString()
    }
  }

  getMovies(): Observable<Movie[]>{

      if( this.load ){ return of([]); }

      return this.http.get<MovieResponse>(`${ this.URL }/movie/popular`, {
        params: this.params
      }).pipe( map ( resp => resp.results),
               tap( () => {
                this.numberPage +=1;
                this.load = false;
               }))

  }

  getDetails(id:string){
    return this.http.get<DetailsResponse>(`${ this.URL }/movie/${ id }`,{
      params: this.params
    }).pipe(  catchError( err => of(null))   )
  }

  getCredits(id: string):Observable<Cast[]>{
    return this.http.get<CreditsResponse>(`${ this.URL}/movie/${ id }/credits`, {
      params: this.params
    }).pipe(   map( resp => resp.cast),  catchError( err => of([]))   )
  }


}