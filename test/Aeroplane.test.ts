import { getTravelTimeAeroplane } from '../src';
import { Aeroplane } from '../src/Aeroplane';
import { DefaultValue } from '../src/constant/DefaultValue';
import { Destination } from '../src/constant/Destination';
import { VehicleKind } from '../src/constant/VehicleKind';

describe('Aeroplane', () => {

    let aeroplane: Aeroplane;

    beforeEach(() => {
        aeroplane = new Aeroplane(Destination.BTS);
    });

    test(`should have a capacity of ${DefaultValue.AEROPLANE_CAPACITY}`, () => {
        expect(aeroplane.capacity).toBe(DefaultValue.AEROPLANE_CAPACITY);
    });
    
    test(`should have a kind of ${VehicleKind[VehicleKind.AEROPLANE]}`, () => {
        expect(aeroplane.kind).toBe(VehicleKind.AEROPLANE);
    });

    test(`should have a max speed of ${DefaultValue.AEROPLANE_SPEED_MAX}`, () => {
        expect(aeroplane.speedMax).toBe(DefaultValue.AEROPLANE_SPEED_MAX);
    });

    test(`should have a destination of ${Destination[Destination.BTS]}`, () => {
        expect(aeroplane.getDestination()).toBe(Destination.BTS);
    });

    test(`should be able to change destination to ${Destination[Destination.BUD]}`, () => {
        expect(aeroplane.setDestination(Destination.BUD).getDestination()).toBe(Destination.BUD);
    });

    test(`should be able to change destination to ${Destination[Destination.BTS]}`, () => {
        const a: Aeroplane = new Aeroplane(Destination.BUD);
        expect(a.setDestination(Destination.BTS).getDestination()).toBe(Destination.BTS);
    });
    
    test(`should be similar to another / a`, () => {
        expect(aeroplane).toEqual(new Aeroplane(Destination.BTS));
    });
    
    test(`should be similar to another / b`, () => {
        expect(aeroplane).not.toEqual(new Aeroplane(Destination.BUD));
    });

    makeTravelTimeAssertion(Destination.BTS, Destination.BUD);

    makeTravelTimeAssertion(Destination.BUD, Destination.BTS);

    makeTravelTimeAssertion(Destination.BTS, Destination.PRG);

    makeTravelTimeAssertion(Destination.PRG, Destination.BTS);

    makeTravelTimeAssertion(Destination.BUD, Destination.PRG);
    
    makeTravelTimeAssertion(Destination.PRG, Destination.BUD);
});

function makeTravelTimeAssertion(start: Destination, destination: Destination): void {
    const aeroplane: Aeroplane = new Aeroplane(start).setDestination(destination);
    const boardingTime: number = aeroplane.boardingTime;
    const flightTime: number = aeroplane.getFlightTime();
    const expectedTravelTime: number = getTravelTimeAeroplane(boardingTime, flightTime);
    const from: string = Destination[start];
    const to: string = Destination[destination];
    test(`should a have a travel time of ${expectedTravelTime} from ${from} to ${to}`, () => {
        const travelTime: number = aeroplane.getTravelTime();
        expect(isNaN(travelTime)).toBe(false);
        expect(travelTime).toBe(expectedTravelTime);
    });
}

