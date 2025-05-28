import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GetService {

  hostName: any = config.baseUrl;

  constructor(
    private http: HttpClient
  ) { }

  getProfileData() {
    let url = this.hostName + "/api/user/profile";
    return this.http.get<any>(url);
  }

}
