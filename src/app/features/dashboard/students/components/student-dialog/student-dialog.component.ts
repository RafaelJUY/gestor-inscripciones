import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {IStudent} from "../../model/IStudent";
import {Student} from "../../model/Student";

@Component({
  selector: 'app-student-dialog',
  templateUrl: './student-dialog.component.html',
  styleUrl: './student-dialog.component.scss'
})
export class StudentDialogComponent {
  studentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<StudentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editingStudent?: IStudent
  )
  {
    this.studentForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
    });

    if(this.editingStudent){
      // Para que en el modal se muestre los datos del estudiante a modificar
      this.editingStudent = this.convertStudentToFormValues(this.editingStudent);
      this.studentForm.patchValue(this.editingStudent);
    }
  }

  /** *
   * Método para convertir los nombres de los atributos quitando el _ que tienen como prefijo.
   * Los objetos fueron creados mediante una clase que tiene atributos privados, por eso tienen _ como prefijo.
   * El formulario espera los nombres de los atributos sin los _.
   * Sin este método los valores previos del objeto a modificar no se cargarían en el formulario.
   */
  private convertStudentToFormValues(student: IStudent): IStudent {
    if (student instanceof Student) {
      return {
        id: student.id,
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email
      };
    }
    return student;
  }

  onSubmit():void{ //Cuando se de click en guardar
    if(this.studentForm.valid){
      let student:IStudent = {
        id: this.studentForm.value.id,
        firstName: this.studentForm.value.firstName,
        lastName: this.studentForm.value.lastName,
        email: this.studentForm.value.email
      }
      this.matDialogRef.close(student); //Para cerrar el modal, opcionalmente se puede enviar el valor del formulario.
    }else{
      alert("El estudiante no es valido");
    }
  }
}
