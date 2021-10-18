import "jest";
import UserNotLoggedInException from "../src/exception/UserNotLoggedInException";
import Trip from "../src/trip/Trip";
import TripDAO from "../src/trip/TripDAO";
import TripService from "../src/trip/TripService";
import User from "../src/user/User";
import UserSession from "../src/user/UserSession";
import spyOn = jest.spyOn;

describe("TripService should", () => {
    it("throw if user not logged in", () => {
        spyOn(UserSession, "getLoggedUser").mockReturnValue(null);

        expect(() => new TripService().getTripsByUser(new User()))
            .toThrow(UserNotLoggedInException);
    });

    it("return an empty list when no friend", () => {
        spyOn(UserSession, "getLoggedUser").mockReturnValue(new User());

        expect(new TripService().getTripsByUser(new User()))
            .toEqual([]);
    });

    it("return an empty list when user not in friends list", () => {
        const inputUser = new User();
        inputUser.addFriend(new User());
        inputUser.addFriend(new User());

        spyOn(UserSession, "getLoggedUser").mockReturnValue(new User());

        expect(new TripService().getTripsByUser(new User()))
            .toEqual([]);
    });

    it("return a trip list when user is in friends list", () => {
        const loggedUser: User = new User();
        const inputUser = new User();
        inputUser.addFriend(new User());
        inputUser.addFriend(loggedUser);

        spyOn(UserSession, "getLoggedUser").mockReturnValue(loggedUser);
        spyOn(TripDAO, "findTripsByUser").mockReturnValue([new Trip(), new Trip()]);

        expect(new TripService().getTripsByUser(inputUser))
            .toHaveLength(2);
    });
});
