import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './courses/courses.component';
import { CreateCourseComponent } from './courses/create-course/create-course.component';
import { UpdateCourseComponent } from './courses/update-course/update-course.component';
import { DeleteCourseComponent } from './courses/delete-course/delete-course.component';
import { StudentsComponent } from './students/students.component';
import { RegistrationsComponent } from './registrations/registrations.component';

const routes: Routes = [
  { path: 'courses', component: CoursesComponent, },
  // { path: 'courses/create', component: CreateCourseComponent },
  // { path: 'courses/update/:id', component: UpdateCourseComponent },
  // { path: 'courses/delete/:id', component: DeleteCourseComponent },
  { path: 'students', component: StudentsComponent },
  { path: 'registrations', component: RegistrationsComponent },
  { path: '**', redirectTo: '/courses', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
