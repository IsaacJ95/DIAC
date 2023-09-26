import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { RegisterDocumentCurricularService } from '../../services/register-document-curricular.service';
import { Course, Destreza, Criteria } from 'src/app/modules/destreza/interfaces/asignatura.interface';


@Component({
  selector: 'app-criterios-evaluacion',
  templateUrl: './criterios-evaluacion.component.html',
  styleUrls: ['./criterios-evaluacion.component.css']
})
export class CriteriosEvaluacionComponent implements OnInit {

  primerQuimestre: String = '' 
  reajustes: String=''
  segundoQuimestre: String=''

  CriteriosListSelected: Criteria[] = []
  CriteriosSeleccionados: number[] = []

  //Variables para los texts areas
  destrezasActuales: Destreza[] = []
  criteriosActualues: Criteria[] = []

  constructor(
    private navigationService: NavigationService,
    public registerDocumentCurricular: RegisterDocumentCurricularService
  ) {}



  ngOnInit(): void {
    this.primerQuimestre = this.registerDocumentCurricular.docCurricularForm.value.criterios
    console.log(this.registerDocumentCurricular.docCurricularForm.value)
  }

  openCriterios(asignatura: Course) {
    this.criteriosActualues = asignatura.criterios
  }


  fillResources(e: any, criterio: Criteria) {
    if (e.target.checked) {
      this.CriteriosListSelected.push(criterio)
      this.CriteriosSeleccionados.push(criterio.id)
    } else {
      this.CriteriosListSelected = this.CriteriosListSelected.filter(obj => obj.id !== criterio.id)
      this.CriteriosSeleccionados = this.CriteriosSeleccionados.filter(id => id !== criterio.id)
    }
    let resultado = new Set(this.CriteriosListSelected);
    this.CriteriosListSelected = [];
    resultado.forEach(element => {
      this.CriteriosListSelected.push(element)
      this.registerDocumentCurricular.docCurricularForm.controls['criterios'].setValue(element.nameCriteria)
    });
    const criteriosArr = new Set(this.CriteriosListSelected);
    const idsCriteriasArr = new Set(this.CriteriosSeleccionados);
    let resultCriteria = [...criteriosArr];
    let resultIdsCriterias = [...idsCriteriasArr];
    this.registerDocumentCurricular.criteriasListSelect = resultCriteria
    this.registerDocumentCurricular.criteriasSeleccionados = resultIdsCriterias
  }

  
  renameForId(name: string) {
    return '#' + name.replace(/ /g, '')
  }

  renameForIdCollapse(name: string) {
    return name.replace(/ /g, '')
  }

  nextPage() {
    this.navigationService.toggleItemActivated(18);
  }
}