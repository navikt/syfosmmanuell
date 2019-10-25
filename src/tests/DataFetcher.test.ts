import { hentUrlParameter } from '../utils/urlParameter';

describe('DataFetcher', () => {
    describe('hentUrlParameter', () => {
        test('Skal returnere object med prop "pnr" for url="url.com/?pnr=123"', () => {
            const url = 'url.com/?pnr=123';
            expect(hentUrlParameter(url)).toHaveProperty('pnr');
        });
        test('Skal returnere string for url="url.com/?pnr=123"', () => {
            const url = 'url.com/?pnr=123';
            expect(typeof hentUrlParameter(url).pnr).toBe('string');
        });
        test('throws Error ved for url uten parametre', () => {
            const url = 'url.com/';
            expect(() => hentUrlParameter(url)).toThrowError(new Error('Url does not contain any parameters'));
        });
        test('throws Error ved for url med flere "?"', () => {
            const url = 'url.com/?pnr=123?something';
            expect(() => hentUrlParameter(url)).toThrowError(new Error('Url contains several "?"'));
        });
        test('throws Error ved for url med for mange parametre', () => {
            const url = 'url.com/?pnr=123&param=value';
            expect(() => hentUrlParameter(url)).toThrowError(new Error('Url contains too many parameters'));
        });
        test('throws Error ved for url for parameter uten verdi', () => {
            const url = 'url.com/?pnr=';
            const url2 = 'url.com/?pnr';
            expect(() => hentUrlParameter(url)).toThrowError(new Error('Parameter does not contain any value'));
            expect(() => hentUrlParameter(url2)).toThrowError(new Error('Parameter does not contain any value'));
        });
        test('throws Error ved for url hvor parameter ikke matcher "pnr"', () => {
            const url = 'url.com/?param=value';
            expect(() => hentUrlParameter(url)).toThrowError(new Error('The parameter given is not pnr'));
        });
    });
});
