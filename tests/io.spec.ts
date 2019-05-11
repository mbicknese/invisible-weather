import { locationsFromArguments, getWeathers, writeLocationInfo } from '../src/io'

const getWeather = require('../src/weather').getWeather as jest.Mock

jest.mock('../src/weather')

describe('Input/Output', () => {
    it('can sanitize and combine an array of arguments into locations', () => {
        const args = ['node', 'weather.ts', 'new', 'york,90210,', 'Gouda,', '😂&?']

        const locations = locationsFromArguments(args)

        expect(locations).toEqual([
            'new york',
            '90210',
            'Gouda'
        ])
    })


    it('calls the weather api for each provided location', async () => {
        const locations = ['90210', 'Gouda']

        const currentWeathers = await getWeathers(locations);

        expect(Object.keys(currentWeathers)).toHaveLength(2)
        expect(getWeather.mock.calls[0][0]).toBe('90210')
        expect(getWeather.mock.calls[1][0]).toBe('Gouda')
    })

    it('can write to an output', () => {
        const locationInfo = {
            '90210': {
                currentWeather: {
                    main: 'Sunny',
                    description: 'no clouds'
                },
                timeZone: 'GMT-7'
            },
            'Gouda': {
                currentWeather: {
                    main: 'Cloudy',
                    description: 'the usual'
                },
                timeZone: 'GMT+1'
            }
        }
        const out = jest.fn()

        writeLocationInfo(locationInfo, out)

        expect(out).toHaveBeenCalledWith(
`Gouda (GMT+1): Cloudy, the usual
90210 (GMT-7): Sunny, no clouds

`
        )
    })
})
