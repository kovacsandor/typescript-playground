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

    test(makeGearAssertionTravelTime(Destination.BTS, Destination.BUD), () => {
        const a: Aeroplane = new Aeroplane(Destination.BTS).setDestination(Destination.BUD);
        expect(a.getTravelTime()).toBe(getTravelTimeAeroplane(a.boardingTime, a.getFlightTime()));
    });

    test(makeGearAssertionTravelTime(Destination.BUD, Destination.BTS), () => {
        const a: Aeroplane = new Aeroplane(Destination.BUD).setDestination(Destination.BTS);
        expect(a.getTravelTime()).toBe(getTravelTimeAeroplane(a.boardingTime, a.getFlightTime()));
    });

    test(makeGearAssertionTravelTime(Destination.BTS, Destination.PRG), () => {
        const a: Aeroplane = new Aeroplane(Destination.BTS).setDestination(Destination.PRG);
        expect(a.getTravelTime()).toBe(getTravelTimeAeroplane(a.boardingTime, a.getFlightTime()));
    });

    test(makeGearAssertionTravelTime(Destination.PRG, Destination.BTS), () => {
        const a: Aeroplane = new Aeroplane(Destination.PRG).setDestination(Destination.BTS);
        expect(a.getTravelTime()).toBe(getTravelTimeAeroplane(a.boardingTime, a.getFlightTime()));
    });

    test(makeGearAssertionTravelTime(Destination.BUD, Destination.PRG), () => {
        const a: Aeroplane = new Aeroplane(Destination.BUD).setDestination(Destination.PRG);
        expect(a.getTravelTime()).toBe(getTravelTimeAeroplane(a.boardingTime, a.getFlightTime()));
    });

    test(makeGearAssertionTravelTime(Destination.PRG, Destination.BUD), () => {
        const a: Aeroplane = new Aeroplane(Destination.PRG).setDestination(Destination.BUD);
        expect(a.getTravelTime()).toBe(getTravelTimeAeroplane(a.boardingTime, a.getFlightTime()));
    });
});

function makeGearAssertionTravelTime(start: Destination, destination: Destination): string {
    const aeroplane: Aeroplane = new Aeroplane(start).setDestination(destination);
    return `should a have a travel time of ${
        getTravelTimeAeroplane(aeroplane.boardingTime, aeroplane.getFlightTime())
    } from ${Destination[start]} to ${Destination[destination]}`;
}
