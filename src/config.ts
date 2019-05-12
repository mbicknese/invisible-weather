import dotenv from 'dotenv'
dotenv.config()

export const openWeatherAppID = process.env.OPENWEATHER_APPID || ''
export const timeZoneDBKey = process.env.TIMEZONEDB_KEY || ''
