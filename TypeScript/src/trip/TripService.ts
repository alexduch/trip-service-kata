import UserNotLoggedInException from "../exception/UserNotLoggedInException";
import User from "../user/User";
import UserSession from "../user/UserSession";
import Trip from "./Trip";
import TripDAO from "./TripDAO";

export default class TripService {
    public getTripsByUser(user: User): Trip[] {
        let tripList: Trip[] = [];
        const isFriend: boolean = this.currentUserCanViewTripsOf(user);

        if (isFriend) {
            tripList = TripDAO.findTripsByUser(user);
        }

        return tripList;
    }

    public currentUserCanViewTripsOf(user): boolean {
        const loggedUser: User = UserSession.getLoggedUser();

        if (loggedUser == null) {
            throw new UserNotLoggedInException();
        }

        for (const friend of user.getFriends()) {
            if (friend === loggedUser) {
                return true;
            }
        }
        return false;
    }
}
