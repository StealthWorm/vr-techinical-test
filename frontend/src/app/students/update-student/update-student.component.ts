import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StudentsService } from '../students.service';
import { Router } from '@angular/router';
import { RequestUpdate } from '../student.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.css']
})
export class UpdateStudentComponent implements OnInit {
  @Input() id!: string;
  @Input() isModalOpen = false;
  @Output() openModal = new EventEmitter<any>();

  request!: RequestUpdate;

  constructor(
    private studentsService: StudentsService,
    private route: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.studentsService
      .getStudent(this.id)
      .subscribe({
        next: (res) => {
          this.request = {
            name: res.student.props.name,
          }
        },
        error: (err) => {
          console.log(err)
          this.openSnackBar(err.error.message, 'close')
        }
      }
      )
  };

  update() {
    this.studentsService
      .updateStudent(this.id, this.request)
      .subscribe({
        complete: () => {
          window.alert('Aluno Atualizado com sucesso!')
          this.route.navigate(['/students']);
          window.location.reload()
        },
        error: (err) => {
          console.log(err)
          this.openSnackBar(err.error.message, 'close')
        }
      }
      )
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
