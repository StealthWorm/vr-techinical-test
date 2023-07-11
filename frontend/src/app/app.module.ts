import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoursesComponent } from './courses/courses.component';
import { HttpClientModule } from '@angular/common/http';
import { CreateCourseComponent } from './courses/create-course/create-course.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateCourseComponent } from './courses/update-course/update-course.component';
import { MatNativeDateModule, MatPseudoCheckboxModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DeleteCourseComponent } from './courses/delete-course/delete-course.component';
import { StudentsComponent } from './students/students.component';
import { RegistrationsComponent } from './registrations/registrations.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { DeleteStudentComponent } from './students/delete-student/delete-student.component';
import { UpdateStudentComponent } from './students/update-student/update-student.component';
import { CreateStudentComponent } from './students/create-student/create-student.component';
import { CreateRegistrationComponent } from './registrations/create-registration/create-registration.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DeleteRegistrationComponent } from './registrations/delete-registration/delete-registration.component';

@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    CreateCourseComponent,
    UpdateCourseComponent,
    DeleteCourseComponent,
    StudentsComponent,
    RegistrationsComponent,
    DeleteStudentComponent,
    UpdateStudentComponent,
    CreateStudentComponent,
    CreateRegistrationComponent,
    DeleteRegistrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatNativeDateModule,
    FormsModule,
    MatPseudoCheckboxModule,
    MatDialogModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatIconModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatSelectModule,
    MatSnackBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
