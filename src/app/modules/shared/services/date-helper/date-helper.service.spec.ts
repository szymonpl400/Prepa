import { TestBed, getTestBed } from '@angular/core/testing';

import { DateHelperService } from './date-helper.service';

describe('DateHelperService', () => {
    let service: DateHelperService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [DateHelperService]
        });

        const injector = getTestBed();
        service = injector.get(DateHelperService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('secondsToMiliseconds', () => {
        it('should convert seconds to miliseconds', () => {
            const seconds = 60;
            const result = service.secondsToMiliseconds(seconds);
            expect(result).toBe(60000);
        });
    });
});
