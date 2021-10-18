import "jest";
import UserNotLoggedInException from "../src/exception/UserNotLoggedInException";
import Trip from "../src/trip/Trip";
import TripDAO from "../src/trip/TripDAO";
import TripRepository from "../src/trip/TripRepository";
import TripService from "../src/trip/TripService";
import User from "../src/user/User";
import UserService from "../src/user/UserService";
import UserSession from "../src/user/UserSession";
import spyOn = jest.spyOn;

describe("TripService should", () => {

    const tripService = new TripService(new UserService(), new TripRepository());
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

    it("return an empty list when given user has no friend", () => {
        const bob = new User();

        spyOn(UserSession, "getLoggedUser").mockReturnValue(alice);

        expect(tripService.getTripsByUser(bob))
            .toEqual([]);
    });

    it("return an empty list when logged user not in friends list", () => {
        const bob = new User([new User(), new User()]);

        spyOn(UserSession, "getLoggedUser").mockReturnValue(alice);

        expect(tripService.getTripsByUser(bob))
            .toEqual([]);
    });

    it("return a trip list when logged user is in friends list", () => {
        const mark = new User([new User(), alice]);
        const roma = new Trip();
        const paris = new Trip();

        spyOn(UserSession, "getLoggedUser").mockReturnValue(alice);
        spyOn(TripDAO, "findTripsByUser").mockReturnValue([roma, paris]);

        expect(tripService.getTripsByUser(mark))
            .toEqual([roma, paris]);
    });
});
