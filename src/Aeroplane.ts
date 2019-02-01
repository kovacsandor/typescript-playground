import { getFlightTime, getTravelTimeAeroplane } from '.';
import { Vehicle } from './Vehicle';
import { DefaultValue } from './constant/DefaultValue';
import { Destination } from './constant/Destination';
import { VehicleKind } from './constant/VehicleKind';

export class Aeroplane extends Vehicle {

    public readonly boardingTime: number = DefaultValue.AEROPLANE_BOARDING_TIME;
    private flightTime: number;

    public constructor(private destination: Destination) {
        super({
            capacity: DefaultValue.AEROPLANE_CAPACITY,
            kind: VehicleKind.AEROPLANE,
            speedMax: DefaultValue.AEROPLANE_SPEED_MAX,
        });
    }

    public getDestination(): Destination {
        return this.destination;
    }

    public getFlightTime(): number {
        return this.flightTime;
    }

    public getTravelTime(): number {
        return getTravelTimeAeroplane(this.boardingTime, this.flightTime);
    }
    
    public setDestination(destination: Destination): this {
        this.setFlightTime(destination);
        this.destination = destination;
        return this;
    }
    
    private setFlightTime(destination: Destination): void {
        this.flightTime = getFlightTime(this, destination);
    }
}
