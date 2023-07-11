import { Component, Input, OnInit } from '@angular/core';
import { CoursesService } from '../courses.service';
import { Router } from '@angular/router';
import { Course } from '../course.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-course',
  templateUrl: './delete-course.component.html',
  styleUrls: ['./delete-course.component.css']
})
export class DeleteCourseComponent implements OnInit {
  @Input() id!: string;
  @Input() type!: string;
  @Input() isModalOpen = false;

  course!: Course;

  constructor(
    private courseService: CoursesService,
    private route: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.courseService
      .getCourse(this.id)
      .subscribe({
        next: (res) => {
          this.course = res.course;
        },
        error: (err) => {
          console.log(err)
          this.openSnackBar(err.error.message, 'close')
          this.route.navigate(['/courses']);
          window.location.reload()
        }
      })
  };

  delete() {
    this.courseService
      .deleteCourse(this.id)
      .subscribe({
        next: () => {
          window.alert('Removido com sucesso!')
          this.route.navigate(['/courses']);
          window.location.reload()
        },
        error: (err) => {
          console.log(err)
          this.openSnackBar(err.error.message, 'close')
        }
      })
  }

  cancel() {
    this.id = '';
    this.isModalOpen = !this.isModalOpen;
    this.route.navigate(['/courses']);
    window.location.reload()
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
