import { Creator } from '../model/creator';
import { SystemRequirements } from './systemRequirements';
import { PackageVersion } from './version';

export class Package {
    public id: number;
    public title: String;
    public creator: Creator;
    public intro: String;
    public description: string;
    public systemRequirements: SystemRequirements;
    public versions: PackageVersion[];

    constructor(title: String, creator: Creator, intro: String, systemRequirements: SystemRequirements) {
        this.title = title;
        this.creator = creator;
        this.intro = intro;
        this.systemRequirements = systemRequirements;
        this.versions = new Array();
    }
}