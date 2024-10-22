package org.craftedsw.tripservicekata.trip;

import java.util.ArrayList;
import java.util.List;

import org.craftedsw.tripservicekata.exception.UserNotLoggedInException;
import org.craftedsw.tripservicekata.user.User;
import org.craftedsw.tripservicekata.user.UserSession;

public class TripService {

	private final UserSession userSession;
	private final TripRepository tripRepository;

	public TripService() {
		userSession = UserSession.getInstance();
		tripRepository = new TripRepository();
	}

	public TripService(UserSession userSession, TripRepository tripRepository) {
		this.userSession = userSession;
		this.tripRepository = tripRepository;
	}

	public List<Trip> getTripsByUser(User user) throws UserNotLoggedInException {
		List<Trip> tripList = new ArrayList<Trip>();
		User loggedUser = userSession.getLoggedUser();
		boolean isFriend = false;
		if (loggedUser != null) {
			for (User friend : user.getFriends()) {
				if (friend.equals(loggedUser)) {
					isFriend = true;
					break;
				}
			}
			if (isFriend) {
				tripList = tripRepository.findTripByUser(user);
			}
			return tripList;
		} else {
			throw new UserNotLoggedInException();
		}
	}

}
