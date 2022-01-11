import { Injectable } from '@angular/core';
import { HttpserviceService } from 'src/app/services/httpservice.service';
@Injectable({
  providedIn: 'root',
})
export class DemoPageService {
  constructor(public http: HttpserviceService) {}

  getData(id, params) {
    return this.http.httpGet(`/location/grid/id/${id}`, params);
  }
}
