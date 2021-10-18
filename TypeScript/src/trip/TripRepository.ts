import User from "../user/User";
import TripDAO from "./TripDAO";

export default class TripRepository {

    public findTripsByUser(user: User) {
        return TripDAO.findTripsByUser(user);
    }
}
