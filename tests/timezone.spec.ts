import nock from 'nock'
import { getTimeZone } from '../src/timezone'

import timezoneResponse from './fixtures/timezone.json'

nock.disableNetConnect()
const scope = nock(/api\.timezonedb\.com/)

describe('Time Zones', () => {
    it('can retrieve a time zone for given latitude and longitude', async (): Promise<void> => {
        scope.get(/\?(.*)lat=-87.62&lng=41.88(.*)/)
            .reply(200, timezoneResponse)

        const timeZone = await getTimeZone('-87.62', '41.88')

        expect(timeZone).toBe('CDT')
    })

    it('throws an error for invalid inputs', async (): Promise<void> => {
      await expect(getTimeZone('91', '0')).rejects.toThrow()
      await expect(getTimeZone('-91', '0')).rejects.toThrow()
      await expect(getTimeZone('0', '181')).rejects.toThrow()
      await expect(getTimeZone('0', '-181')).rejects.toThrow()
      await expect(getTimeZone('a', '0')).rejects.toThrow()
      await expect(getTimeZone('0', 'a')).rejects.toThrow()
      await expect(getTimeZone('', '0')).rejects.toThrow()
      await expect(getTimeZone('0', '')).rejects.toThrow()
    })
})
