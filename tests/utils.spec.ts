import { isUSZip } from '../src/utils'

describe('utils', () => {
    it('can determine US zip codes', () => {
        expect(isUSZip('90210')).toBeTruthy() // assert normal code
        expect(isUSZip('06001')).toBeTruthy() // assert leading 0

        expect(isUSZip('2802')).toBeFalsy() // assert Dutch zip code
        expect(isUSZip('abc')).toBeFalsy() // assert non numeric string
        expect(isUSZip('')).toBeFalsy() // assert empty string
    })
})
