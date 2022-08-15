import { expect, request } from "@playwright/test";
import { getAuthToken } from "../datafactory/auth";
import { faker } from "@faker-js/faker";
require("dotenv").config();

let roomUrl = process.env.ROOM_URL || process.env.URL;
let username = "admin";
let password = "password";
let roomTypeArray = ["Single", "Twin", "Double", "Family", "Suite"];
let featureArray = ["WiFi", "Refreshments", "TV", "Safe", "Radio", "Views"];

async function createRoom(roomNumber: string) {
  let token = await getAuthToken(username, password);

  const roomName = roomNumber || faker.mersenne.rand(200, 1000).toString();
  const randomPrice = faker.mersenne.rand(110, 125);
  const randomDescription = faker.company.bs();
  const catImage = faker.image.cats(undefined, undefined, true);

  const createRequestContext = await request.newContext();
  const response = await createRequestContext.post(roomUrl + "/room/", {
    headers: {
      Cookie: `token=${token}`,
    },
    data: {
      roomName: roomName,
      type: roomTypeArray[Math.floor(Math.random() * roomTypeArray.length)],
      accessible: Math.random() < 0.5,
      image: catImage,
      description: randomDescription,
      features: featureArray,
      roomPrice: randomPrice.toString(),
    },
  });

  expect(response.status()).toBe(201);
  const body = await response.json();
  return body;
}

async function createRooms(amount: number) {
  let numCreated = 0;
  for (let i = 0; i < amount; i++) {
    let roomNumber = (1000 + i).toString();
    await createRoom(roomNumber);
    numCreated++;
  }
  console.log("Successfully created " + numCreated + " rooms");
}

export { createRoom, createRooms };
