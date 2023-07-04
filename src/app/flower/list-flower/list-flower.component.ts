import { Component, OnInit } from '@angular/core';
import { FlowerService } from 'src/app/services/flower.service';
import Flower from 'src/app/intefaces/flower.interface';

@Component({
  selector: 'list-flower',
  templateUrl: './list-flower.component.html'
})

export class ListFlowerComponent implements OnInit {
  
  public hasLoaded : boolean = true;
  public flowers   : Flower[] = [];

  constructor ( private flowerService : FlowerService ) { }
  
  ngOnInit(): void {
    this.flowerService.getFlower().subscribe( flowers => { 
      this.flowers = flowers;
    });
  }

}
