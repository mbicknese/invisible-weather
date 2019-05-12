declare type TimeZoneDBOptions = {
    lat: string,
    lng: string
}
declare type TimeZoneDBResponse = {
    status: 'OK'|'FAIL',
    message: string,
    countryCode: string,
    zoneName: string,
    abbreviation: string,
    gmtOffset: string,
    dst: string,
    timestamp: number
}

declare interface TimeZoneDB {
    getTimeZoneData(
        options: TimeZoneDBOptions,
        callback: (error: Error, data: TimeZoneDBResponse) => void
    ): Promise<void>
}

declare function timeZoneDB(apiKey: string): TimeZoneDB

declare module 'timezonedb-node' {
    export default timeZoneDB
}
