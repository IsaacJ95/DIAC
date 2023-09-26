import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { RegisterDocumentCurricularService } from '../../services/register-document-curricular.service';

@Component({
  selector: 'app-metodologia',
  templateUrl: './metodologia.component.html',
  styleUrls: ['./metodologia.component.css']
})
export class MetodologiaComponent implements OnInit {

  metodologia: string = ''

  metodologiasListSelected: string[] = []
  metodologiasSeleccionados: string[] = []

  constructor(
    private navigationService: NavigationService,
    private registerDocumentCurricular: RegisterDocumentCurricularService,
  ) { }

  ngOnInit(): void {
    this.metodologia = this.registerDocumentCurricular.docCurricularForm.value.metodology
    this.metodologiasListSelected = this.registerDocumentCurricular.methodologiasListSelect
    this.metodologiasSeleccionados = this.registerDocumentCurricular.methodologiasSeleccionados
  }


  fillMetodologia() {
    this.registerDocumentCurricular.docCurricularForm.controls['metodology'].setValue(this.metodologia)
    
    this.metodologiasListSelected = [this.metodologia];
    const metodologiasArr = new Set(this.metodologiasListSelected);
    let resultMetodologias = [...metodologiasArr];
    this.registerDocumentCurricular.methodologiasListSelect = resultMetodologias
    console.log(resultMetodologias)
  }

  nextPage() {
    this.navigationService.toggleItemActivated(16)
  }

}
