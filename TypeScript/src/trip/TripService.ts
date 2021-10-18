import UserNotLoggedInException from "../exception/UserNotLoggedInException";
import User from "../user/User";
import UserSession from "../user/UserSession";
import Trip from "./Trip";
import TripDAO from "./TripDAO";

export default class TripService {
    public getTripsByUser(user: User): Trip[] {
        let tripList: Trip[] = [];

        if (this.currentUserCanViewTripsOf(user)) {
            tripList = TripDAO.findTripsByUser(user);
        }

        return tripList;
    }

    public currentUserCanViewTripsOf(user): boolean {
        return this.getLoggedUser().isFriendOf(user);
    }

    private getLoggedUser() {
        const loggedUser: User = UserSession.getLoggedUser();
        if (loggedUser == null) {
            throw new UserNotLoggedInException();
        }
        return loggedUser;
    }
}
