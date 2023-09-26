import { Component, OnInit } from '@angular/core';
import { RegisterDocumentCurricularService } from '../../services/register-document-curricular.service';

import Swal from 'sweetalert2';
import { DocumentBodyCreate } from '../../interfaces/Items-estudiante.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resultados-finales',
  templateUrl: './resultados-finales.component.html',
  styleUrls: ['./resultados-finales.component.css'],
})
export class ResultadosFinalesComponent implements OnInit {
  resultadosFinales: string = '';

  resultsListSelected: string[] = []
  resultsSeleccionados: string[] = []

  constructor(
    private router: Router,
    private registerDocumentCurricular: RegisterDocumentCurricularService
  ) { }

  ngOnInit(): void {
    this.resultadosFinales =
      this.registerDocumentCurricular.docCurricularForm.value.resultFinal;
  }

  fillResources() {
    this.registerDocumentCurricular.docCurricularForm.controls[
      'resultFinal'
    ].setValue(this.resultadosFinales);
    this.resultsListSelected = [this.resultadosFinales]
    const resultsArr = new Set(this.resultsListSelected);
    let resultResults = [...resultsArr];
    this.registerDocumentCurricular.resultsListSelect = resultResults
  }

  saveDocumentCurricular() {
    const spinner = document.getElementById('spinner');
    spinner?.classList.remove('d-none');
    if (this.registerDocumentCurricular.validateResultFinal()) {
      const doc: DocumentBodyCreate = {
        StudentId:
          this.registerDocumentCurricular.docCurricularForm.value.idStudent,
        InstitutionId:
          this.registerDocumentCurricular.docCurricularForm.value.idInstitution,
        duration:
          this.registerDocumentCurricular.docCurricularForm.value.duration,
        infoPedagogica:
          this.registerDocumentCurricular.docCurricularForm.value
            .infPhicopedagogico,
        developData:
          this.registerDocumentCurricular.docCurricularForm.value
            .dateDevelopment,
        familyBack:
          this.registerDocumentCurricular.docCurricularForm.value.antecedentes,
        historySchool:
          this.registerDocumentCurricular.docCurricularForm.value.history,
        styleLearning:
          this.registerDocumentCurricular.docCurricularForm.value.stylelearning,
        typeIntelligence:
          this.registerDocumentCurricular.docCurricularForm.value
            .tipeIntelligence,
        dataContextEducation:
          this.registerDocumentCurricular.docCurricularForm.value
            .contextEducation,
        dataContextFamily:
          this.registerDocumentCurricular.docCurricularForm.value.contextFamily,
        dataContextSocial:
          this.registerDocumentCurricular.docCurricularForm.value.contextSocial,
        identificationEducationalNeed:
          this.registerDocumentCurricular.docCurricularForm.value
            .educationalNeed,
        adaptationAccessCurriculum:
          this.registerDocumentCurricular.recursosSeleccionados.toString(),
        specializedIntExt:
          this.registerDocumentCurricular.profesionalesSeleccionados.toString(),
        metodologias:
          this.registerDocumentCurricular.methodologiasListSelect,
        resources: this.registerDocumentCurricular.resoursesListSelect,
        results: this.registerDocumentCurricular.resultsListSelect,
        courses: this.registerDocumentCurricular.asignaturasSeleccionadas,
        teachers: this.registerDocumentCurricular.docentesSeleccionados,
        criterias: this.registerDocumentCurricular.criteriasListSelect,
        objectives: this.registerDocumentCurricular.objetivosListSelect,
        destrezas: this.registerDocumentCurricular.destrezasListSelect,
        toDo: this.registerDocumentCurricular.docCurricularForm.value.toDo,
        howToDo: this.registerDocumentCurricular.docCurricularForm.value.howToDo,
      };

      //  console.log('doc ->', doc);

      // this.registerDocumentCurricular.addDocumento(doc).subscribe(
      //   resp => {
      //     console.log(resp)
      //   },
      //   err => {
      //     console.log(err)
      //     Swal.fire('Error al realizar el registro del documento', '', 'error')

      //   }
      // )

      this.registerDocumentCurricular.addDocumento(doc).subscribe({
        next: (resp) => {
          console.log(resp)
          // this.router.navigateByUrl('/dashboard/adaptacion-curricular/lista')
        },
        error: (err) => {
          console.log(err)
          Swal.fire('Error al realizar el registro del documento', '', 'error');
        },
        complete: () => {
          spinner?.classList.add('d-none');
          Swal.fire('Documento curricular Guardado con exito', '', 'success');
          setTimeout(() => {
            this.router.navigateByUrl('/dashboard/adaptacion-curricular/lista')
          }, 2000,);
        },
      });
    } else {
      Swal.fire('El campo no puede quedar vacio!', '', 'error');
    }
  }
}
