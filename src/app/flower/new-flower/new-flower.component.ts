import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FlowerService } from 'src/app/services/flower.service';

@Component({
  selector: 'new-flower',
  templateUrl: './new-flower.component.html'
})

export class NewFlowerComponent implements OnInit{
  
  public newsFileInput ?: string;
  public countFileInput : number = 1;

  @Input()
  public urls : any[] = [];
	public msg : string = "";
  public files : any;

  public preview_name : string = "Nombre de la flor";
  public preview_description : string = "Aqui va ha poner la descripción de la flor.";
  public preview_prize : string = "120";

  public preview_specifications : string = "Aqui va ha poner las especifiaciones de la flor., Como esta, o esta, por ultimo esta";

  public specifications : string [] = [];

  formulario : FormGroup;

  constructor (private flowerService : FlowerService) {
    this.formulario = new FormGroup({
      name           : new FormControl(),
      description    : new FormControl(),
      specifications : new FormControl(),
      prize          : new FormControl(),
      image          : new FormControl()
    });
  }

  ngOnInit(): void { }

  async onSubmit() {
    
    this.validationInput();

    // const response = await this.flowerService.addPlant( this.formulario.value );
    // console.log( response );

    let i = 1;
    let newDir = (this.formulario.get('name')?.value).replace(' ', '-').toLowerCase();
    for ( let file of this.files ) {
      const response = this.flowerService.uploadFlowerImages ( file , `img/plants/${ newDir }/${ (this.formulario.get('name')?.value).replace(' ', '-').toLowerCase() + i }` );
      console.log( response );
      i ++;
    }

  }

  validationInput (  ) : void { 
  
    if ( (this.formulario.get( 'name' )?.value == null) || 
    (this.formulario.get( 'description' )?.value == null) || 
    (this.formulario.get( 'prize' )?.value == null) ||
    (this.formulario.get( 'specifications' )?.value == null)) return;
    
    if ( (this.formulario.get( 'name' )?.value.trim == "") || 
    (this.formulario.get( 'description' )?.value.trim == "") || 
    (this.formulario.get( 'prize' )?.value.trim == "") ||
    (this.formulario.get( 'specifications' )?.value == "")) return;

    if ( +this.formulario.get( 'prize' )?.value.trim == 0 ) return;
  
  }

  separateSpecifications (  ) : void { 

    this.specifications = (this.formulario.get( 'specifications' )?.value  || '')?.split( ',' );
    console.log( (this.formulario.get( 'specifications' )?.value  || '').split( ',' ) );

  }

  // TODO:
  // Posible codigo para guardar la url
  // https://stackoverflow.com/questions/51095002/getting-download-url-from-firebase-storage-in-angular
	
  updatePreview ( ) : void {
    
    this.preview_name = this.formulario.get('name')?.value;
    this.preview_description = this.formulario.get('description')?.value;
    this.preview_prize = this.formulario.get('prize')?.value;
    this.preview_specifications = this.formulario.get('specifications')?.value;

  }

  previewImage( $event: any ) {

    this.urls = [];
    this.files = $event.target.files;
		
    if(!$event.target.files[0] || $event.target.files[0].length == 0) {
      this.msg = 'You must select an image';
      return;
    }
    
    var mimeType = $event.target.files[0].type;
    
    if (mimeType.match(/image\/*/) == null) {
      this.msg = "Only images are supported";
      return;
    }

    for( let file of $event.target.files ) {
      let reader = new FileReader();
      reader.readAsDataURL( file );
      reader.onload = (_event) => {
        this.msg = "";
        this.urls.push( reader.result );
      }
    }

  }

  // previewImage( $event: any ) {

  //   this.urls = [];
		
  //   if(!$event.target.files[0] || $event.target.files[0].length == 0) {
  //     this.msg = 'You must select an image';
  //     return;
  //   }
    
  //   var mimeType = $event.target.files[0].type;
    
  //   if (mimeType.match(/image\/*/) == null) {
  //     this.msg = "Only images are supported";
  //     return;
  //   }
    
  //   for( let file of $event.target.files ) {
  //     let reader = new FileReader();
  //     reader.readAsDataURL( file );
  //     reader.onload = (_event) => {
  //       this.msg = "";
  //       this.urls.push( reader.result );
  //     }
  //   }

  // }

}
