import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ICourse} from "../../model/ICourse";
import {Course} from "../../model/Course";

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
    @Inject(MAT_DIALOG_DATA) public editingCourse?: ICourse
  )
  {
    // matDialogRef = referencia al dialogo/modal actual.
    this.curseForm = this.fb.group({
      // name: [valorPorDefecto, validadores]
      name: [null, Validators.required],
      startDate: [],
      endDate: [],
    });

    if(this.editingCourse){
      // Para que en el modal se muestre los datos del curso a modificar
      this.editingCourse = this.convertCourseToFormCourseValues(this.editingCourse);
      this.curseForm.patchValue(this.editingCourse);
    }
  }

  /** *
   * Método para convertir los nombres de los atributos quitando el _ que tienen como prefijo.
   * Los objetos fueron creados mediante una clase que tiene atributos privados, por eso tienen _ como prefijo.
   * El formulario espera los nombres de los atributos sin los _.
   * Sin este método los valores previos del objeto a modificar no se cargarían en el formulario.
   */
  private convertCourseToFormCourseValues(course: ICourse): ICourse{
    if (course instanceof Course){
      return {
        id: course.id,
        name: course.name,
        startDate: course.startDate,
        endDate: course.endDate,
      };
    }
    return course;
  }
  onSubmit():void{ //Para cuando se de clic en guardar
    if(this.curseForm.valid){
      this.matDialogRef.close(this.curseForm.value); //Para cerrar el modal, opcionalmente se puede enviar el valor del formulario.
    }else{
      alert("El courso no es valido")
    }
  }
}
