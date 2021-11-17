import { Client } from ".";
import { OrderItem } from "./order-item.model";

export class OrderData {
    constructor(
        public id?: number,
        public date?: Date,
        public customer?: Client,
        public items?: OrderItem[]
    ) { }
}
