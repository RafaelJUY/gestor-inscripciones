import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Course} from "../../interfaces/Course";

@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrl: './course-dialog.component.scss'
})
export class CourseDialogComponent {
  curseForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<CourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editingCourse?: Course
  )
  {
    // matDialogRef = referencia al dialogo/modal actual.
    this.curseForm = this.fb.group({
      // name: [valorPorDefecto, validadores]
      name: [null, Validators.required],
      startDate: [],
      endDate: [],
    });

    console.log("Se esta editando", this.editingCourse);

    if(this.editingCourse){
      // Para que en el modal se muestre los datos del curso a modificar
      this.curseForm.patchValue(this.editingCourse);
    }
  }

  onSubmit():void{ //Para cuando se de clic en guardar
    if(this.curseForm.valid){
      console.log(this.curseForm.value);
      this.matDialogRef.close(this.curseForm.value); //Para cerrar el modal, opcionalmente se puede enviar el valor del formulario.
    }else{
      //mostrar error
    }


  }
}
