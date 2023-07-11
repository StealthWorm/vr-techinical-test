import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RequestCreate } from '../student.model';
import { Router } from '@angular/router';
import { StudentsService } from '../students.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})
export class CreateStudentComponent implements OnInit {
  @Input() isModalOpen = false;
  @Output() openModal = new EventEmitter<any>();

  request: RequestCreate = {
    name: '',
  }

  constructor(
    private studentService: StudentsService,
    private route: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.studentService
      .createStudent(this.request)
      .subscribe({
        complete: () => {
          window.alert('Criado com sucesso')
          this.route.navigate(['/students']);
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
    this.route.navigate(['/students']);
    window.location.reload()
  }

  placeholdersFilled(): boolean {
    return !!this.request.name;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
