import {Component, OnInit} from '@angular/core';
import {CoursesService} from "../../../../../core/services/courses.service";
import {Observable} from "rxjs";
import {ICourse} from "../../model/ICourse";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Lesson} from "../../model/Lesson";
import {LessonService} from "../../../../../core/services/lesson.service";

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.scss'
})
export class CourseDetailComponent implements OnInit{
  course$: Observable<ICourse | undefined>;
  private courseId: number;

  displayedColumns: string[] = ['idCourse', 'date', 'topic', 'startTime', "endTime", "actions"];
  dataSource: Lesson[] = [];
  isLoading: boolean = false; // para mostrar animación de carga

  curseForm: FormGroup;
  constructor(
    private coursesService: CoursesService,
    private lessonService: LessonService,
    private activatedRoute: ActivatedRoute, //para obtener acceso a la url y obtener el parametro
    private fb: FormBuilder,
  ) {
    this.courseId = Number(this.activatedRoute.snapshot.params["id"]);//Colocar el mismo parametro "id" que se definio en app-routing module
    this.course$ = this.coursesService.getCourseById(this.courseId);

    this.curseForm = this.fb.group({
      // name: [valorPorDefecto, validadores]
      date: ['', Validators.required],
      topic: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      startTime: ['', [Validators.required, Validators.min(0), Validators.max(23)]],
      endTime: ['', [Validators.required, Validators.min(0), Validators.max(23)]],
    });
  }
  ngOnInit(): void {
    this.loadLesson();
  }

  loadLesson(){
    this.isLoading = true;
    this.lessonService.getLessonByCourseId(this.courseId).subscribe({
      next: (lessons) => {
        this.dataSource = lessons;
      },
      complete: () => {
        this.isLoading = false;
      },
    })
  }

  onSubmit():void{ //Para cuando se de clic en guardar
    if(this.curseForm.valid){
      this.isLoading = true;
      let lesson: Lesson = new Lesson(
        this.courseId,
        this.curseForm.value["date"],
        this.curseForm.value["topic"],
        this.curseForm.value["startTime"],
        this.curseForm.value["endTime"])

      this.lessonService.addLesson(lesson).subscribe({
        next: lesson => {
          lesson = this.orderLessonByDate(lesson);
          this.dataSource = [...lesson]
        },
        complete: () => {this.isLoading = false}
      })

      this.curseForm.reset();

      // let course = this.coursesService.addLessonByCourse(lesoon);
      // console.log(course);
      // this.matDialogRef.close(this.curseForm.value); //Para cerrar el modal, opcionalmente se puede enviar el valor del formulario.
    }else{
      alert("La Leccion no es valida")
    }
  }

  private orderLessonByDate(lesson:Lesson[]){
    return lesson.sort((a, b) => a.date.getTime() - b.date.getTime());
  }
  deleteLessonByCourseId(lesson: Lesson){
    if (confirm("Esta seguro de eliminar la lección?")) {
      this.isLoading = true;
      this.lessonService.deleteLesson(lesson).subscribe({
        next: (lesson) => {
          this.dataSource = [...lesson];
        },
        complete: () => {
          this.isLoading = false;
        }
      })
    }
  }

}
