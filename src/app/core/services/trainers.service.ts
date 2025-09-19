
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shareReplay, map } from 'rxjs';

export interface Trainer { id:string; name:string; photo:string; bio:string; certs:string[]; specialties:string[]; social?:{ instagram?:string }; }

@Injectable({ providedIn: 'root' })
export class TrainersService {
  private trainers$ = this.http.get<Trainer[]>('/assets/data/trainers.json').pipe(shareReplay(1));
  constructor(private http: HttpClient) {}
  all(){ return this.trainers$; }
  byId(id:string){ return this.trainers$.pipe(map(list => list.find(t => t.id===id))); }
}
