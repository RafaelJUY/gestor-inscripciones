import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fullName'
})
export class FullNamePipe implements PipeTransform {

  transform(firstName: string, apellido: string): string {
    return firstName + " " + apellido;
  }

}
