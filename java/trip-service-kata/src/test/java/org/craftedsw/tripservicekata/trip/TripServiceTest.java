package org.craftedsw.tripservicekata.trip;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.util.List;
import org.craftedsw.tripservicekata.exception.UserNotLoggedInException;
import org.craftedsw.tripservicekata.user.User;
import org.craftedsw.tripservicekata.user.UserSession;
import org.junit.jupiter.api.Test;

class TripServiceTest {

  private UserSession userSession = mock(UserSession.class);

  private TripService tripService = new TripService(userSession);

  @Test
  void shouldThrowIfUserIsAnonymous() {
    when(userSession.getLoggedUser()).thenReturn(null);

    assertThrows(UserNotLoggedInException.class,
        () -> tripService.getTripsByUser(new User()));
  }

  @Test
  void shouldReturnAnEmptyListIfTargetUserHasNoFriend() {
    when(userSession.getLoggedUser()).thenReturn(new User());

    List<Trip> trips = tripService.getTripsByUser(new User());

    assertTrue(trips.isEmpty());
  }

  @Test
  void shouldReturnAnEmptyListIfNotAFriend() {
    when(userSession.getLoggedUser()).thenReturn(new User());
    User targetUser = new User();
    targetUser.addFriend(new User());
    targetUser.addFriend(new User());

    List<Trip> trips = tripService.getTripsByUser(targetUser);

    assertTrue(trips.isEmpty());
  }
}
