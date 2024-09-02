import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { MovieService } from '../service.service'; // Güncellenmiş servis ismi
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // NgModel için gerekli

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule] // FormsModule eklemeyi unutmayın
})
export class HomeComponent implements OnInit {
  popularMovies: any[] = [];
  currentSlide = 0;
  transform = '';
  currentCategoryTitle = '';
  currentCategoryMovies: any[] = [];
  searchTerm: string = ''; // Arama terimi
  searchResults: any[] = []; // Arama sonuçları

  constructor(
    private serviceService: MovieService, // Güncellenmiş servis ismi
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    this.getPopularMovies();
    this.loadCategory('now_playing');
    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('resize', this.updateTransform.bind(this));
    }
  }

  getPopularMovies(): void {
    this.serviceService.getPopularMovies().subscribe(response => { // Güncellenmiş servis ismi
      console.log('Popular Movies Response:', response); // Debugging line
      this.popularMovies = response;
      this.updateTransform();
    }, error => {
      console.error('Error fetching popular movies:', error);
    });
  }

  onSearch(): void {
    if (this.searchTerm.trim()) {
      this.router.navigate(['/search'], { queryParams: { query: this.searchTerm } });
    }
  }

  nextSlide(): void {
    if (this.currentSlide < this.popularMovies.length - 10) {
      this.currentSlide++;
    } else {
      this.currentSlide = 0;
    }
    this.updateTransform();
  }

  prevSlide(): void {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    } else {
      this.currentSlide = this.popularMovies.length - 10;
    }
    this.updateTransform();
  }

  updateTransform(): void {
    if (isPlatformBrowser(this.platformId)) {
      const slideWidth = window.innerWidth < 855 ? 200 : 215;
      this.transform = `translateX(-${this.currentSlide * slideWidth}px)`;
    }
  }

  goToDetail(movieId: number): void {
    this.router.navigate(['/movie', movieId]);
  }

  selectCategory(category: string): void {
    this.loadCategory(category);
  }

  loadCategory(category: string): void {
    switch (category) {
      case 'popular':
        this.currentCategoryTitle = 'Popular';
        this.serviceService.getPopularMovies().subscribe(response => { // Güncellenmiş servis ismi
          console.log('Category Movies Response:', response); // Debugging line
          this.currentCategoryMovies = response;
        }, error => {
          console.error('Error fetching category movies:', error);
        });
        break;
      case 'top_rated':
        this.currentCategoryTitle = 'Top Rated';
        this.serviceService.getTopRatedMovies().subscribe(response => { // Güncellenmiş servis ismi
          this.currentCategoryMovies = response;
        }, error => {
          console.error('Error fetching top rated movies:', error);
        });
        break;
      case 'now_playing':
        this.currentCategoryTitle = 'Now Playing';
        this.serviceService.getNowPlayingMovies().subscribe(response => { // Güncellenmiş servis ismi
          this.currentCategoryMovies = response;
        }, error => {
          console.error('Error fetching now playing movies:', error);
        });
        break;
      case 'upcoming':
        this.currentCategoryTitle = 'Upcoming';
        this.serviceService.getUpcomingMovies().subscribe(response => { // Güncellenmiş servis ismi
          this.currentCategoryMovies = response;
        }, error => {
          console.error('Error fetching upcoming movies:', error);
        });
        break;
    }
  }
}
