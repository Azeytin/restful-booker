import { expect, request } from "@playwright/test";
import { getAuthToken } from "../datafactory/auth";
import { stringDateByDays } from "../helper/date";
import { Faker, faker } from "@faker-js/faker";

require("dotenv").config();

let bookingUrl = process.env.BOOKING_URL || process.env.URL;
let username = "admin";
let password = "password";
let bookingBody;
let checkOutArray;

async function createBooking(roomId: number, checkinDate) {
  let randBookingLength = faker.datatype.number({ min: 1, max: 4 });
  let randCheckinDelay = faker.datatype.number({ min: 0, max: 2 });
  let token = await getAuthToken(username, password);

  //Adding some randomness into future checkin date (so there are gaps for testing)
  checkinDate.setDate(checkinDate.getDate() + randCheckinDelay);

  let checkInString = checkinDate.toISOString().split("T")[0];

  //Function to get a date random days from checkin date
  let checkOutString = stringDateByDays(checkinDate, randBookingLength);

  console.log("booking length: " + randBookingLength);
  console.log("checkin string: " + checkInString);
  console.log("checkout: " + checkOutString);

  bookingBody = {
    roomid: roomId,
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    depositpaid: true, //Math.random() < 0.5, //returns true or false
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber("###########"),
    bookingdates: {
      checkin: checkInString,
      checkout: checkOutString,
    },
  };

  const createRequestContext = await request.newContext();
  const response = await createRequestContext.post(bookingUrl + "/booking/", {
    headers: {
      Cookie: `token=${token}`,
      "Content-Type": "application/json",
    },
    data: bookingBody,
  });

  expect(response.status()).toBe(201);
  const body = await response.json();
  console.log(body);
  return body;
}

async function getBookings(roomId: number) {
  let token = await getAuthToken(username, password);

  const createRequestContext = await request.newContext();
  const response = await createRequestContext.get(
    bookingUrl + "/booking/?roomid=" + roomId,
    {
      headers: {
        Cookie: `token=${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  expect(response.status()).toBe(200);
  const body = await response.json();
  //   console.log(body);
  return body;
}

async function futureOpenCheckinDate(roomId: number) {
  let currentBookings = await getBookings(roomId);

  checkOutArray = new Array();

  //Iterate through current bookings and get checkout dates
  for (let i = 0; i < (await currentBookings.bookings.length); i++) {
    let today = new Date();
    let checkOut = new Date(currentBookings.bookings[i].bookingdates.checkout);

    if (today > checkOut) {
      //   console.log("do nothing because the booking is in the past");
    } else {
      //pushing the checkout date into an array
      checkOutArray.push(checkOut);
    }
  }

  //   console.log(checkOutArray);

  //Find the most future checkout date and return it if no future dates exist return today
  let mostFutureDate =
    checkOutArray
      .sort(function (a, b) {
        return a - b;
      })
      .pop() || new Date();

  //   console.log("Last Checkout Date: " + mostFutureDate);

  return mostFutureDate;
}

async function createFutureBookings(roomId: number, amount: number) {
  let numBookings = 0;
  for (let i = 0; i < amount; i++) {
    await createBooking(roomId, await futureOpenCheckinDate(roomId));
    numBookings++;
  }
  console.log("Successfully booked " + numBookings + " times");
}

export {
  createBooking,
  getBookings,
  futureOpenCheckinDate,
  createFutureBookings,
};
