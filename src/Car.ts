import { getCarSpeed, getTravelTimeCar } from '.';
import { Vehicle } from './Vehicle';
import { CarGear } from './constant/CarGear';
import { DefaultValue } from './constant/DefaultValue';
import { Distance } from './constant/Distance';
import { VehicleKind } from './constant/VehicleKind';

export class Car extends Vehicle {

    private gear: CarGear = CarGear.NEUTRAL;
    private speed: number = DefaultValue.CAR_SPEED;

    public constructor(private distance: Distance) {
        super({
            capacity: DefaultValue.CAR_CAPACITY,
            kind: VehicleKind.CAR,
            speedMax: DefaultValue.CAR_SPEED_MAX,
        });
    }

    public getTravelTime(): number {
        return getTravelTimeCar(this.distance, this.getSpeed());
    }

    public gearDown(gears: number = 1): this {
        if(this.gear - gears > CarGear.REVERSE - 1) {
            this.gear -= gears;
        } else {
            this.gear = CarGear.REVERSE;
        }
        this.setSpeed();
        return this;
    }

    public gearUp(gears: number = 1): this {
        if(this.gear + gears < CarGear.DRIVE_5 + 1) {
            this.gear += gears;
        } else {
            this.gear = CarGear.DRIVE_5;
        }
        this.setSpeed();
        return this;
    }

    public getGear(): number {
        return this.gear;
    }

    public getSpeed(): number {
        return this.speed;
    }

    private setSpeed(): void {
        this.speed = getCarSpeed(this.gear);
    }
}
