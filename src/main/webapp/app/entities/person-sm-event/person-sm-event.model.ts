import { BaseEntity } from './../../shared';

export const enum PersonType {
    'USER',
    'CADRE',
    'CHILD'
}

export const enum Sex {
    'MALE',
    'FEMALE'
}

export class PersonSmEvent implements BaseEntity {
    constructor(
        public id?: number,
        public personType?: PersonType,
        public firstName?: string,
        public lastName?: string,
        public phone?: string,
        public sex?: Sex,
        public tShirtSize?: string,
        public birthYear?: number,
        public info?: string,
        public participants?: BaseEntity[],
        public eMails?: BaseEntity[],
        public familyId?: number,
        public selected?: boolean,
    ) {
    }
}
