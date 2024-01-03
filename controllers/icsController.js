const ical = require('ical.js');
const { DateTime } = require('luxon');

function generateICalData() {
  const eventTitle = 'Meeting with Client';
  const startTime = DateTime.local(2024, 1, 3, 10, 0);
  const endTime = startTime.plus({ hours: 1 });
  const eventDescription = 'Discuss project details.';

  const jcalData = {
    jcal: {
      version: '4.0',
      prodid: '//My Company//EN',
      events: [
        {
          type: 'vevent',
          summary: eventTitle,
          description: eventDescription,
          dtstart: startTime.toJSDate(),
          dtend: endTime.toJSDate(),
        },
      ],
    },
  };

  return ical.parse(JSON.stringify(jcalData));
}

module.exports = {
  generateICalData,
};
