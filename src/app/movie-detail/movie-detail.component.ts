import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class MovieDetailComponent implements OnInit {
  movie: any;

  constructor(private route: ActivatedRoute, private movieService: MovieService) {}

  ngOnInit(): void {
    const movieId = +this.route.snapshot.paramMap.get('id')!;
    this.movieService.getMovieDetails(movieId).subscribe(movie => {
      this.movie = movie;
    });
  }
}
