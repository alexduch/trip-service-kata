import User from "../user/User";
import UserService from "../user/UserService";
import Trip from "./Trip";
import TripRepository from "./TripRepository";

export default class TripService {
    private userService: UserService;
    private tripRepository: TripRepository;

    constructor(userService: UserService, tripRepository: TripRepository) {
        this.userService = userService;
        this.tripRepository = tripRepository;
    }

    public getTripsByUser(user: User): Trip[] {
        if (this.currentUserCanViewTripsOf(user)) {
            return this.tripRepository.findTripsByUser(user);
        } else {
            return [];
        }
    }

    public currentUserCanViewTripsOf(user): boolean {
        return this.userService.loggedUser().isFriendOf(user);
    }
}
