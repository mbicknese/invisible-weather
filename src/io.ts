import { ICurrentWeather, getWeather } from './weather'
import { drop, flow, join, split, trim, map, filter, replace, zipObject } from 'lodash/fp'

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
    const promises = locations.map(parseWeather)
    const weathers = await Promise.all(promises)
    return zipObject(locations, weathers)
}
const parseWeather = async (location: string): Promise<ICurrentWeather> => {
    try {
        return await getWeather(location)
    } catch {
        return { main: 'Unknown', description: 'could not find location' }
    }
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
