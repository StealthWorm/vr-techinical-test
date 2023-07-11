import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CoursesService } from './courses.service';
import { Course, CourseColumns, RequestCreate, ResponseCourses } from './course.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = CourseColumns.map(({ key }) => key);
  dataSource = new MatTableDataSource<Course>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  responseCourses!: ResponseCourses;
  isModalOpen = false;
  course_id?: string;
  type?: string = 'create';

  constructor(private courseService: CoursesService, public dialog: MatDialog) { }

  //exec toda vez que o componente é inicializado
  // subscribe é uma assinatura
  ngOnInit(): void {
    this.courseService
      .getCourses()
      .subscribe(
        res => {
          this.responseCourses = res;
          this.dataSource.data = res.courses;
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
    this.course_id = id
    this.openModal()
  }

  deleteCourse(id: string) {
    this.type = 'delete'
    this.course_id = id
    this.openModal()
  }
}
