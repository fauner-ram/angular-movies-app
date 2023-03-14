import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from '../../interfaces/movies-response';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  public img = '../assets/unsplash.jpg';
  public movihome : Movie[]=[];

  constructor( private moviesServices : MoviesService, private router : Router ){}

  ngOnInit(): void {
    this.moviesServices.getMovies().subscribe( resp => {
      this.movihome = resp;
    })
  }
 
  onMovieClick( movieposter: Movie ){
    this.router.navigate(['/movies', movieposter.id]);
  }

  more( ){
    this.moviesServices.getMovies().subscribe( resp => {
      this.movihome.push(...resp)
    }); 

  }


}