import { getCarSpeed, getTravelTimeCar } from '../src';
import { Car } from '../src/Car';
import { CarGear } from '../src/constant/CarGear';
import { DefaultValue } from '../src/constant/DefaultValue';
import { Distance } from '../src/constant/Distance';
import { VehicleKind } from '../src/constant/VehicleKind';

describe('Car', () => {

    let car: Car;
    const speed: number = DefaultValue.CAR_SPEED_MAX / CarGear.DRIVE_5 * 5;

    beforeEach(() => {
        car = new Car(Distance.BRATISLAVA_BUDAPEST);
    });

    test(`should have a capacity of ${DefaultValue.CAR_CAPACITY}`, () => {
        expect(car.capacity).toBe(DefaultValue.CAR_CAPACITY);
    });
    
    test(`should have a kind of ${VehicleKind[VehicleKind.CAR]}`, () => {
        expect(car.kind).toBe(VehicleKind.CAR);
    });

    test(`should have a max speed of ${DefaultValue.CAR_SPEED_MAX}`, () => {
        expect(car.speedMax).toBe(DefaultValue.CAR_SPEED_MAX);
    });

    test(`should have a speed of ${DefaultValue.CAR_SPEED} when created`, () => {
        expect(car.getSpeed()).toBe(DefaultValue.CAR_SPEED);
    });

    test(makeGearAssertionName(CarGear.DRIVE_1), () => {
        expect(car.gearUp().getSpeed()).toBe(getCarSpeed(CarGear.DRIVE_1));
    });

    test(makeGearAssertionName(CarGear.DRIVE_2), () => {
        expect(car.gearUp(2).getSpeed()).toBe(getCarSpeed(CarGear.DRIVE_2));
    });

    test(makeGearAssertionName(CarGear.DRIVE_3), () => {
        expect(car.gearUp(3).getSpeed()).toBe(getCarSpeed(CarGear.DRIVE_3));
    });

    test(makeGearAssertionName(CarGear.DRIVE_4), () => {
        expect(car.gearUp(4).getSpeed()).toBe(getCarSpeed(CarGear.DRIVE_4));
    });

    test(makeGearAssertionName(CarGear.DRIVE_5), () => {
        expect(car.gearUp(5).getSpeed()).toBe(getCarSpeed(CarGear.DRIVE_5));
    });

    test(makeGearAssertionName(CarGear.NEUTRAL), () => {
        expect(car.gearUp(2).gearDown(2).getSpeed()).toBe(getCarSpeed(CarGear.NEUTRAL));
    });

    test(makeGearAssertionName(CarGear.REVERSE), () => {
        expect(car.gearDown().getSpeed()).toBe(getCarSpeed(CarGear.REVERSE));
    });

    test(`should not be able to shift gear to ${CarGear.REVERSE - 1} / a`, () => {
        expect(car.gearDown(2).getGear()).toBe(CarGear.REVERSE);
    });

    test(`should not be able to shift gear to ${CarGear.REVERSE - 1} / b`, () => {
        expect(car.gearDown(2).getGear()).not.toBe(CarGear.REVERSE - 1);
    });

    test(`should not be able to shift gear to ${CarGear.DRIVE_5 + 1} / a`, () => {
        expect(car.gearUp(6).getGear()).toBe(CarGear.DRIVE_5);
    });

    test(`should not be able to shift gear to ${CarGear.DRIVE_5 + 1} / b`, () => {
        expect(car.gearUp(6).getGear()).not.toBe(CarGear.DRIVE_5 + 1);
    });

    test(`should be similar to another / a`, () => {
        expect(car.gearUp(2)).toEqual(new Car(Distance.BRATISLAVA_BUDAPEST).gearUp(2));
    });

    test(`should be similar to another / b`, () => {
        expect(car.gearUp(2)).not.toEqual(new Car(Distance.BRATISLAVA_BUDAPEST).gearUp());
    });

    test(makeGearAssertionTravelTime(Distance.BRATISLAVA_BUDAPEST, speed), () => {
        expect(car.gearUp(5).getTravelTime())
            .toBe(getTravelTimeCar(Distance.BRATISLAVA_BUDAPEST, speed));
    });

    test(makeGearAssertionTravelTime(Distance.BRATISLAVA_PRAGUE, speed), () => {
        car = new Car(Distance.BRATISLAVA_PRAGUE);
        expect(car.gearUp(5).getTravelTime())
            .toBe(getTravelTimeCar(Distance.BRATISLAVA_PRAGUE, speed));
    });

    test(makeGearAssertionTravelTime(Distance.BUDAPEST_PRAGUE, speed), () => {
        car = new Car(Distance.BUDAPEST_PRAGUE);
        expect(car.gearUp(5).getTravelTime())
            .toBe(getTravelTimeCar(Distance.BUDAPEST_PRAGUE, speed));
    });
});

function makeGearAssertionName(gear: CarGear): string {
    return `should have a speed of ${getCarSpeed(gear)} when gear is ${CarGear[gear]}`;
}

function makeGearAssertionTravelTime(distance: Distance, speed: number): string {
    return `should a have a travel time of ${
        getTravelTimeCar(distance, speed)
    } in a distance of ${Distance[distance]}`;
}
