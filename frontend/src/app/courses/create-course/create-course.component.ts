import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RequestCreate, ResponseCreate } from '../course.model';
import { CoursesService } from '../courses.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent implements OnInit {
  @Input() isModalOpen = false;
  @Output() openModal = new EventEmitter<any>();

  request: RequestCreate = {
    description: '',
    program: '',
  }

  constructor(
    private courseService: CoursesService,
    private route: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.courseService
      .createCourse(this.request)
      .subscribe({
        complete: () => {
          window.alert('Criado com sucesso')
          this.route.navigate(['/courses']);
          window.location.reload()
        },
        error: (err) => {
          console.log(err)
          this.openSnackBar(err.error.message.join('\n'), 'close')
        }
      }
      );
  }

  cancel() {
    this.isModalOpen = !this.isModalOpen;
    this.route.navigate(['/courses']);
    window.location.reload()
  }

  placeholdersFilled(): boolean {
    return !!this.request.description && !!this.request.program;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
