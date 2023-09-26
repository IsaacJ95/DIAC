import { Course, Criteria, Destreza, Objective } from '../../destreza/interfaces/asignatura.interface';
import { Teacher } from '../../docente/interfaces/docente.interface';

export interface ItemPage {
  id: number;
  description: string;
  link: string;
  activated: boolean;
  passed: boolean;
}

export interface DocumentBodyCreate {
  duration: string;
  infoPedagogica: string;
  developData: string;
  familyBack: string;
  historySchool: string;
  styleLearning: string;
  typeIntelligence: string;
  dataContextEducation: string;
  dataContextFamily: string;
  dataContextSocial: string;
  identificationEducationalNeed: string;
  adaptationAccessCurriculum: string;
  specializedIntExt: string;
  metodologias: string[];
  resources: string[];
  results: string[];
  StudentId: number;
  InstitutionId: number;
  courses: number[];
  teachers: number[];
  criterias: Criteria[];
  destrezas: Destreza[];
  objectives: Objective[];
  toDo: string;
  howToDo: string;
}
