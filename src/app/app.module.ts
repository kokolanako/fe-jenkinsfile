import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';

import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { UserInputComponent } from './user-input/user-input.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropdownModule } from 'primeng/dropdown';
import { DisplayDataComponent } from './display-data/display-data.component';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
// import { ChartModule } from 'primeng/chart';
import { ChartModule } from 'angular-highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import { TableComponent } from './table/table.component';
import { BackendService } from './services/backend.service';
import { TabViewModule } from 'primeng/tabview';

@NgModule({
  declarations: [AppComponent, UserInputComponent, DisplayDataComponent, TableComponent],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    TranslateModule,
    HttpClientModule,
    ButtonModule,
    MultiSelectModule,
    DropdownModule,
    TableModule,
    // ChartModule,
    ChartModule,
    HighchartsChartModule,
    TabViewModule
  ],
  providers: [BackendService],
  bootstrap: [AppComponent],
  schemas:[NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
