package org.craftedsw.tripservicekata.trip;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

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
}
