import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({providedIn: 'root'})
export class GifsService {

  //contiene lista de nuestros gifs
  public gifList:Gif[] = [];

  private _tagsHistory:string[] = [];
  //GIPHY API WEB TOKEN
  private apiKey: string = 'icgYhKfB1SK6cdNTpMRFioQcwotZekCY';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor ( private http:HttpClient ){ }

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

    //recorta el array hasta los 10 elementos
    this._tagsHistory = this.tagsHistory.splice( 0,10 );

    this.saveLocalStorage();
  }

  //guardo el history en local storage como string[] tipo JSON
  private saveLocalStorage():void{
    localStorage.setItem( 'history', JSON.stringify(this._tagsHistory) )
  }

  public searchTag( tag:string ):void {
    //si no escribe no pasa nada
    if ( tag.length === 0 ) return;

    this.organizeHistory(tag);

    //parametros de la URL
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', tag)

    //OBSERVABLE: puede estar emitiendo diferentes valores
    //get dato generico de tipo SearchResponse interfaz
    //objetos dentro tambien son de este dato
    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, { params })
      .subscribe( resp => {
        this.gifList = resp.data;
      })
  }

  // //forma javascript
  // async searchTag(tag: string):Promise<void> {
  //   //si no escribe no pasa nada
  //   if (tag.length === 0) return;

  //   this.organizeHistory(tag);

  //   //FORMA 1
  //   fetch('https://api.giphy.com/v1/gifs/search?api_key=icgYhKfB1SK6cdNTpMRFioQcwotZekCY&q=cheeseburgers&limit=10')
  //     .then( res => res.json() )
  //     .then( data => console.log( data ) );

  //   //FORMA 2
  //   const resp = await fetch('https://api.giphy.com/v1/gifs/search?api_key=icgYhKfB1SK6cdNTpMRFioQcwotZekCY&q=cheeseburgers&limit=10');
  //   const data = await resp.json();
  //   console.log( data );

  // }


}
