import { Injectable } from '@angular/core';
import { time } from 'highcharts';
import { BehaviorSubject, Subject } from 'rxjs';
import { Observable, forkJoin } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

export class TimeSeries {
  type: string = 'area';
  name: string = 'countryname';
  data: any;
}

export class TSData {
  country: string;
  sector: string;
  year: number;
  pattern?: string;
  data: any;
}
export class TSDataRequest {
  country: string[];
  sector: string;
  year: string;
}
@Injectable({
  providedIn: 'root',
})
export class BackendService {
  timeseries: BehaviorSubject<TSData[]> = new BehaviorSubject<TSData[]>([]);
  url: string = '/rest';

  constructor(private http: HttpClient) {}
  //https://www.tektutorialshub.com/angular/angular-pass-url-parameters-query-strings/
  getParams(req: TSDataRequest) {
    return new HttpParams({
      fromObject: {
        ...req,
      },
    });
  }
  getTimeseries() {
    return this.timeseries;
  }
  setTimeseries(data: TSData[]) {
    console.log("set",data)
    this.timeseries.next(data);
  }
  /**
   *
   * @param req
   * https://coryrylan.com/blog/angular-multiple-http-requests-with-rxjs#:~:text=The%20forkJoin()%20operator%20allows,the%20Observables%20in%20the%20list.
   */
  getTimeseriesFromBackend(req: TSDataRequest): Observable<any> {
    let collectObservables = [];
    if (req.country) {
      for (let c of req.country) {
        let params = new HttpParams({
          fromObject: {
            country: c,
            sector: req.sector,
            year: req.year,
          },
        });
        collectObservables.push(
          this.http.get<TSData>(this.url + '/data', { params })
        );
      }
      return forkJoin(collectObservables); //collect multiple http reqs
    } else {
      return null;
    }
  }

  sendTestReq() {
    return this.http.get(this.url + '/test');
  }
}
