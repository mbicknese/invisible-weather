const original = jest.requireActual('../index')

module.exports = {
    ...original,
    getWeather: async (location: string) => ({
        main: 'Mocked',
        description: 'Mocked'
    }),
    ICurrentWeather: {}
}
