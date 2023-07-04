import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component ({
  selector: 'api-get',
  templateUrl: 'api.component.html'
})

export class ApiComponent implements OnInit { 

  public id : string | null = '';

  constructor ( private route : ActivatedRoute ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
  }

}