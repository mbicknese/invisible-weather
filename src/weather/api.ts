import { memoize } from 'lodash'
import weather from 'openweather-apis'

import { openWeatherAppID } from '../config'

weather.setAPPID(openWeatherAppID)

export const getOpenWeatherDataByQuery = memoize(async (query: string): Promise<IOpenWeatherObject> => {
    weather.setZipCode(null)
    weather.setCity(query)
    return getAllWeather()
})
export const getOpenWeatherDataByZip = memoize(async (zip: string): Promise<IOpenWeatherObject> => {
    weather.setCity('')
    weather.setZipCode(zip)
    return getAllWeather()
})

const getAllWeather = async (): Promise<IOpenWeatherObject> => new Promise(
    (resolve, reject) => weather.getAllWeather((error, data) => {
        if (error) {
            reject(error)
            return
        }
        if (data.cod !== 200) {
            reject(data.message)
            return
        }
        resolve(data)
    })
)
