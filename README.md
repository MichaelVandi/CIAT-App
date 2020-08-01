# This is CIAT

CIAT is a lightweight app that traces COVID-19 cases around the greater Maryland area and
notifies users when they may have been in contact with someone who tested positive. The core
operations of the app rely on the [DP-3T](https://github.com/DP-3T/documents/blob/master/DP3T%20White%20Paper.pdf) algorithm.

## Features Include

__Active GIS Mapping:__
We collect geospatial data for about 1,329 zip codes and cities in Maryland from verified authorities
and organise that data in a GIS format with primarily a graduated circle map that gives a holistic view
of the spread of COVID-19 in Maryland

__Localised Statistics:__
CIAT shows users stats that are only relevant to their current location in a simplified manner. Statistics include
total cases in your city and zip code, hospital capacity, testing volume, infection rate,
number of COVID-19 patients in critical condition, gender distribution etc. This saves time and gives a proper perspective on the trend of COVID-19.

__Access to Resources:__
Remember when everyone fought for toilet paper? CIAT has features that will enable users to find supplies around them, get relevant local updates related to COVID-19 and tips on how to stay safe. CIAT scans local RSS feeds and filters COVID-19 related information and provides that information to the user in real-time

__Contact Tracing and DP-3T:__
The anonymous Contact Tracing feature works seamlessly in the background using the DP-3T algorithm: The app uses bluetooth technology to ping nearby devices within a specific radius. When these devices are pinged, they intermittently exchange unique random strings with each other. If someone tests positive for covid-19, they can choose to upload all random strings they have sent to a central database which contains only strings that have been sent from people who tested positive. From here, all the other devices can check to see if they have been in contact with someone who tested positive in the last 14 days.  That way, we can effectively trace contacts and protect user's privacy.

## Team Members

- Olubukola Akanbi
- Adam Mizell
- Stephanie Parey
- Michael Vandi

Learn more [here](https://ciat-app.web.app)