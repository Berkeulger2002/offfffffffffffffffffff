import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../service.service'; // Gerekirse yolu düzenleyin
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class SearchComponent implements OnInit {
  searchResults: any[] = [];

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    private router: Router  // Router'ı buraya ekleyin
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const searchTerm = params['query'];
      if (searchTerm) {
        this.movieService.searchMovies(searchTerm).subscribe(response => {
          console.log('Search Results:', response); // Debugging line
          this.searchResults = response;
        }, error => {
          console.error('Error searching movies:', error);
        });
      }
    });
  }

  goToMovieDetail(movieId: number): void {
    this.router.navigate(['/movie', movieId]); // Filmin detay sayfasına yönlendirme
  }
}
