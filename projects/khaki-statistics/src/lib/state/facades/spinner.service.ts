import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  otherProperty;

  constructor() { }

  spinner(): Observable<boolean> {
    throw new Error('not implemented');
  }
}
