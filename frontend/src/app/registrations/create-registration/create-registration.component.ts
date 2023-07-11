import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RegistrationsService } from '../registrations.service';
import { Router } from '@angular/router';
import { RequestCreate, ResponseRegistrations } from '../registration.model';
import { Course, ResponseCourses } from 'src/app/courses/course.model';
import { ResponseStudents, Student } from 'src/app/students/student.model';
import { CoursesService } from 'src/app/courses/courses.service';
import { StudentsService } from 'src/app/students/students.service';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-registration',
  templateUrl: './create-registration.component.html',
  styleUrls: ['./create-registration.component.css']
})
export class CreateRegistrationComponent implements OnInit {
  @Input() isModalOpen = false;
  @Output() openModal = new EventEmitter<any>();

  studentControl = new FormControl('', [Validators.required]);
  courseControl = new FormControl('', [Validators.required]);

  responseRegistrations!: ResponseRegistrations;
  responseStudents!: ResponseStudents;
  responseCourses!: ResponseCourses;
  courses: Course[] = [];
  students: Student[] = [];

  request: RequestCreate = {
    codCourse: '',
    codStudent: '',
  }

  message: string[] = [];

  constructor(
    private registrationService: RegistrationsService,
    private courseService: CoursesService,
    private studentService: StudentsService,
    private route: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.studentService.getStudents().subscribe(res => { this.students = res.students })
    this.courseService.getCourses().subscribe(res => { this.courses = res.courses })
  }

  onSubmit() {
    this.registrationService
      .createRegistration(this.request)
      .subscribe({
        complete: () => {
          window.alert('Criado com sucesso')
          this.route.navigate(['/registrations']);
          window.location.reload()
        },

        error: (err) => {
          console.log(err)
          this.openSnackBar(err.error.message, 'close')
        }
      }
      );
  }

  cancel() {
    this.isModalOpen = !this.isModalOpen;
    this.route.navigate(['/registrations']);
    window.location.reload()
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
