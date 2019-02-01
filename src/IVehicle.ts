import { VehicleKind } from './constant/VehicleKind';

export interface IVehicle {

    readonly capacity: number;
    readonly kind: VehicleKind;
    readonly speedMax: number;
}
