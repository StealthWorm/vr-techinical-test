import { Course } from "../courses/course.model"
import { Student } from "../students/student.model"

// GET Matrículas
export interface ResponseRegistrations {
  registrations: Registration[]
}

export interface Registration {
  id: string
  createdAt: string
  codigoAluno: string
  codigoCurso: string
  curso: Curso
  aluno: Aluno
}

export interface Curso {
  codigo: string
  descricao: string
  ementa: string
  createdAt: string
}

export interface Aluno {
  codigo: string
  nome: string
  createdAt: string
}

// POST Matrícula
export interface RequestCreate {
  codCourse: string
  codStudent: string
}

export interface ResponseCreate {
  _id: string
  props: {
    codStudent: string
    codCourse: string
    createdAt: string
  }
}

//GET by id Matrícula
// modelos para o Get Student
export interface ResponseRegistration {
  registration: Registration
}

export const RegistrationColumns = [
  {
    key: 'id',
    type: 'text',
    label: 'ID',
  },
  {
    key: 'createdAt',
    type: 'date',
    label: 'Data de Criação',
  },
  {
    key: 'descricao',
    type: 'text',
    label: 'Descrição do Curso',
  },
  {
    key: 'ementa',
    type: 'text',
    label: 'Ementa do Curso',
  },
  {
    key: 'nome',
    type: 'text',
    label: 'Nome do Aluno',
  },
  {
    key: 'actions',
    type: '',
    label: '',
  },
];

