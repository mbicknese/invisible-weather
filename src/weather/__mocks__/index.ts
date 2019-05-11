const original = jest.requireActual('../index')

module.exports = {
    ...original,
    getWeather: jest.fn(async (location: string) => ({
        main: 'Mocked',
        description: 'Mocked'
    })),
    ICurrentWeather: {}
}
