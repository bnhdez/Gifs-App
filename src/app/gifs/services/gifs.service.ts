import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class GifsService {
  private _tagsHistory:string[] = [];

  get tagsHistory(){
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string) {
    //graba en minuscula pero pipe sigue desplegando ordenado
    tag = tag.toLowerCase();

    if ( this.tagsHistory.includes(tag) ) {
      //borra tag que cumple la condicion
      //es decir los tags que ya estan almacenados que sean iguales
      //si son diferentes los deja pasar
      this._tagsHistory = this._tagsHistory.filter( (oldTag) => oldTag !== tag )
    }

    //agrega nuevo tag al inicio
    this._tagsHistory.unshift( tag );
  }

  //agrega tag al principio del array para guardarlo en ese array
  public searchTag( tag:string ):void {
    //si no escibre no pasa nada
    if ( tag.length === 0 ) return;

    this.organizeHistory(tag);

    this._tagsHistory.unshift( tag );
  }


}
