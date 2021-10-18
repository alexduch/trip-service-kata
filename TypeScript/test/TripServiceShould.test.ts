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
    const alice: User = new User();

    it("throw if user not logged in", () => {
        spyOn(UserSession, "getLoggedUser").mockReturnValue(null);

        expect(() => tripService.getTripsByUser(new User()))
            .toThrow(UserNotLoggedInException);
    });

    it("return an empty list when no friend", () => {
        spyOn(UserSession, "getLoggedUser").mockReturnValue(alice);

        expect(tripService.getTripsByUser(new User()))
            .toEqual([]);
    });

    it("return an empty list when user not in friends list", () => {
        const bob = new User();
        bob.addFriend(new User());
        bob.addFriend(new User());

        spyOn(UserSession, "getLoggedUser").mockReturnValue(alice);

        expect(tripService.getTripsByUser(new User()))
            .toEqual([]);
    });

    it("return a trip list when user is in friends list", () => {
        const mark = new User();
        mark.addFriend(new User());
        mark.addFriend(alice);

        spyOn(UserSession, "getLoggedUser").mockReturnValue(alice);
        spyOn(TripDAO, "findTripsByUser").mockReturnValue([new Trip(), new Trip()]);

        expect(tripService.getTripsByUser(mark))
            .toHaveLength(2);
    });
});
