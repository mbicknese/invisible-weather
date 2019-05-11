import { isUSZip } from '../utils'
import { getOpenWeatherDataByQuery, getOpenWeatherDataByZip } from './api'

export const getWeather = async (location: string): Promise<ICurrentWeather> => {
    if (isUSZip(location)) {
        return getCurrentWeatherForZip(location)
    }
    return getCurrentWeatherForQuery(location)
}


const extractCurrentWeather = (data: IOpenWeatherObject): ICurrentWeather => ({
    main: data.weather[0].main,
    description: data.weather[0].description,
})
const getCurrentWeather = async (retrieve: () => Promise<IOpenWeatherObject>): Promise<ICurrentWeather> => {
    try {
        const data = await retrieve()
        return extractCurrentWeather(data)
    } catch (error) {
        if (error === 'city not found') {
            throw new WeatherLocationNotFoundError()
        }
        return { main: 'Unknown', description: 'unknown' }
    }
}
const getCurrentWeatherForQuery = async (query: string): Promise<ICurrentWeather> => getCurrentWeather(() => getOpenWeatherDataByQuery(query))
const getCurrentWeatherForZip = async (zip: string): Promise<ICurrentWeather> => getCurrentWeather(() => getOpenWeatherDataByZip(zip))

export interface ICurrentWeather {
    main: string,
    description: string
}

export class WeatherLocationNotFoundError extends Error {
    constructor() {
        super('city not found')

        // TypeScript magic to extend built-ins
        Object.setPrototypeOf(this, WeatherLocationNotFoundError.prototype)
    }
}
