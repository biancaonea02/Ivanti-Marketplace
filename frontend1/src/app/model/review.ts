export class Review {
    public id: number;
    public userId: number;
    public packageId: number;
    public rating: number;

    constructor(userId: number, packageId: number, rating: number) {
        this.userId = userId;
        this.packageId = packageId;
        this.rating = rating;
    }
}