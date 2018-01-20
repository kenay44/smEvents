import { BaseEntity } from './../../shared';

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
    ) {
    }
}
