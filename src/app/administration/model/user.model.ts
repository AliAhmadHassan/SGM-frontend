import { Association } from './association.model';

export class User {
    id: number;
    name: string;
    email: string;
    active: boolean;
    activeText: string;
    profileInstallation: [{ installationId: number, installationName: string, profileId: number, profileName: string }];
    nameInstallations: string;

    constructor() {
        this.id = null;
        this.name = '';
        this.active = null;
        this.activeText = '';
        this.profileInstallation = [{ installationId: null, installationName: '', profileId: null, profileName: '' }];
        this.nameInstallations = '';
    }
}

export class UserRequest {
    name: string;
    active: boolean;
    email: string;
    associations: Association[];

    constructor() {
        this.name = '';
        this.email = '';
        this.active = true;
        this.associations = [new Association];
    }
}

export class UserAD{
    name: string;
    email: string;

    constructor(){
        this.name = '';
        this.email = '';
    }
}
