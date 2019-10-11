import { Component, OnInit } from '@angular/core';
import { File } from "./dataModelClasses";
import { DataModelManagerService } from './data-model-manager.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  files: File[];

  constructor(private m: DataModelManagerService) { }

  ngOnInit() {
    this.m.filesGetAll().subscribe(f => {  
      this.files = f;  
   });  
  }
}
