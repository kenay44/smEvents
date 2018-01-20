import { BaseEntity } from './../../shared';

export class FamilySmEvent implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public people?: BaseEntity[],
    ) {
    }
}
