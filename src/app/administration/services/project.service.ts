import { Injectable } from '@angular/core';
import PaginatedRequest from 'src/app/shared/models/paginatedRequest.model';
import BaseResponse from 'src/app/shared/models/baseResponse.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { Project, ProjectRequest } from '../model/project.model';
import { TokenService } from 'src/app/shared/services/token.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient, private utils: UtilsService, private tokenService: TokenService) { }


  fetchProjects(params: PaginatedRequest, filters = {}) {
    return this.http.get<BaseResponse<Project>>(environment.baseApiUrl + 'project' +
                                                  this.utils.getQueryString({ ...params, ...filters }));
  }

  public newProject(project: ProjectRequest) {
    return this.http.post(environment.baseApiUrl + 'project', project);
  }

  public editProject(project: ProjectRequest, id) {
    return this.http.put(environment.baseApiUrl + 'project/' + id, project);
  }
  
  public deleteProject(id) {
    return this.http.delete(environment.baseApiUrl + 'project/' + id);
  }

  public downloadCSV(filters = {}) {
    window.open(
      environment.baseApiUrl + 'project/projetos.csv' +
      this.utils.getQueryString({ ...filters, token: this.tokenService.getToken() })
    );
  }

}
