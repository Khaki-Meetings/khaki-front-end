import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {delay} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class OranizersStatisticsService {

  constructor() { }

  getOrganizerInfo(): Observable<any> {
    console.log('inside get org info');
    return of({
      name: 'megan',
      city: "BAYTOWN",
      firstName: "KADEEM",
      lastName: "HODGE",
      phoneNumber: "2814287152",
      state: "TX",
      status: "Pending",
      street: "2800 W BAKER RD",
      workOrder: 568292,
      zip: "77521"
    })
      .pipe(
        delay(1000)
      );
    // return this.http.get(`${ServerConfig.API}orders/${workId}`)
    //   .pipe(
    //     map((response: any) => {
    //       return response;
    //     })
    //   );
  }
}
