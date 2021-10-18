import UserNotLoggedInException from "../exception/UserNotLoggedInException";
import User from "./User";
import UserSession from "./UserSession";

export default class UserService {
    
    public loggedUser(): User {
        const loggedUser: User = UserSession.getLoggedUser();
        if (loggedUser == null) {
            throw new UserNotLoggedInException();
        }
        return loggedUser;
    }
}
