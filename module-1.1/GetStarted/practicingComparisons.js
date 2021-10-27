const dayStart="07:30";
const dayEnd="17:45";

function scheduleMeeting(startTime, durationMinutes) {
  if (typeof startTime !== "string") {
    return console.warn('StartTime needs to be a String')
  }

  //Split start time into hours and minutes
  var [startTimeHour, startTimeMin] = startTime.split(':');

  // Convert into minutes. Converting to Number primitive since start time is a string
  let startTimeInMinutes = Number(startTimeHour) * 60 + Number(startTimeMin)

  // Add duration to start time and assign to new variable
  let meetingEndInMinutes = startTimeInMinutes + Number(durationMinutes)

  // Now convert meeting end time to hours and minutes and return a String
  let meetingEndhour = String(Math.floor(meetingEndInMinutes / 60))
  let meetingEndMin = String(meetingEndInMinutes % 60)

  // Concat the start and end meeting times hours and minutes, ensuring we add 0 to beginning if a single value
  let meetingStart = startTimeHour
    .padStart(2, 0)
    .concat(':', startTimeMin)

  let meetingEnd = meetingEndhour
    .padStart(2, 0)
    .concat(':', meetingEndMin)

  // Use comparison operators to determine if meeting time is within working day
  // Note: Since we're using relational operators which allows coercion if types are different.
  // We make sure all variables are using the same type to avoid unwanted conversions. In this case a String
  if (meetingStart >= dayStart && meetingEnd <= dayEnd) {
    return console.log({startTime}, {durationMinutes}, true)
  }

  return console.log({startTime}, {durationMinutes}, false)
}

scheduleMeeting(7, 15); // false
scheduleMeeting("07:15", 30); // false
scheduleMeeting("7:30", 30); // true
scheduleMeeting("11:30", 60); // true
scheduleMeeting("17:00", 45); // true
scheduleMeeting("17:30", 30); // false
scheduleMeeting("18:00", 15); // false