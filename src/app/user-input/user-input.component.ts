import { Component, OnInit, Output } from '@angular/core';
import { SelectItem } from 'primeng/api';
import {
  BackendService,
  TSData,
  TSDataRequest,
} from '../services/backend.service';

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.css'],
})
export class UserInputComponent implements OnInit {
  selectedCountries: any[];
  countries: SelectItem[];

  selectedSector: any = { name: '' };
  sectors: SelectItem[];

  selectedYear: any = { name: '' };
  years: SelectItem[];
  @Output() title: string = '';

  loaded: boolean = false;

  data: any;
  @Output() timeseries: any;

  fromBackend: TSData[] = [];

  constructor(private backend: BackendService) {
    this.countries = [
      { label: 'Australia', value: { id: 1, name: 'Australia', code: 'AUS' } },
      { label: 'Austria', value: { id: 2, name: 'Austria', code: 'AS' } },
      { label: 'Germany', value: { id: 3, name: 'Germany', code: 'DE' } },
      { label: 'France', value: { id: 4, name: 'France', code: 'FR' } },
      { label: 'England', value: { id: 5, name: 'England', code: 'EN' } },
    ];
    // this.selectedCountries=[
    //   'Australia','Austria','Germany','France','England'
    // ]

    this.sectors = [
      { label: 'Private', value: { id: 1, name: 'Private', code: 'P' } },
      { label: 'Industry', value: { id: 2, name: 'Industry', code: 'I' } },
      {
        label: 'Agriculture',
        value: { id: 3, name: 'Agriculture', code: 'A' },
      },
    ];
    this.years = [
      { label: '2018', value: { id: 1, name: '2018', code: 'P' } },
      { label: '2019', value: { id: 2, name: '2019', code: 'I' } },
      { label: '2020', value: { id: 3, name: '2020', code: 'A' } },
    ];
  }

  ngOnInit(): void {
    this.loaded = false;
  }

  async showGraph() {
    this.loaded=false
    console.log('show graph', this.selectedCountries);
    this.title =
      'Energy consumption for the ' +
      this.selectedSector.name.toLowerCase() +
      ' sector in the year ' +
      this.selectedYear.name;
    if (this.selectedCountries && this.selectedSector && this.selectedYear) {
      let param = new TSDataRequest();
      param.country = [];
      this.selectedCountries.forEach(async (item) => {
        param.country.push(item.name);
        param.sector = this.selectedSector.name.toLowerCase();
        param.year = this.selectedYear.name;
        let collectedData = this.backend.getTimeseriesFromBackend(param);
        if (collectedData) {
          collectedData.subscribe((responses) => {
            if(responses.length===this.selectedCountries.length){
              
              console.log('input ', responses);
              this.backend.setTimeseries(responses);
              this.loaded = true;
            }

          });
        } else {
          console.error('request to backend faild');
        }
      });
    } else {
      console.error('wrong user input');
    }
  }

  // createMockData() {
  //   this.data = cdata.TimeChartData;
  //   const data1 = [];
  //   for (let item of this.data) {
  //     data1.push([item[0], Math.random() * (0.8 - 0.676) + 0.676]);
  //   }
  //   this.timeseries = [
  //     {
  //       type: 'area',
  //       name: 'Germany',
  //       data: this.data,
  //     },
  //     {
  //       type: 'area',
  //       name: 'Australia',
  //       data: data1,
  //     },
  //   ];
  // }
}
