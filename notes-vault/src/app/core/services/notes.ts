import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Note } from '../models/note';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  constructor(private http: HttpClient) {

  }
  API_URL = 'http://localhost:8080'

  getNotes(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
    return this.http.get(this.API_URL + '/note' + '/user' + '/notes',
      {
        headers
      }
    );
  }

  createNote(note: { title: string, content: string }): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
    return this.http.post(this.API_URL + '/note', note,
      {
        headers
      },
    );
  }

  deleteNote(noteId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
    return this.http.delete(this.API_URL + '/note' + '/' + noteId, {
      headers
    });
  }

  updateNote(note: Note): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
    return this.http.put(this.API_URL + '/note', note, {
      headers
    });
  }
}
