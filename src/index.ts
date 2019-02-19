import { Aeroplane } from './Aeroplane';
import { Car } from './Car';
import { Vehicle } from './Vehicle';
import { CarGear } from './constant/CarGear';
import { DefaultValue } from './constant/DefaultValue';
import { Distance } from './constant/Distance';
import { Location } from './constant/Location';
import { VehicleKind } from './constant/VehicleKind';

export function getCarSpeed(gear: CarGear): number {
    return DefaultValue.CAR_SPEED_MAX / CarGear.DRIVE_5 * gear;
}

export function getFlightTime(aeroplane: Aeroplane): number {
    const destination: Location = aeroplane.getDestination();
    const location: Location = aeroplane.getLocation();
    switch (true) {
        case location === Location.BUD && destination === Location.BTS :
        case location === Location.BTS && destination === Location.BUD :
            return 0.5;
        case location === Location.BUD && destination === Location.PRG :
        case location === Location.PRG && destination === Location.BUD :
            return 1.5;
        case location === Location.BTS && destination === Location.PRG :
        case location === Location.PRG && destination === Location.BTS :
            return 1;
        default:
        throw new Error('Invalid case');
    }
}

export function getTravelTimeAeroplane(aeroplane: Aeroplane): number {
    return aeroplane.boardingTime + aeroplane.getFlightTime();
}

export function getTravelTimeCar(distance: Distance, speed: number): number {
    const hours: number = distance / speed;
    return Math.round(hours * 1000) / 1000;
}

function getTravelTimeVehicle(vehicle: Vehicle): number {
    if (vehicle.kind === VehicleKind.CAR) {
        (vehicle as Car).gearUp(5);
    }
    return vehicle.getTravelTime();
}

function start(): void {

    const aeroplane: Aeroplane = new Aeroplane(Location.BTS).setDestination(Location.BUD);
    const car: Car = new Car(Distance.BRATISLAVA_BUDAPEST);
    
    console.log('Travel time from Bratislava to Budapest by aeroplane', 
        getTravelTimeVehicle(aeroplane));
    
    console.log('Travel time from Bratislava to Budapest by car', 
        getTravelTimeVehicle(car));
}

if(process.env.NODE_ENV !== 'test') {

    start();
}
