import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { ArticlesComponent } from '../shared/articles/articles.component';
import { DataService } from '../shared/data.service';
import { Filter } from '../shared/filter.pipe';

@Component({
  template: `
    <form [formGroup]="myForm" (ngSubmit)="onSaveData()" class="form-horizontal">
    <div class="form-group">
      <label for="title" class="col-sm-2 control-label">Title</label>
      <div class="col-sm-10">
        <input [formControl]="myForm.find('title')" type="text" id="title" #title="ngForm" class="form-control">
      </div>
    </div>
    <div class="form-group">
      <label for="content" class="col-sm-2 control-label">Content</label>
       <div class="col-sm-10">
         <input [formControl]="myForm.find('content')" type="text" id="content" class="form-control">
       </div>
    </div>
    <div class="form-group">
      <label for="url" class="col-sm-2 control-label">Url</label>
      <div class="col-sm-10">
        <input [formControl]="myForm.find('url')" type="text" id="url" class="form-control">
      </div>
    </div>
     <button type="submit" [disabled]="!myForm.valid" class="btn btn-info">Add Data</button>
     <a (click)="onGetOwnData()" class="btn btn-warning">Get Data</a>
     <a (click)="onDeleteData()" class="btn btn-danger">Delete Data</a>
   </form>
       
   <ul class="row without">
    <li *ngFor="let item of items" class="col-md-3 article">
    <a (click)="onDelete(item.id)" class="linkbut">x</a>
      <div class="row">
        <div class="col-md-10 title">{{item.title}}</div>
      </div>
      <div class="row">
        <div class="col-md-10 body">{{item.content}} <a htef="#" style="cursor: pointer">More</a></div>
      </div>
      <hr/>
      <div class="row">
        <div class="col-md-10 url">{{item.url}}</div>
      </div>      
    </li>
   </ul>
   <div>
    <h1>Filter</h1>
    <input type="text" [(ngModel)]="filt">
     <ul>
      <li *ngFor="let item of array | filter:filt">{{item.title}}</li>
     </ul>
   </div>

`,
  directives: [ArticlesComponent, FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES],
  providers: [DataService],
  pipes: [Filter],
  styles: ['.linkbut{position:absolute; right: 10px;text-decoration: none; font-weight: bold; color:white; cursor: pointer}.linkbut:hover{color:black}.without{list-style-type: none} .article{padding: 10px;min-height: 100px; border-radius: 5px;} .title{font-size: 18px; color: #2b81af; margin-bottom: 10px;} .body{font-size: 15px; color: #001f3f; margin-bottom: 5px;} .url{font-size: 10px; color: grey;} .article{margin-top: 20px;background-color: lightgrey; margin-right: 5px;}'],
})
export class ProtectedComponent{
  myForm: FormGroup;
  items: any[] = [];
  array: any[] = [];

  constructor(private _fb: FormBuilder, private _dataService: DataService) {}

  onSaveData() {
    this._dataService.addData(this.myForm.value)
      .subscribe(
        () => this.onGetOwnData(),
        error => console.log(error)
      );
  }

  onGetOwnData() {
    this._dataService.getAllData()
      .subscribe(
        data => {
          const myArray = [];
          for (let key in data) {
            if (data[key].title != '') {
              data[key].id = key;
              myArray.push(data[key]);
            }
          }
          this.items = myArray;
          this.array = myArray;

        }
      );
  }

  onDeleteData() {
    this._dataService.deleteAllData()
      .subscribe(
        () => this.onGetOwnData(),
        error => console.error(error)
      );
  }

  onDelete(id) {
    this._dataService.deleteData(id)
      .subscribe(
        () => this.onGetOwnData(),
        error => console.error(error)
      );
  }

  ngOnInit():any {
    this.myForm = this._fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      url: ['', Validators.required]
    });
    this.onGetOwnData();
  }
}
