import timeZoneDB from 'timezonedb-node'
import { timeZoneDBKey } from '../config'

const api = timeZoneDB(timeZoneDBKey);

const isNumber = (number: string): boolean => !isNaN(+number) && number.length > 0
const isValidLat = (lat: string): boolean => isNumber(lat) && Math.abs(+lat) <= 90
const isValidLong = (long: string): boolean => isNumber(long) && Math.abs(+long) <= 180

// Needed a simple solution to deal with the 1 request a second rule
let throttleAmount = 0
const throttle = async (): Promise<void> => {
    const promise = new Promise(r => { setTimeout(() => r(), throttleAmount) })
    throttleAmount += 1000
    await promise
}
const unThrottle = (): void => { throttleAmount -= 1000 }

export const getTimeZone = async (lat: string, lng: string): Promise<string> => {
    if (!isValidLat(lat) || !isValidLong(lng)) {
        throw Error('Position out of range')
    }
    await throttle()

    let resolve: (response: string) => void
    const promise: Promise<string> = new Promise(r => { resolve = r })
    api.getTimeZoneData({ lat, lng }, (error, data) => {
        unThrottle()
        if (error) {
            resolve('Unknown')
        }
        resolve(data.abbreviation)
    })
    return promise;
}
