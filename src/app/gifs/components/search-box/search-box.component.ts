import { Component, ElementRef, ViewChild, viewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template: `
    <h5>Buscar:</h5>
    <input type="text"
      class="form-control"
      placeholder="Buscar gifs..."
      (keyup.enter)="searchTag()"
      #txtTagInput
    >
  `
})

export class SearchBoxComponent {

  // Decorador @ViewChild para obtener una referencia al input con la referencia local 'txtTagInput'
  @ViewChild('txtTagInput')
  // Declaración de la propiedad con el tipo ElementRef<HTMLInputElement>
  public tagInput!:ElementRef<HTMLInputElement>;

  constructor( private gifsService: GifsService ) { }

  // searchTag( newTag:string ){
  searchTag() {
    // Obtiene el valor actual del input usando la referencia del elemento nativo
    const newTag = this.tagInput.nativeElement.value;

    //manda newTag a searchTag
    this.gifsService.searchTag(newTag);

    this.tagInput.nativeElement.value = '';

    // console.log({newTag});
  }
}
