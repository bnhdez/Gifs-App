import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class GifsService {
  private _tagsHistory:string[] = [];

  get tagsHistory(){
    return [...this._tagsHistory];
  }

  //agrega tag al principio del array para guardarlo en ese array
  public searchTag( tag:string ):void {
    this._tagsHistory.unshift( tag );
  }

}
