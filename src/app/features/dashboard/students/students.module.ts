import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students.component';
import { StudentDialogComponent } from './components/student-dialog/student-dialog.component';
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule} from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {SharedModule} from "../../../shared/shared.module";
import { StudentDetailComponent } from './components/student-detail/student-detail.component';


@NgModule({
  declarations: [
    StudentsComponent,
    StudentDialogComponent,
    StudentDetailComponent
  ],
  exports: [StudentsComponent],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatTableModule,
    SharedModule,
    MatProgressBarModule
  ]
})
export class StudentsModule { }
