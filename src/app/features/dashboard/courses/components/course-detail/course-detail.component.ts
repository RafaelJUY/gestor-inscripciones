import {Component, OnInit} from '@angular/core';
import {CoursesService} from "../../../../../core/services/courses.service";
import {Observable} from "rxjs";
import {ICourse} from "../../model/ICourse";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Lesson} from "../../model/Lesson";
import {LessonService} from "../../../../../core/services/lesson.service";
import {ILesson} from "../../model/ILesson";

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.scss'
})
export class CourseDetailComponent implements OnInit{
  course$: Observable<ICourse | undefined>;
  private courseId: string;

  displayedColumns: string[] = ['idCourse', 'date', 'topic', 'startTime', "endTime", "actions"];
  dataSource: ILesson[] = [];
  isLoading: boolean = false; // para mostrar animación de carga

  curseForm: FormGroup;
  constructor(
    private coursesService: CoursesService,
    private lessonService: LessonService,
    private activatedRoute: ActivatedRoute, //para obtener acceso a la url y obtener el parametro
    private fb: FormBuilder,
  ) {
    this.courseId = this.activatedRoute.snapshot.params["id"];//Colocar el mismo parametro "id" que se definio en app-routing module
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
    this.lessonService.getAllLessonByCourseId(this.courseId).subscribe({
      next: (lessons) => {
        this.dataSource = [...this.orderLessonByDate(lessons)];
      },
      complete: () => {
        this.isLoading = false;
      },
    })
  }

  onSubmit():void{ //Para cuando se de clic en guardar
    if(this.curseForm.valid){
      this.isLoading = true;
      let lesson: ILesson = {
        idCourse: this.courseId,
        date: this.curseForm.value["date"],
        topic: this.curseForm.value["topic"],
        startTime: this.curseForm.value["startTime"],
        endTime: this.curseForm.value["endTime"]
      }

      this.lessonService.addLesson(lesson).subscribe({
        next: lesson => {
          this.dataSource.push(lesson);
          this.dataSource = [...this.orderLessonByDate(this.dataSource)];
        },
        complete: () => {this.isLoading = false}
      })

      this.curseForm.reset();
    }else{
      alert("La Leccion no es valida")
    }
  }

  private orderLessonByDate(lessons: ILesson[]): ILesson[] {
    return lessons.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateA - dateB;
    });
  }
  deleteLessonById(idLesson: string){
    if (confirm("Esta seguro de eliminar la lección?")) {
      this.isLoading = true;
      this.lessonService.deleteLessonbyId(idLesson).subscribe({
        next: (lessonDeleted) => {
          // this.dataSource = [...lesson];
          this.dataSource = [...this.dataSource.filter(lesson => lesson.id !== lessonDeleted.id)];
        },
        complete: () => {
          this.isLoading = false;
        }
      })
    }
  }

}
