
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shareReplay, map } from 'rxjs';

export interface ClassSchedule { day:string; time:string; trainerId:string; }
export interface GymClass { id:string; name:string; type:string; level:string; duration:number; slots:number; schedule: ClassSchedule[]; }

@Injectable({ providedIn: 'root' })
export class ClassesService {
  private classes$ = this.http.get<GymClass[]>('/assets/data/classes.json').pipe(shareReplay(1));
  constructor(private http: HttpClient) {}
  all(){ return this.classes$; }
  filterBy(criteria: Partial<{ type:string; level:string; trainerId:string }>) {
    return this.classes$.pipe(map(list => list.filter(c =>
      (!criteria.type || c.type === criteria.type) &&
      (!criteria.level || c.level === criteria.level) &&
      (!criteria.trainerId || c.schedule.some(s => s.trainerId === criteria.trainerId))
    )));
  }
}
