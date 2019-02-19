import { getFlightTime, getTravelTimeAeroplane } from '.';
import { Vehicle } from './Vehicle';
import { DefaultValue } from './constant/DefaultValue';
import { Location } from './constant/Location';
import { VehicleKind } from './constant/VehicleKind';

export class Aeroplane extends Vehicle {

    public readonly boardingTime: number = DefaultValue.AEROPLANE_BOARDING_TIME;
    private destination: Location;
    private flightTime: number;

    public constructor(private location: Location) {
        super({
            capacity: DefaultValue.AEROPLANE_CAPACITY,
            kind: VehicleKind.AEROPLANE,
            speedMax: DefaultValue.AEROPLANE_SPEED_MAX,
        });
    }

    public getDestination(): Location {
        return this.destination;
    }

    public getLocation(): Location {
        return this.location;
    }

    public getFlightTime(): number {
        return this.flightTime;
    }

    public getTravelTime(): number {
        return getTravelTimeAeroplane(this);
    }

    public land(): void {
        this.location = this.getDestination();
        this.setDestination(null);
    }
    
    public setDestination(destination: Location): this {
        this.destination = destination;
        this.setFlightTime();
        return this;
    }
    
    private setFlightTime(): void {
        this.flightTime = this.getDestination() ? getFlightTime(this) : null;
    }
}
