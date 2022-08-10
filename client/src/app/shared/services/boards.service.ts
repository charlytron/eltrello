import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { BoardInterface } from "../types/board.interface";
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BoardsService {
  constructor(private http: HttpClient) {}

  getBoards(): Observable<BoardInterface[]> {
    const url = environment.apiUrl + '/boards';
    return this.http.get<BoardInterface[]>(url);
  }

  createBoard(title: string): Observable<BoardInterface> {
    const url = environment.apiUrl + '/boards';
    return this.http.post<BoardInterface>(url, { title });
  }
}