import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  hostName: any = config.baseUrl;

  constructor(
    private http: HttpClient
  ) { }

  uploadFile(file: FormData) {
    let url = this.hostName + "/api/user/upload";
    return this.http.put<any>(url, file);
  }

  logout() {
    let url = this.hostName + "/api/user/logout";
    return this.http.post<any>(url, {});
  }

}
