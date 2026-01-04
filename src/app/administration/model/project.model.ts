class Project {
   id: number;
   description: string;
   initials: string;
   active: boolean;
   activeText: string;
   branchOffice: { id: number, description: string };

   constructor() {
      this.id = null;
      this.description = '';
      this.initials = '';
      this.branchOffice = { id: null, description: '' };
      this.active = null;
   } 
}

class ProjectRequest {
   description: string;
   initials: string;
   branchOfficeId: number;
   active: boolean;

   constructor() {
      this.description = '';
      this.initials = '';
      this.branchOfficeId = null;
      this.active = null;
   } 
}

export { Project, ProjectRequest };