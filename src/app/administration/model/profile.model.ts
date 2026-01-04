class Profile {
    id: number
    name: string;
    description: string;
    permissions: [number];

    constructor() {
        this.id = null
        this.description = '';
        this.name = '';
        this.permissions = null;
    }
}

class ProfileRequest{
    name: string;
    description: string;
    permissions: [number];

    constructor() {
        this.description = '';
        this.name = '';
        this.permissions = null;
    }
}

export { Profile, ProfileRequest } ;
