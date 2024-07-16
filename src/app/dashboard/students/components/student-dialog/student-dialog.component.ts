import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {IStudent} from "../../interfaces/IStudent";

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
      this.studentForm.patchValue(this.editingStudent);
    }
  }

  onSubmit():void{ //Cuando se de click en guardar
    if(this.studentForm.valid){
      this.matDialogRef.close(this.studentForm.value); //Para cerrar el modal, opcionalmente se puede enviar el valor del formulario.
    }else{
      alert("El estudiante no es valido");
    }
  }
}
