# Test.Bash() Test Data Challenge

<https://club.ministryoftesting.com/t/take-the-test-bash-2022-data-management-challenge-closing-on-the-25th-of-september-2022/61213>

The challenge is: "The test team is unable to test due to a lack of test data within the test environment"

If you had to build automation to rapidly create useful test data, how would you do it?

My approach to this problem first started with learning the [Resful Booker Platform](https://github.com/mwinteringham/restful-booker-platform). Once learning determining what areas of the system test data would be most useful.

Top Candidates:

- Rooms (created by admin)
- Bookings (created by un-authenticated user) - creates notification
- Bookings (created by an admin)
- Contact us form (notifications on backend)

I've been continuing to get familiar with Playwright and wanted to use this as a tool for interacting within the system. NOTE if I'm looking to generate 1,000s or 100,000s of records I would probably approach this problem differently.

For me the problem I'm targeting is ability to create random, unique test data in order to make exploring the system easier. I will treat the system like a 'Black Box' where I'm not modifying the underlying system, but rather interacting with the interfaces provided (specifically the API).

I started with creating a simple Playwright automated tests to 'Create a Room' through the API. This allowed me to learn the ins and outs of the API and from there I began to create a ['Fixture'](https://playwright.dev/docs/api/class-fixtures) in order to abstract the logic of creating a room. I created this fixture in the `/lib/datafactory/` directory.

Once I created a single `createRoom` function I moved on to creating a `createRooms(number_of_rooms)` function.

With this in place I could use these functions to either creating test data (see `dataCreator.ts` in main directory for exploring, or use these functions in my playwright test files.

My next steps were to create a `fixture` for booking a room. The functions I'm thinking through are createFutureBookings(roomId, startDate).

## Commnad to run with docker-compose locally

`docker-compose up --build -dbuild -d`

## Useful links for running locally:

http://localhost:3000/booking/actuator/health
http://localhost:3000/booking/swagger-ui/index.html#/

http://localhost:3001/room/actuator/health
http://localhost:3001/room/swagger-ui/index.html#/

http://localhost:3002/branding/actuator/health
http://localhost:3002/branding/swagger-ui/index.html#/

http://localhost:3004/auth/actuator/health
http://localhost:3004/auth/swagger-ui/index.html#/

http://localhost:3005/report/actuator/health
http://localhost:3005/report/swagger-ui/index.html#/

http://localhost:3006/message/actuator/health
http://localhost:3006/message/swagger-ui/index.html#/

## Run this bash command to check to ensure local environments are up

`bash local-health-check.sh`

## To generate data

- Run `npm install` to install all node modules needed.
- Edit `dataCreator.ts` file in the main directory for the data you with to create
- Run `ts-node dataCreator.ts` to run the file.

## To Run the playwright test

- Run `npx playwright test`
