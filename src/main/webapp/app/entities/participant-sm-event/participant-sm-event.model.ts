import { BaseEntity } from './../../shared';

export const enum Task {
    'COMANDOR',
    'OFFICER',
    'ROOK'
}

export const enum ParticipantType {
    'PRIMARY',
    'RESERVE'
}

export class ParticipantSmEvent implements BaseEntity {
    constructor(
        public id?: number,
        public role?: Task,
        public participantType?: ParticipantType,
        public signedDate?: any,
        public founding?: number,
        public payed?: number,
        public personId?: number,
        public eventId?: number,
        public firstName?: string,
        public lastName?: string,
    ) {
    }
}
