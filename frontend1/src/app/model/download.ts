export class Download {
    public id: number;
    public userId: number;
    public packageId: number;
    public versionName: string;

    constructor(userId: number, packageId: number, rating: number, versionName: string) {
        this.userId = userId;
        this.packageId = packageId;
        this.versionName = versionName;
    }
}