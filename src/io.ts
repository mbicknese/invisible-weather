import { ICurrentWeather } from './weather'

export const locationsFromArguments = (args: Array<string>): Array<string> => {
    return args
}

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
