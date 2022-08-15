// function takes a number days to add/subtract from today's date
// if you need to subtract days pass a negative number
// example: -1 wil return yesterday's date while passing 1 will return tomorrow

export function stringDateByDays(date, days = 0) {
  let today = date || new Date();
  if (days === 0) {
    return today.toISOString().split("T")[0];
  } else {
    let newDate = new Date(today.setDate(today.getDate() + days));
    return newDate.toISOString().split("T")[0];
  }
}
