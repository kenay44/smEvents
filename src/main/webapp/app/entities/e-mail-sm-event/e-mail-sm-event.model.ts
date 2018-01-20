import { BaseEntity } from './../../shared';

export const enum EmailType {
    'PARTICIPANT_ADDED'
}

export const enum EMailStatus {
    'PREPARED',
    'SENT'
}

export class EMailSmEvent implements BaseEntity {
    constructor(
        public id?: number,
        public emailType?: EmailType,
        public status?: EMailStatus,
        public eventId?: number,
        public personId?: number,
    ) {
    }
}
