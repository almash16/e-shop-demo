

import { checkIfSSR } from './checkIfSSR';


describe('checkIfSSR', () => {
    const { window } = global;
    beforeAll(() => {
      // @ts-ignore
      delete global.window;
    });
    afterAll(() => {
      global.window = window;
    });
    
    it('returns true when window is not defined', () => {
      expect(checkIfSSR()).toBe(true);
    });

});


describe('checkIfSSR false', () => {
    
    it('returns true when window is not defined', () => {
      expect(checkIfSSR()).toBe(false);
    });

});


