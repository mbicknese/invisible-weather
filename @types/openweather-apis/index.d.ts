interface IOpenWeatherObject {
    coord: {
        lon: number,
        lat: number
    },
    weather: Array<{
        id: number,
        main: string,
        description: string,
        icon: string
    }>,
    base: string,
    main: {
        temp: number,
        pressure: number,
        humidity: number,
        temp_min: number,
        temp_max: number
    },
    visibility: number,
    wind: {
        speed: number,
        deg: number
    },
    clouds: {
        all: number
    },
    dt: number,
    sys: {
        type: number,
        id: number,
        message: number,
        country: string,
        sunrise: number,
        sunset: number
    },
    id: number,
    name: string,
    cod: number,
    message: string|null,
}

declare namespace Weather {
    function setAPPID(appId: string): void
    function setCity(query: string|null): void
    function setZipCode(zipCode: string|null): void
    function getAllWeather(callback: (error: string|null, data: IOpenWeatherObject) => void): void
    function setLang(language: string): void
}

declare module 'openweather-apis'{
    export default Weather
}
