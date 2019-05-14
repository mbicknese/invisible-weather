# invisible-weather
CLI tool for getting weather reports

## usage

First build the project by running

    yarn start

After that the released file can be used by calling it in the command line. 
Locations need to be specified as either a city name or a zip code. Locations may
not contain comma's of their own and must be comma separated. 

    ./weather [locations,...]

## External APIs

The tool uses two external APIs which require keys to use them. Copy the 
`.env.example` file to `.env` and enter your keys. If you want to see a
demo and don't want to register for OpenWeatherMaps or TimeZoneDB, please
contact me for my keys.
