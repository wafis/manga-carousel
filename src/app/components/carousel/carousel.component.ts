import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { MangaService } from 'src/app/services/manga.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
  coverList: Observable<string[]> = of([]);
  step = 0;
  constructor(private mangaService: MangaService) {}

  ngOnInit(): void {
    // this.mangaService.getMangaList().subscribe((m) => console.log(m));
    this.coverList = this.mangaService.getMangaCovers();
  }

  onUploadClicked(): void {}

  onFileUpload(event: any): void {
    const file: File = event.target.files[0];
  }

  incrementStep(): void {
    this.step++;
  }
  decrementStep(): void {
    this.step--;
  }
}
