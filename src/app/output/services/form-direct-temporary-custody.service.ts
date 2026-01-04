import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormDirectTemporaryCustodyService {

  constructor(private http: HttpClient) { }

  public outputTemporaryCustody(outputTemporaryCustody: FormData) {
    return this.http.post(environment.baseApiUrl + 'DirectExitTemporaryCustody', outputTemporaryCustody);
  }

  public outputTemporaryCustodyDraft(outputTemporaryCustodyDraft: FormData) {
    return this.http.post(environment.baseApiUrl + 'DirectExitTemporaryCustody/AsDraft', outputTemporaryCustodyDraft);
  }
}
