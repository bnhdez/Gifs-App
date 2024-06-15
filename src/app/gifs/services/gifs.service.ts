import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class GifsService {
  private _tagsHistory:string[] = [];
  //GIPHY API WEB TOKEN
  private apiKey: string = 'icgYhKfB1SK6cdNTpMRFioQcwotZekCY';

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
  }

  public searchTag( tag:string ):void {
    //si no escribe no pasa nada
    if ( tag.length === 0 ) return;

    this.organizeHistory(tag);

    //OBSERVABLE: puede estar emitiendo diferentes valores
    this.http.get('https://api.giphy.com/v1/gifs/search?api_key=icgYhKfB1SK6cdNTpMRFioQcwotZekCY&q=cheeseburgers&limit=10')
      .subscribe( resp => {
        console.log(resp);
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
