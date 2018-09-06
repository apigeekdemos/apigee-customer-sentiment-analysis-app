import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableService } from '../../../@core/data/smart-table.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
  providers:[DatePipe]
})
export class SmartTableComponent {

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
/*     columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      firstName: {
        title: 'First Name',
        type: 'string',
      },
      lastName: {
        title: 'Last Name',
        type: 'string',
      },
      username: {
        title: 'Username',
        type: 'string',
      },
      email: {
        title: 'E-mail',
        type: 'string',
      },
      age: {
        title: 'Age',
        type: 'number',
      },
    }, */
    columns: {
      name: {
        title: 'Name',
        type: 'string',
      },
      comment: {
        title: 'Comment',
        type: 'string',
      },
      score: {
        title: 'Score',
        type: 'number',
      },
      image: {
        title: 'Image URL',
        type: 'html',
        valuePrepareFunction: (image:string) => { return `<div align="center"><img width="50px" src="${image}" /></div>`; },
      },
      date: {
        sort: true,
        sortDirection: 'desc',
        title: 'Date',
        type: 'date',
        valuePrepareFunction: (date) => {
          var formatted, raw;
          try {
            raw = new Date(date);
          } catch(e) {
            console.log('date:', date);
            raw = new Date();
          } finally{
            formatted = this.datePipe.transform(raw, 'dd MMM yyyy');
            return formatted;  
          }
        }
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableService, private datePipe: DatePipe) {
    /* const data = this.service.getData();
    console.log(data); */

    const data = this.service.getData().subscribe((data) => {
      //this.contacts  =  data;
      //console.log(data);
      this.source.load(data);
    });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
