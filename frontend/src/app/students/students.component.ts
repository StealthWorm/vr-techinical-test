import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { StudentsService } from './students.service';
import { Student, ResponseStudents, StudentColumns } from './student.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = StudentColumns.map(({ key }) => key);
  dataSource = new MatTableDataSource<Student>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  responseStudents!: ResponseStudents;
  isModalOpen = false;
  student_id?: string;
  type?: string = 'create';

  constructor(private studentService: StudentsService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.studentService
      .getStudents()
      .subscribe(
        res => {
          this.responseStudents = res;
          this.dataSource.data = res.students;
          // console.table(this.dataSource.data)
        }
      )
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  openModal() {
    this.isModalOpen = !this.isModalOpen;
  }

  editCourse(id: string) {
    this.type = 'update'
    this.student_id = id
    this.openModal()
  }

  deleteCourse(id: string) {
    this.type = 'delete'
    this.student_id = id
    this.openModal()
  }
}
