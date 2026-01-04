import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vehiclePlate'
})
export class VehiclePlatePipe implements PipeTransform {

  private isNewPlate(vehiclePlate: string): boolean {
    var letters = /^[A-Z]+$/;
    if (vehiclePlate[4].match(letters)) {
      return true;
    }
    return false;
  }

  isEmptyVehiclePlate(vehiclePlate: string) {
    if (vehiclePlate == null || vehiclePlate == undefined || vehiclePlate == '') {
      return true;
    }
    return false;
  }

  transform(vehiclePlate: string): any {
    if (this.isEmptyVehiclePlate(vehiclePlate)) {
      return '-';
    }
    vehiclePlate = vehiclePlate.toUpperCase();
    if (this.isNewPlate(vehiclePlate)) {
      return vehiclePlate;
    }
    let letters = vehiclePlate.slice(0, 3);
    let numbers = vehiclePlate.slice(3);
    let newString = letters + '-' + numbers;
    return newString;
  }
}
