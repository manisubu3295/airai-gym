
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shareReplay, map, Observable } from 'rxjs';

export interface Plan{ id:string; name:string; priceMonthly:number; priceYearly:number; features:string[]; popular:boolean; }

@Injectable({ providedIn: 'root' })
export class PlansService {
  private plans$ = this.http.get<Plan[]>('/assets/data/plans.json').pipe(shareReplay(1));
  constructor(private http: HttpClient) {}
  all(): Observable<Plan[]> { return this.plans$; }
  byId(id:string){ return this.plans$.pipe(map(list => list.find(p => p.id===id))); }
}
