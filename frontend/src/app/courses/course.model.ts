export interface ResponseCourses {
  courses: Course[]
}

export interface Course {
  _id: string
  props: {
    description: string
    program: string
    createdAt: Date | string
    students?: any[]
  }
  isSelected: boolean;
  isEdit: boolean;
}

//modelos para o create course
export interface RequestCreate {
  description: string
  program: string
}

export interface ResponseCreate {
  _id: string
  props: {
    program: string
    description: string
    createdAt: Date | string
  }
}

// modelos para o Get Course
export interface ResponseCourse {
  course: Course
}

// modelos para o Update Course
export interface RequestUpdate {
  program: string
  description: string
}

export interface ResponseUpdate {
  _id: string
  props: {
    program: string
    description: string
    createdAt: Date | string
  }
}

export const CourseColumns = [
  {
    key: 'description',
    type: 'text',
    label: 'Descrição',
  },
  {
    key: 'program',
    type: 'text',
    label: 'Ementa',
  },
  {
    key: 'actions',
    type: '',
    label: '',
  },
];
