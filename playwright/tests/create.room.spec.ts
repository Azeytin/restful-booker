import { test, expect } from "@playwright/test";
import { getAuthToken } from "../lib/datafactory/auth";
import { createRoom, createRooms } from "../lib/datafactory/room";
import { createBooking } from "../lib/datafactory/booking";

let baseUrl = process.env.ROOM_URL || process.env.URL;

test.describe("Rooms requests", async () => {
  let token;
  let username = "admin";
  let password = "password";
  let roomName;
  let roomType;
  let roomAccessibility;
  let roomImage;
  let roomDescription;
  let roomFeatures;
  let roomPrice;

  test.beforeAll(async () => {
    token = await getAuthToken(username, password);
  });

  test.beforeEach(async () => {
    roomName = "102";
    roomType = "Double";
    roomAccessibility = Math.random() < 0.5; //true or false
    roomImage = "https://www.mwtestconsultancy.co.uk/img/room1.jpg";
    roomDescription = "This is a description";
    roomFeatures = ["TV"];
    roomPrice = 102;
  });

  test("POST new room", async ({ request }) => {
    const response = await request.post(baseUrl + "/room/", {
      headers: {
        Cookie: `token=${token}`,
      },
      data: {
        roomName: roomName,
        type: roomType,
        accessible: roomAccessibility,
        image: roomImage,
        description: roomDescription,
        features: roomFeatures,
        roomPrice: roomPrice,
      },
    });

    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(typeof body.roomid).toBe("number");
    expect(body.roomid).toBeGreaterThan(1);
    expect(body.roomName).toBe(roomName);
    expect(body.type).toBe(roomType);
    expect(typeof body.accessible).toBe("boolean");
    expect(body.accessible).toBe(roomAccessibility);
    expect(body.image).toBe(roomImage);
    expect(body.description).toBe(roomDescription);
    expect(body.features).toStrictEqual(roomFeatures);
    expect(body.features.length).toBe(1);

    expect(body.roomPrice).toBe(roomPrice);
  });

  test("GET rooms", async ({ request }) => {
    await createRooms(5);
    // await createBooking(1);

    const response = await request.get(baseUrl + "/room");

    expect(response.status()).toBe(200);
    const body = await response.json();
    const room1 = body.rooms[0];
    expect(typeof room1.roomid).toBe("number");
    expect(room1.roomid).toBe(1);
  });
});
