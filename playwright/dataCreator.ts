import {
  createBooking,
  getBookings,
  futureOpenCheckinDate,
  createFutureBookings,
} from "./lib/datafactory/booking";
import { createRoom, createRooms } from "./lib/datafactory/room";

// createRoom("101");
// createRooms(2);
// getBookings(1);
// futureOpenCheckinDate(1);
// createBooking(2, new Date());

createFutureBookings(1, 10);
