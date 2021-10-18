import User from "../user/User";
import UserService from "../user/UserService";
import Trip from "./Trip";
import TripDAO from "./TripDAO";

export default class TripService {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    public getTripsByUser(user: User): Trip[] {
        if (this.currentUserCanViewTripsOf(user)) {
            return TripDAO.findTripsByUser(user);
        } else {
            return [];
        }
    }

    public currentUserCanViewTripsOf(user): boolean {
        return this.userService.loggedUser().isFriendOf(user);
    }
}
