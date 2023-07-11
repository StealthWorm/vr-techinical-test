import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CoursesService } from '../courses.service';
import { Router } from '@angular/router';
import { RequestUpdate } from '../course.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-course',
  templateUrl: './update-course.component.html',
  styleUrls: ['./update-course.component.css']
})
export class UpdateCourseComponent implements OnInit {
  @Input() id!: string;
  @Input() isModalOpen = false;
  @Output() openModal = new EventEmitter<any>();

  request!: RequestUpdate;

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
          this.request = {
            description: res.course.props.description,
            program: res.course.props.program
          }
        },
        error: (err) => {
          console.log(err)
          this.openSnackBar(err.error.message.join('\n'), 'close')
        }
      }
      )
  };

  update() {
    this.courseService
      .updateCourse(this.id, this.request)
      .subscribe({
        complete: () => {
          window.alert('Curso Atualizado com sucesso!')
          this.route.navigate(['/courses']);
          window.location.reload()
        },
        error: (err) => {
          console.log(err)
          window.alert(err.error.message)
        }
      }
      )
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
