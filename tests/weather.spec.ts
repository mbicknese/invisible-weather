import { getWeather, WeatherLocationNotFoundError } from '../src/weather'
import * as weatherFixtures from './fixtures/weather.json'

describe('Weather Features', (): void => {
    it('can retrieve weather information from the web based on query', async (): Promise<void> => {
        // TODO configure fake server for query response

        const weather = await getWeather('Gouda')

        expect(weather).toEqual({
            main: weatherFixtures.byCity.gouda.weather[0].main,
            description: weatherFixtures.byCity.gouda.weather[0].description,
        })
    })

    it('can retrieve weather information from the web based on zip', async (): Promise<void> => {
        // TODO configure fake server for zip response

        const weather = await getWeather('90210')

        expect(weather).toEqual({
            main: weatherFixtures.byZip['902010'].weather[0].main,
            description: weatherFixtures.byZip['902010'].weather[0].description,
        })
    })

    it('throws an error for unknown locations', (): void => {
        // TODO have fake server return 404

        expect(() => getWeather('foo')).toThrow(WeatherLocationNotFoundError)
    })

    it('returns unknown when something goes wrong', async (): Promise<void> => {
        // TODO disable XHR

        const weather = await getWeather('Gouda')

        expect(weather).toEqual({
            main: 'Unknown',
            description: 'unknown',
        })
    })
})
