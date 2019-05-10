import nock from 'nock'

import { getWeather, WeatherLocationNotFoundError } from '../src/weather'
import * as weatherFixtures from './fixtures/weather.json'

nock.disableNetConnect()
const scope = nock(/api\.openweathermap\.org/)

describe('Weather Features', (): void => {
    it('can retrieve weather information from the web based on query', async (): Promise<void> => {
        scope.get(/\/data\/2\.5\/weather\?.*q=gouda.*/)
            .reply(200, weatherFixtures.byCity.gouda)

        const weather = await getWeather('Gouda')

        expect(weather).toEqual({
            main: weatherFixtures.byCity.gouda.weather[0].main,
            description: weatherFixtures.byCity.gouda.weather[0].description,
        })
    })

    it('can retrieve weather information from the web based on zip', async (): Promise<void> => {
        scope.get(/\/data\/2\.5\/weather\?.*zip=90210.*/)
            .reply(200, weatherFixtures.byZip['90210'])

        const weather = await getWeather('90210')

        expect(weather).toEqual({
            main: weatherFixtures.byZip['90210'].weather[0].main,
            description: weatherFixtures.byZip['90210'].weather[0].description,
        })
    })

    it('throws an error for unknown locations', async (): Promise<void> => {
        scope.get(/\/data\/2\.5\/weather\?.*/)
            .reply(404, { cod: 404, message: 'city not found' })

        await expect(getWeather('foo')).rejects.toThrow(WeatherLocationNotFoundError)
    })

    it('returns unknown when something goes wrong', async (): Promise<void> => {
        scope.get(/\/data\/2\.5\/weather\?.*/)
            .reply(500, {})

        const weather = await getWeather('Server will 500')

        expect(weather).toEqual({
            main: 'Unknown',
            description: 'unknown',
        })
    })
})
