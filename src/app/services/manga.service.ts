import { apiUrl, COVER, MANGA } from './api.const';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  concatMap,
  expand,
  forkJoin,
  map,
  mergeMap,
  Observable,
  switchMap,
  take,
  tap,
  zip,
} from 'rxjs';

interface Manga {
  attributes: {
    fileName: string;
  };
  id: string;
  relationships: {
    id: string;
    type: string;
  }[];
  type: string;
}

interface Response {
  data: Manga;
  response: string;
  result: string;
}

@Injectable({ providedIn: 'root' })
export class MangaService {
  constructor(private httpClient: HttpClient) {}

  getMangaList(): Observable<Manga[]> {
    return this.httpClient
      .get<any>(`${apiUrl}/${COVER}/`)
      .pipe(map((response) => response.data));
  }

  getMangaCovers(): Observable<string[]> {
    return this.getMangaList().pipe(
      map((mangaList) => mangaList.map((manga) => manga.id)),
      switchMap((id) => {
        return zip(
          id.map((id) =>
            this.httpClient
              .get<Response>(`${apiUrl}/${COVER}/${id}`)
              .pipe(map((response) => response.data))
          )
        );
      }),
      map((coverList) =>
        coverList.map((cover) => {
          return `https://uploads.mangadex.org/covers/${
            cover.relationships.find(
              (relationship) => relationship.type === 'manga'
            )?.id
          }/${cover.attributes.fileName}.512.jpg`;
        })
      )
    );
  }
}
