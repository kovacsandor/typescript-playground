import { Aeroplane } from './Aeroplane';
import { Car } from './Car';
import { Vehicle } from './Vehicle';
import { CarGear } from './constant/CarGear';
import { DefaultValue } from './constant/DefaultValue';
import { Destination } from './constant/Destination';
import { Distance } from './constant/Distance';
import { VehicleKind } from './constant/VehicleKind';

export function getCarSpeed(gear: CarGear): number {
    return DefaultValue.CAR_SPEED_MAX / CarGear.DRIVE_5 * gear;
}

export function getFlightTime(aeroplane: Aeroplane, destination: Destination): number {
    switch (true) {
        case aeroplane.getDestination() === Destination.BUD && destination === Destination.BTS :
        case aeroplane.getDestination() === Destination.BTS && destination === Destination.BUD :
            return this.flightTime = 0.5;
        case aeroplane.getDestination() === Destination.BUD && destination === Destination.PRG :
        case aeroplane.getDestination() === Destination.PRG && destination === Destination.BUD :
            return this.flightTime = 1.5;
        case aeroplane.getDestination() === Destination.BTS && destination === Destination.PRG :
        case aeroplane.getDestination() === Destination.PRG && destination === Destination.BTS :
            return this.flightTime = 1;
        default:
        throw new Error('Invalid case');
    }
}

export function getTravelTimeAeroplane(boardingTime: number, flightTime: number): number {
    return boardingTime + flightTime;
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

    const aeroplane: Aeroplane = new Aeroplane(Destination.BTS).setDestination(Destination.BUD);
    const car: Car = new Car(Distance.BRATISLAVA_BUDAPEST);
    
    console.log('Travel time from Bratislava to Budapest by aeroplane', 
        getTravelTimeVehicle(aeroplane));
    
    console.log('Travel time from Bratislava to Budapest by car', 
        getTravelTimeVehicle(car));
}

if(process.env.NODE_ENV !== 'test') {

    start();
}
