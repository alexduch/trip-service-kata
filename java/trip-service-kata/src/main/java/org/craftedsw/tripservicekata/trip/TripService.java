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
		User loggedUser = authenticate();

		List<Trip> tripList = new ArrayList<>();
    if (user.isFriend(loggedUser)) {
      tripList = tripRepository.findTripByUser(user);
    }
    return tripList;
  }

	private User authenticate() {
		User loggedUser = userSession.getLoggedUser();
		if (loggedUser == null) {
			throw new UserNotLoggedInException();
		}
		return loggedUser;
	}

}
