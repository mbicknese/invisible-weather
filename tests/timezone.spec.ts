import { getTimeZone } from '../src/timezone'

describe('Time Zones', () => {
    it('can retrieve a time zone for given latitude and longitude', async (): Promise<void> => {
        // TODO Write Nock interceptor

        const timeZone = await getTimeZone('4.71', '52.01')

        expect(timeZone).toBe('GMT+1')
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
