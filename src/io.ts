import { ICurrentWeather, getWeather } from './weather'
import { drop, flow, join, split, trim, map, filter, replace } from 'lodash/fp'

type InputSanitizer = (args: Array<string>) => Array<string>
export const locationsFromArguments: InputSanitizer = flow([
    drop(2),
    join(' '),
    split(','),
    map(trim),
    map(replace(/[^a-zA-Z0-9 ]*/, '')), // Matches all non alphanumeric or spaces
    filter(item => item !== '')
])

// Not really IO
export const getWeathers = async (locations: Array<string>): Promise<{ [location: string]: ICurrentWeather }> => {
    const weathers = locations.reduce((acc, location) => ({ ...acc, [location]: getWeather(location) }), {})
    await Promise.all(Object.values(weathers))
    return weathers
}
// Not really IO
export const getTimeZones = async (locations: Array<string>): Promise<{ [location: string]: string }> => {
    return {}
}

export const writeLocationInfo = (locationInfo: LocationInfo, out: OutputStream): void => {
    out(`${Object.keys(locationInfo).map(buildLocationLine(locationInfo)).join('\n')}\n\n`)
}
const buildLocationLine = (info: LocationInfo) => (name: string): string =>
    `${name} (${info[name].timeZone}): ${info[name].currentWeather.main}, ${info[name].currentWeather.description}`

type OutputStream = (message: string) => void
interface LocationInfo {
    [location: string]: {
        currentWeather: ICurrentWeather,
        timeZone: string
    }
}
