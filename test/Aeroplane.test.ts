import { getTravelTimeAeroplane } from '../src';
import { Aeroplane } from '../src/Aeroplane';
import { DefaultValue } from '../src/constant/DefaultValue';
import { Location } from '../src/constant/Location';
import { VehicleKind } from '../src/constant/VehicleKind';

describe('Aeroplane', () => {

    let aeroplane: Aeroplane;

    beforeEach(() => {
        aeroplane = new Aeroplane(Location.BTS);
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

    test(`should have a location of ${Location[Location.BTS]}`, () => {
        expect(aeroplane.getLocation()).toBe(Location.BTS);
    });

    test(`should be able to chain getDestination() on setDestination()`, () => {
        const destination: Location = Location.BUD;
        const newAeroplane: Aeroplane = new Aeroplane(Location.BTS).setDestination(destination);
        expect(aeroplane.setDestination(destination)).toEqual(newAeroplane);
    });

    test(`should be able to change destination to ${Location[Location.BUD]}`, () => {
        expect(aeroplane.setDestination(Location.BUD).getDestination()).toBe(Location.BUD);
    });

    test(`should be able to change destination to ${Location[Location.BTS]}`, () => {
        const a: Aeroplane = new Aeroplane(Location.BUD);
        expect(a.setDestination(Location.BTS).getDestination()).toBe(Location.BTS);
    });
    
    test(`should be similar to another / a`, () => {
        expect(aeroplane).toEqual(new Aeroplane(Location.BTS));
    });
    
    test(`should be similar to another / b`, () => {
        expect(aeroplane).not.toEqual(new Aeroplane(Location.BUD));
    });
    
    makeTravelTimeAssertion(Location.BTS, Location.BUD);
    
    makeTravelTimeAssertion(Location.BUD, Location.BTS);
    
    makeTravelTimeAssertion(Location.BTS, Location.PRG);
    
    makeTravelTimeAssertion(Location.PRG, Location.BTS);
    
    makeTravelTimeAssertion(Location.BUD, Location.PRG);
    
    makeTravelTimeAssertion(Location.PRG, Location.BUD);
    
    test(`should have a location of it's prior destination after landing`, () => {
        const destination: Location = Location.BUD;
        aeroplane.setDestination(destination).land();
        expect(aeroplane.getLocation()).toBe(destination);
    });
    
    test(`should have a destination of null after landing`, () => {
        aeroplane.setDestination(Location.BUD).land();
        expect(aeroplane.getDestination()).toBeNull();
    });
    
    test(`should have a flightTime of null after landing`, () => {
        aeroplane.setDestination(Location.BUD).land();
        expect(aeroplane.getFlightTime()).toBeNull();
    });
});

function makeTravelTimeAssertion(location: Location, destination: Location): void {
    const aeroplane: Aeroplane = new Aeroplane(location).setDestination(destination);
    const expectedTravelTime: number = getTravelTimeAeroplane(aeroplane);
    const from: string = Location[location];
    const to: string = Location[destination];
    test(`should a have a travel time of ${expectedTravelTime} from ${from} to ${to}`, () => {
        const travelTime: number = aeroplane.getTravelTime();
        expect(isNaN(travelTime)).toBe(false);
        expect(travelTime).toBe(expectedTravelTime);
    });
}
