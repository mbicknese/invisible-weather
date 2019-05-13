import { isUSZip } from '../utils'
import { getOpenWeatherDataByQuery, getOpenWeatherDataByZip } from './api'
import unknownWeather from './unknownWeather.json'

export interface ICurrentWeather {
    main: string,
    description: string
}
export interface ILatLong { lat: number|null, long: number|null }

export class WeatherLocationNotFoundError extends Error {
    constructor() {
        super('city not found')

        // TypeScript magic to extend built-ins
        Object.setPrototypeOf(this, WeatherLocationNotFoundError.prototype)
    }
}

type WeatherDataExtractor<ReturnType> = (data: IOpenWeatherObject) => ReturnType
const retrieveAndExtract = <R>(extract: WeatherDataExtractor<R>) => async (retrieve: () => Promise<IOpenWeatherObject>): Promise<R> => {
    try {
        const data = await retrieve()
        return extract(data)
    } catch (error) {
        if (error === 'city not found') {
            throw new WeatherLocationNotFoundError()
        }
        return extract(unknownWeather)
    }
}

type LocationBasedRetriever<ReturnType> = (location: string) => Promise<ReturnType>
const locationSwitch = <R>(onZip: LocationBasedRetriever<R>, onQuery: LocationBasedRetriever<R>) =>
    async (location: string): Promise<R> => {
        if (isUSZip(location)) {
            return onZip(location)
        }
        return onQuery(location)
    }


// Current Weather composition
const extractCurrentWeather = (data: IOpenWeatherObject): ICurrentWeather => ({
    main: data.weather[0].main,
    description: data.weather[0].description,
})
const getCurrentWeather = retrieveAndExtract(extractCurrentWeather)
const getCurrentWeatherForQuery = async (query: string): Promise<ICurrentWeather> => getCurrentWeather(() => getOpenWeatherDataByQuery(query))
const getCurrentWeatherForZip = async (zip: string): Promise<ICurrentWeather> => getCurrentWeather(() => getOpenWeatherDataByZip(zip))
export const getWeather = locationSwitch(getCurrentWeatherForZip, getCurrentWeatherForQuery)

// Latitude and Longitude composition
const extractCoords = (data: IOpenWeatherObject): ILatLong => ({
    lat: data.coord.lat,
    long: data.coord.lon
})
const getCoords = retrieveAndExtract(extractCoords)
const getLatLongForQuery = async (query: string): Promise<ILatLong> => getCoords(() => getOpenWeatherDataByQuery(query))
const getLatLongForZip = async (zip: string): Promise<ILatLong> => getCoords(() => getOpenWeatherDataByZip(zip))
export const getLatLong = locationSwitch(getLatLongForZip, getLatLongForQuery)
