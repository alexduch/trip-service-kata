import "jest";
import UserNotLoggedInException from "../src/exception/UserNotLoggedInException";
import Trip from "../src/trip/Trip";
import TripDAO from "../src/trip/TripDAO";
import TripService from "../src/trip/TripService";
import User from "../src/user/User";
import UserSession from "../src/user/UserSession";
import spyOn = jest.spyOn;

describe("TripService should", () => {

    const tripService = new TripService();
    const loggedUser: User = new User();

    it("throw if user not logged in", () => {
        spyOn(UserSession, "getLoggedUser").mockReturnValue(null);

        expect(() => tripService.getTripsByUser(new User()))
            .toThrow(UserNotLoggedInException);
    });

    it("return an empty list when no friend", () => {
        spyOn(UserSession, "getLoggedUser").mockReturnValue(new User());

        expect(tripService.getTripsByUser(new User()))
            .toEqual([]);
    });

    it("return an empty list when user not in friends list", () => {
        const inputUser = new User();
        inputUser.addFriend(new User());
        inputUser.addFriend(new User());

        spyOn(UserSession, "getLoggedUser").mockReturnValue(new User());

        expect(tripService.getTripsByUser(new User()))
            .toEqual([]);
    });

    it("return a trip list when user is in friends list", () => {
        const inputUser = new User();
        inputUser.addFriend(new User());
        inputUser.addFriend(loggedUser);

        spyOn(UserSession, "getLoggedUser").mockReturnValue(loggedUser);
        spyOn(TripDAO, "findTripsByUser").mockReturnValue([new Trip(), new Trip()]);

        expect(tripService.getTripsByUser(inputUser))
            .toHaveLength(2);
    });
});
