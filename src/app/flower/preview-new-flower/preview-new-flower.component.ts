import { Component, Input } from '@angular/core';

@Component({
  selector: 'preview-new-flower',
  templateUrl: './preview-new-flower.component.html',
  styles: [
  ]
})

export class PreviewNewFlowerComponent {

  @Input()
  public urls : any[] = [];
  @Input()
  public preview_name : string = "Nombre de la flor";
  @Input()
  public preview_description : string = "Aqui va ha poner la descripción de la flor.";
  @Input()
  public preview_prize : string = "120";
  @Input()
  public specifications : string[] = ['hola']; 

  public count : number = 0;
  public hasLoaded : boolean = false;

  changePic ( ) : void {
    this.count ++;
    if ( this.count > 2 ) this.count = 0;
  }

  onLoad ( ) : void { 
    this.hasLoaded = true;
  }

}
