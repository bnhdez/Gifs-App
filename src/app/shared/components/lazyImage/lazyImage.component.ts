import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'shared-lazy-image',
    templateUrl: './lazyImage.component.html',
})
export class LazyImageComponent implements OnInit {
  @Input()
  public url!:string;

  @Input()
  public alt:string = '';

  //false porque cuando se ha cargado, lazy-image no se ha cargado
  private hasLoaded:boolean = false;

  ngOnInit(): void {
    if ( !this.url ) throw new Error('URL property is required');
  }

  onLoad(){
    console.log('Image loaded');
    this.hasLoaded = true;

  }
}
