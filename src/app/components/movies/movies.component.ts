import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { Movie, MovieResponse } from '../../interfaces/movies-response';
import { combineLatest } from 'rxjs';
import { Cast } from '../../interfaces/credits-response';


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  public movies : any={};
  public cast : Cast[]=[];

  constructor( private moviesServices : MoviesService,
               private activatedRoute : ActivatedRoute,
               private router : Router ){}


  ngOnInit(): void {
    const { id } = this.activatedRoute.snapshot.params;

    combineLatest([
      this.moviesServices.getDetails(id),
      this.moviesServices.getCredits(id)
    ]).subscribe( ( [ movie, cas ] ) => { 
      if( !movie ){
        this.router.navigateByUrl('/home');
        return;
      }
      this.movies = movie;
      this.cast = cas.filter( ( actor:any) => actor.profile_path !== null )    
     })

  }


}