import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Table } from 'primeng/table';
import { BackendService, TSData } from '../services/backend.service';
export interface TableData {
  country: string;
  data: any[];
  viewData?: any[];
}

// export class TblTimeSeries implements TableData {

// }

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  cols: any[];
  data: TableData[] = [];

  backendData: TSData[];

  selectedSeriesIdx: number = 0;
  totalRecords: number;
  @ViewChildren('dt' /*, {static: false}*/)
  dataTableViewChild: QueryList<Table>;
  viewData: any[];
  visible=true

  constructor(
    private backend: BackendService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cols = [
      { field: 'timestamp', header: 'Timestamp' },
      { field: 'value', header: 'Value' },
      // {field: 'brand', header: 'Brand'},
      // {field: 'color', header: 'Color'}
    ];
    this.backend.getTimeseries().subscribe((res) => {
      console.log('table ', res);
      // this.data=[]
      // this.backendData=[]
      
      // this.selectedSeriesIdx=0
      this.backendData = res;
      for (let item of this.backendData) {
        console.log(item.data)
        this.data.push({
          country: item.country,
          data: item.data,
        });
        this.viewData = Array.from({ length: item.data.length });
        this.totalRecords = item.data.length;
      }
    });
  }
  prepareDataForTable(rawArr) {
    let row = [];
    for (let item of rawArr) {
      row.push({
        timestamp: item[0],
        value: item[1],
      });
    }
    return row;
  }
  tabChanged($event) {
    console.log('change tab', $event);
    console.log(this.selectedSeriesIdx);
    this.visible=false
    // document.getElementById('0-0').scrollIntoView();
    const id = 'body'+ this.selectedSeriesIdx.toString() + '-0';
    let bla=document.getElementById('dt')
    console.log(bla)
    // console.log(id)
    // const element =document.getElementById(id);
    // this.scrollToRow(element);
    this.selectedSeriesIdx = $event.index;
    this.viewData = [];
    this.viewData = Array.from({ length: this.totalRecords });
    this.ref.detectChanges();
    // this.dataTableViewChild.changes.subscribe(res=>{
    //   console.log("blaaaaaaaa",res)
    //   res._results[0].reset()
    // })
    this.loadCarsLazy({
      first: 0,
      rows: 50,
    });
    this.visible=true
  }

  //https://stackblitz.com/edit/primeng-tablevirtualscroll-demo?file=src%2Fapp%2Fapp.component.ts
  loadCarsLazy(event) {
    console.log(event);
    setTimeout(() => {
      //load data of required page
      let loadedCars = this.data[this.selectedSeriesIdx].data.slice(
        event.first,
        event.first + event.rows
      );
      console.log('loadedCars ', loadedCars);

      //populate page of virtual cars
      Array.prototype.splice.apply(this.viewData, [
        ...[event.first, event.rows],
        ...loadedCars,
      ]);

      //trigger change detection
      this.viewData = [...this.viewData];
      this.ref.detectChanges();
    }, 100);
  }
  scrollToRow(row) {
    console.log('Jump to row ', row);
    row.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'start' });
    this.ref.detectChanges();
  }
}
