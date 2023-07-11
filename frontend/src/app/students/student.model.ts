export interface ResponseStudents {
  students: Student[]
}

export interface Student {
  _id: string
  props: {
    name: string
    createdAt: Date | string
    courses?: any[]
  }
  isSelected: boolean;
  isEdit: boolean;
}

//modelos para o create Student
export interface RequestCreate {
  name: string
}

export interface ResponseCreate {
  _id: string
  props: {
    name: string
    createdAt: Date | string
  }
}

// modelos para o Get Student
export interface ResponseStudent {
  student: Student
}

// modelos para o Update Student
export interface RequestUpdate {
  name: string
}

export interface ResponseUpdate {
  _id: string
  props: {
    name: string
    createdAt: Date | string
  }
}

export const StudentColumns = [
  {
    key: 'name',
    type: 'text',
    label: 'Nome',
  },
  {
    key: 'actions',
    type: '',
    label: '',
  },
];
