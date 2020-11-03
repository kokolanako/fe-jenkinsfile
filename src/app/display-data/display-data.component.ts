import {
  AfterContentInit,
  AfterViewInit,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import * as Highcharts from 'highcharts';
import { BackendService, TimeSeries } from '../services/backend.service';

//https://stackblitz.com/edit/angular-time-series-eduforbetterment-xjttot?file=src%2Fapp%2Fapp.component.ts

declare var require: any;
const More = require('highcharts/highcharts-more');
More(Highcharts);

const Exporting = require('highcharts/modules/exporting');
Exporting(Highcharts);

const ExportData = require('highcharts/modules/export-data');
ExportData(Highcharts);

const Accessibility = require('highcharts/modules/accessibility');
Accessibility(Highcharts);

@Component({
  selector: 'app-display-data',
  templateUrl: './display-data.component.html',
  styleUrls: ['./display-data.component.css'],
})
export class DisplayDataComponent implements OnInit {
  data: any;
  @Input() title: string;
  public options: any;
  // timeseries: any;

  constructor(private backend: BackendService) {}

  ngOnInit() {
    this.backend.getTimeseries().subscribe((res) => {
      let timeseries = [];
      for (let item of res) {
        let correctedData = [];
        item.data.forEach((d) => {
          correctedData.push([d.timestamp, d.value]);
        });
        console.log("Corrected ",correctedData)
        timeseries.push({
          type: 'area',
          name: item.country,
          data: correctedData,
        });
      }

      this.initOptions(timeseries);
      Highcharts.chart('container', this.options);
    });
  }

  selectData(event) {
    console.log(event);
  }

  initOptions(timeseries: TimeSeries[]) {
    this.options = {
      chart: {
        type: 'line',
        zoomType: 'x',
      },
      title: {
        text: this.title,
      },

      xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: {
          millisecond: '%A, %b %e, %H:%M:%S.%L',
          second: '%A, %b %e, %H:%M:%S',
          minute: '%A, %b %e, %H:%M',
          hour: '%A, %b %e, %H:%M',
          day: '%A, %b %e, %Y',
          week: 'Week from %A, %b %e, %Y',
          month: '%B %Y',
          year: '%Y',
        },
        tickPixelInterval: 300,
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Electric energy consumpted in kW',
          labels: {
            format: '{value: .2f}',
          },
        },
      },
      tooltip: {
        valueDecimals: 2,
        valuePrefix: 'kw ',
      },
      legend: {
        enabled: true,
      },
      plotOptions: {
        area: {
          fillColor: {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1,
            },
            stops: [],
          },
          marker: {
            radius: 0.2,
          },
          lineWidth: 1,
          states: {
            hover: {
              lineWidth: 1,
            },
          },
          threshold: null,
        },
      },
      series: timeseries,
    };
  }
}
