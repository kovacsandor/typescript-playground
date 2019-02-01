import { IVehicle } from './IVehicle';
import { DefaultValue } from './constant/DefaultValue';
import { VehicleKind } from './constant/VehicleKind';

export abstract class Vehicle implements IVehicle {
    
    public readonly capacity: DefaultValue;
    public readonly kind: VehicleKind;
    public readonly speedMax: DefaultValue;
    
    protected constructor(readonly vehicle: IVehicle) {
        this.capacity = vehicle.capacity;
        this.kind = vehicle.kind;
        this.speedMax = vehicle.speedMax;
    }

    public abstract getTravelTime(): number;
}
