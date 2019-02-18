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

    test(makeSpeedAssertionName(CarGear.DRIVE_1), () => {
        makeSpeedAssertionExpectation(car, CarGear.DRIVE_1);
    });
    
    test(makeSpeedAssertionName(CarGear.DRIVE_2), () => {
        makeSpeedAssertionExpectation(car, CarGear.DRIVE_2);
    });
    
    test(makeSpeedAssertionName(CarGear.DRIVE_3), () => {
        makeSpeedAssertionExpectation(car, CarGear.DRIVE_3);
    });
    
    test(makeSpeedAssertionName(CarGear.DRIVE_4), () => {
        makeSpeedAssertionExpectation(car, CarGear.DRIVE_4);
    });
    
    test(makeSpeedAssertionName(CarGear.DRIVE_5), () => {
        makeSpeedAssertionExpectation(car, CarGear.DRIVE_5);
    });

    test(makeSpeedAssertionName(CarGear.NEUTRAL), () => {
        const s: number = car.gearUp(2).gearDown(2).getSpeed();
        expect(isNaN(s)).toBe(false);
        expect(s).toBe(getCarSpeed(CarGear.NEUTRAL));
    });
    
    test(makeSpeedAssertionName(CarGear.REVERSE), () => {
        const s: number = car.gearDown().getSpeed();
        expect(isNaN(s)).toBe(false);
        expect(s).toBe(getCarSpeed(CarGear.REVERSE));
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

    test(makeTravelTimeAssertionName(Distance.BRATISLAVA_BUDAPEST, speed), () => {
        makeTravelTimeAssertionExpectation(car, Distance.BRATISLAVA_BUDAPEST, speed);
    });

    test(makeTravelTimeAssertionName(Distance.BRATISLAVA_PRAGUE, speed), () => {
        makeTravelTimeAssertionExpectation(new Car(Distance.BRATISLAVA_PRAGUE),
            Distance.BRATISLAVA_PRAGUE, speed);
    });

    test(makeTravelTimeAssertionName(Distance.BUDAPEST_PRAGUE, speed), () => {
        makeTravelTimeAssertionExpectation(new Car(Distance.BUDAPEST_PRAGUE),
            Distance.BUDAPEST_PRAGUE, speed);
    });
});

function makeSpeedAssertionExpectation(car: Car, gear: CarGear): void {
    const speed: number = car.gearUp(gear).getSpeed();
    expect(isNaN(speed)).toBe(false);
    expect(speed).toBe(getCarSpeed(gear));
}

function makeSpeedAssertionName(gear: CarGear): string {
    return `should have a speed of ${getCarSpeed(gear)} when gear is ${CarGear[gear]}`;
}

function makeTravelTimeAssertionExpectation(car: Car, distance: Distance, speed: number): void {
    const travelTime: number = car.gearUp(5).getTravelTime();
    expect(isNaN(travelTime)).toBe(false);
    expect(travelTime).toBe(getTravelTimeCar(distance, speed));
}

function makeTravelTimeAssertionName(distance: Distance, speed: number): string {
    return `should a have a travel time of ${
        getTravelTimeCar(distance, speed)
    } in a distance of ${Distance[distance]}`;
}
