import Trip from "../trip/Trip";

export default class User {
    private trips: Trip[] = [];
    private readonly friends: User[] = [];

    constructor(friends?: User[]) {
        if (friends) {
            this.friends = friends;
        }
    }

    public getFriends(): User[] {
        return this.friends;
    }

    public addFriend(user: User): void {
        this.friends.push(user);
    }

    public addTrip(trip: Trip): void {
        this.trips.push(trip);
    }

    public getTrips(): Trip[] {
        return this.trips;
    }

    public isFriendOf(other: User): boolean {
        return other.hasFriend(this);
    }

    public hasFriend(other: User) {
        return this.friends.findIndex((friend) => friend === other) > -1;
    }

}
