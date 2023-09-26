import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { RegisterDocumentCurricularService } from '../../services/register-document-curricular.service';

@Component({
  selector: 'app-recursos',
  templateUrl: './recursos.component.html',
  styleUrls: ['./recursos.component.css']
})
export class RecursosComponent implements OnInit {

  recursos: string = ''

  resoursesListSelected: string[] = []
  resoursesSeleccionados: string[] = []

  constructor(
    private navigationService: NavigationService,
    private registerDocumentCurricular: RegisterDocumentCurricularService,
  ) { }

  ngOnInit(): void {
    this.recursos = this.registerDocumentCurricular.docCurricularForm.value.resources
    this.resoursesListSelected = this.registerDocumentCurricular.resoursesListSelect
    this.resoursesSeleccionados = this.registerDocumentCurricular.resoursesSeleccionados
  }

  fillResources() {
    this.registerDocumentCurricular.docCurricularForm.controls['resources'].setValue(this.recursos)
    this.resoursesListSelected=[this.recursos]
    const resoursesArr = new Set(this.resoursesListSelected);
    let resultResourses = [...resoursesArr];
    this.registerDocumentCurricular.resoursesListSelect = resultResourses
    console.log(resultResourses)
  }

  nextPage() {
    this.navigationService.toggleItemActivated(17)
  }

}
