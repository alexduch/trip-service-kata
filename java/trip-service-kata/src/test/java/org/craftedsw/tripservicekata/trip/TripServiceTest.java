package org.craftedsw.tripservicekata.trip;

import static java.util.Arrays.asList;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

import java.util.List;
import org.craftedsw.tripservicekata.exception.UserNotLoggedInException;
import org.craftedsw.tripservicekata.user.User;
import org.craftedsw.tripservicekata.user.UserSession;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class TripServiceTest {

  @Mock
  private UserSession userSession;
  @Mock
  private TripRepository tripRepository;

  @InjectMocks
  private TripService tripService;

  @Test
  void shouldThrowIfUserIsAnonymous() {
    when(userSession.getLoggedUser()).thenReturn(null);

    User targetUser = new User();
    assertThrows(UserNotLoggedInException.class,
        () -> tripService.getTripsByUser(targetUser));
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

  @Test
  void shouldReturnTheTripsIfAFriend() {
    User loggedUser = new User();
    when(userSession.getLoggedUser()).thenReturn(loggedUser);
    User targetUser = new User();
    targetUser.addFriend(new User());
    targetUser.addFriend(loggedUser);
    targetUser.addFriend(new User());

    when(tripRepository.findTripByUser(targetUser)).thenReturn(asList(new Trip(), new Trip()));

    List<Trip> trips = tripService.getTripsByUser(targetUser);

    assertEquals(2, trips.size());
  }
}
