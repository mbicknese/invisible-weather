import { ICurrentWeather } from './weather'
import { drop, flow, join, split, trim, map, filter, replace } from 'lodash/fp'

type foo = (args: Array<string>) => Array<string>
export const locationsFromArguments: foo = flow([
    drop(2),
    join(' '),
    split(','),
    map(trim),
    map(replace(/[^a-zA-Z0-9 ]*/, '')), // Matches all non alphanumeric or spaces
    filter(item => item !== '')
])

// Not really IO
export const getWeathers = async (locations: Array<string>): Promise<{ [location: string]: ICurrentWeather }> => {
    return {}
}
// Not really IO
export const getTimeZones = async (locations: Array<string>): Promise<{ [location: string]: string }> => {
    return {}
}

export const writeLocationInfo = (locationInfo: LocationInfo, out: OutputStream): void => {
    out('')
}

type OutputStream = (message: string) => void
interface LocationInfo {
    [location: string]: {
        currentWeather: ICurrentWeather,
        timeZone: string
    }
}
