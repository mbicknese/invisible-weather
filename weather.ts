import chalk from 'chalk'
import isOnline from 'is-online'
import { getWeathers, locationsFromArguments, writeLocationInfo } from './src/io'
import { openWeatherAppID } from './src/config';

(async () => {
    if (!await isOnline()) {
        process.stdout.write(chalk`{red You\'re offline!}\n`)
        process.exit()
    }
    if (!openWeatherAppID) {
        process.stdout.write(chalk`{blue You'll need to provide an app id for the OpenWeather API}\n`)
        process.exit()
    }

    const locations = locationsFromArguments(process.argv)
    const weathers = await getWeathers(locations)
    // getTimeZones

    writeLocationInfo(
        locations.reduce((acc, location) => ({ ...acc, [location]: {
            currentWeather: weathers[location],
            timeZone: 'WIP'
        }}), {}),
        process.stdout.write.bind(process.stdout)
    )
})();

