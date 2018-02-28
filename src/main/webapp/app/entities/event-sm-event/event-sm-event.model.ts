import { BaseEntity } from './../../shared';

export const enum EventType {
    CRUISE, FIRST_TACK, BOSUN_WORKS
}

export class EventSmEvent implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public startDate?: any,
        public endDate?: any,
        public location?: string,
        public maxParticipants?: number,
        public description?: string,
        public hours?: number,
        public participants?: BaseEntity[],
        public eMails?: BaseEntity[],
        public commander?: string,
        public commanderEmail?: string,
        public commanderPhone?: string,
        public eventType?: EventType,
        public ageFrom?: number,
        public ageTo?: number,
        public firstRateDate?: any,
        public secondRateDate?: any,
        public signUpStartDate?: any,
        public signUpStartTime?: any,
    ) {
    }
}
