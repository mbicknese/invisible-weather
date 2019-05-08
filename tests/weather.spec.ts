import { getWeather } from '../src/weather'

describe('Weather Features', (): void => {
    it('can retrieve weather information from the web', async (): Promise<void> => {
        const weather = await getWeather('Gouda')
        expect(weather).toEqual({
            main: 'Clouds',
            description: 'broken clouds',
        })
    })
})
