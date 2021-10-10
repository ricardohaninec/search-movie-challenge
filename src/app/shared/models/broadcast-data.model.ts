import { BroadcastEnum } from '../enums/broadcast.enum';

export class BroadcastData {
    type: BroadcastEnum;
    data: any;

    constructor(type: BroadcastEnum = BroadcastEnum.Unknow, data?: any) {
        this.type = type;
        this.data = data;
    }
}
