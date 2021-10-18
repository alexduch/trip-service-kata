import "jest";
import UserNotLoggedInException from "../src/exception/UserNotLoggedInException";
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
});
