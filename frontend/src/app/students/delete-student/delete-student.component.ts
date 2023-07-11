import { Component, Input, OnInit } from '@angular/core';
import { StudentsService } from '../students.service';
import { Router } from '@angular/router';
import { Student } from '../student.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-student',
  templateUrl: './delete-student.component.html',
  styleUrls: ['./delete-student.component.css']
})
export class DeleteStudentComponent implements OnInit {
  @Input() id!: string;
  @Input() type!: string;
  @Input() isModalOpen = false;

  student!: Student;

  constructor(
    private studentService: StudentsService,
    private route: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    // this.id = this.routeParam.snapshot.paramMap.get('id') as string;
    this.studentService
      .getStudent(this.id)
      .subscribe({
        next: (res) => {
          this.student = res.student;
        },
        error: (err) => {
          console.log(err)
          this.openSnackBar(err.error.message, 'close')
          this.route.navigate(['/students']);
          window.location.reload()
        }
      })
  };

  delete() {
    this.studentService
      .deleteStudent(this.id)
      .subscribe({
        next: (res) => {
          window.alert('Removido com sucesso!')
          this.route.navigate(['/students']);
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
    this.route.navigate(['/students']);
    window.location.reload()
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
