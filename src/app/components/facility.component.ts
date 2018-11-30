import { Component, OnInit, ViewChild, ChangeDetectorRef, Injectable } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatTable, MatPaginatorBase } from '@angular/material';
import { ActivatedRoute,Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map } from "rxjs/operators";
import { tap } from "rxjs/operators";

let ELEMENT_DATA = [];
let API:any = {
  get: (apiName, a, b) => {
    return new Promise((resolve) => {
      resolve({});
    })
  }
}

export interface FacilityInfo {
  id: number;
  name: string;
  good: number;
  warning: number;
  check: number;
};

export interface facilityInfo {
  facility_id: number;
  name: string;
  country: string,
  region: string,
  street_address: string,
  zip_code: string,
  good: number;
  warning: number;
  check: number;
};


@Injectable()
@Component({
  selector: 'm-facility',
  templateUrl: './facility.component.html',
  styleUrls: ['./facility.component.scss'],
})
export class FacilityComponent implements OnInit {
	panelOpenState1 = false;
  panelOpenState2 = false;
  panelOpenState3 = false;
  panelOpenState4 = false;
  panelOpenState5 = false;
	searchText: string = '';

	displayedColumns: string[] = ['name', 'good', 'warning', 'check'];
  dataSource: any = new MatTableDataSource<FacilityInfo>(ELEMENT_DATA);
  // create data source
  myDataSource = new MatTableDataSource<facilityInfo>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  totalGood: number = 0;
  totalWarning: number = 0;
  totalCheck: number = 0;
  totalGood1: number = 0;
  totalWarning1: number = 0;
  totalCheck1: number = 0;
  jwtToken: any;
  facilityList: any = [];
  facilityGroups: any = [];
  constructor(private http: HttpClient,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.totalGood = this.dataSource.data.reduce(function(prev, cur) {
      return prev + cur.good;
    }, 0);
    this.totalWarning = this.dataSource.data.reduce(function(prev, cur) {
      return prev + cur.warning;
    }, 0);
    this.totalCheck = this.dataSource.data.reduce(function(prev, cur) {
      return prev + cur.check;
    }, 0);

    console.log(this.paginator);

    this.loadTestData();
  }

  ngAfterViewInit() {
    console.log("===ngAfterViewInit==");
    console.log(this.paginator);
    this.loadTestData();
  }

  pageChange(event, i, data) {
    data.offset = event.pageIndex * event.pageSize;
    data.pageSize = event.pageSize;
    console.log(event, i, data);
  }

  loadTestData() {
      let testData: any  = [{"facility_id": 3, "country": "US", "region": "CA", "city": "Redlands", "zip_code": "92374", "street_address": "27621 San Bernardino Ave", "name": "24 Hour Fitness - Redlands Super Sport"}, {"facility_id": 5, "country": "US", "region": "CA", "city": "Torrance", "zip_code": "90503", "street_address": "19800 Hawthorne Blvd Unit 420", "name": "UFC - Torrance"}, {"facility_id": 10, "country": "US", "region": "CA", "city": "Fountain Valley", "zip_code": "92708", "street_address": "17500 Brookhurst Street", "name": "24 Hour Fitness - Fountain Valley"},{"facility_id": 3, "country": "CA", "region": "CA", "city": "Redlands", "zip_code": "92374", "street_address": "27621 San Bernardino Ave", "name": "24 Hour Fitness - Redlands Super Sport"}, {"facility_id": 5, "country": "CA", "region": "CA", "city": "Torrance", "zip_code": "90503", "street_address": "19800 Hawthorne Blvd Unit 420", "name": "UFC - Torrance"}, {"facility_id": 10, "country": "CA", "region": "CA", "city": "Fountain Valley", "zip_code": "92708", "street_address": "17500 Brookhurst Street", "name": "24 Hour Fitness - Fountain Valley"},{"facility_id": 3, "country": "US", "region": "CA", "city": "Redlands", "zip_code": "92374", "street_address": "27621 San Bernardino Ave", "name": "24 Hour Fitness - Redlands Super Sport"}, {"facility_id": 5, "country": "US", "region": "CA", "city": "Torrance", "zip_code": "90503", "street_address": "19800 Hawthorne Blvd Unit 420", "name": "UFC - Torrance"}, {"facility_id": 10, "country": "US", "region": "CA", "city": "Fountain Valley", "zip_code": "92708", "street_address": "17500 Brookhurst Street", "name": "24 Hour Fitness - Fountain Valley"},{"facility_id": 3, "country": "CA", "region": "CA", "city": "Redlands", "zip_code": "92374", "street_address": "27621 San Bernardino Ave", "name": "24 Hour Fitness - Redlands Super Sport"}, {"facility_id": 5, "country": "CA", "region": "CA", "city": "Torrance", "zip_code": "90503", "street_address": "19800 Hawthorne Blvd Unit 420", "name": "UFC - Torrance"}, {"facility_id": 10, "country": "CA", "region": "CA", "city": "Fountain Valley", "zip_code": "92708", "street_address": "17500 Brookhurst Street", "name": "24 Hour Fitness - Fountain Valley"},{"facility_id": 3, "country": "US", "region": "CA", "city": "Redlands", "zip_code": "92374", "street_address": "27621 San Bernardino Ave", "name": "24 Hour Fitness - Redlands Super Sport"}, {"facility_id": 5, "country": "US", "region": "CA", "city": "Torrance", "zip_code": "90503", "street_address": "19800 Hawthorne Blvd Unit 420", "name": "UFC - Torrance"}, {"facility_id": 10, "country": "US", "region": "CA", "city": "Fountain Valley", "zip_code": "92708", "street_address": "17500 Brookhurst Street", "name": "24 Hour Fitness - Fountain Valley"},{"facility_id": 3, "country": "CA", "region": "CA", "city": "Redlands", "zip_code": "92374", "street_address": "27621 San Bernardino Ave", "name": "24 Hour Fitness - Redlands Super Sport"}, {"facility_id": 5, "country": "CA", "region": "CA", "city": "Torrance", "zip_code": "90503", "street_address": "19800 Hawthorne Blvd Unit 420", "name": "UFC - Torrance"}, {"facility_id": 10, "country": "CA", "region": "CA", "city": "Fountain Valley", "zip_code": "92708", "street_address": "17500 Brookhurst Street", "name": "24 Hour Fitness - Fountain Valley"},{"facility_id": 3, "country": "US", "region": "CA", "city": "Redlands", "zip_code": "92374", "street_address": "27621 San Bernardino Ave", "name": "24 Hour Fitness - Redlands Super Sport"}, {"facility_id": 5, "country": "US", "region": "CA", "city": "Torrance", "zip_code": "90503", "street_address": "19800 Hawthorne Blvd Unit 420", "name": "UFC - Torrance"}, {"facility_id": 10, "country": "US", "region": "CA", "city": "Fountain Valley", "zip_code": "92708", "street_address": "17500 Brookhurst Street", "name": "24 Hour Fitness - Fountain Valley"},{"facility_id": 3, "country": "CA", "region": "CA", "city": "Redlands", "zip_code": "92374", "street_address": "27621 San Bernardino Ave", "name": "24 Hour Fitness - Redlands Super Sport"}, {"facility_id": 5, "country": "CA", "region": "CA", "city": "Torrance", "zip_code": "90503", "street_address": "19800 Hawthorne Blvd Unit 420", "name": "UFC - Torrance"}, {"facility_id": 10, "country": "CA", "region": "CA", "city": "Fountain Valley", "zip_code": "92708", "street_address": "17500 Brookhurst Street", "name": "24 Hour Fitness - Fountain Valley"},{"facility_id": 3, "country": "US", "region": "CA", "city": "Redlands", "zip_code": "92374", "street_address": "27621 San Bernardino Ave", "name": "24 Hour Fitness - Redlands Super Sport"}, {"facility_id": 5, "country": "US", "region": "CA", "city": "Torrance", "zip_code": "90503", "street_address": "19800 Hawthorne Blvd Unit 420", "name": "UFC - Torrance"}, {"facility_id": 10, "country": "US", "region": "CA", "city": "Fountain Valley", "zip_code": "92708", "street_address": "17500 Brookhurst Street", "name": "24 Hour Fitness - Fountain Valley"},{"facility_id": 3, "country": "CA", "region": "CA", "city": "Redlands", "zip_code": "92374", "street_address": "27621 San Bernardino Ave", "name": "24 Hour Fitness - Redlands Super Sport"}, {"facility_id": 5, "country": "CA", "region": "CA", "city": "Torrance", "zip_code": "90503", "street_address": "19800 Hawthorne Blvd Unit 420", "name": "UFC - Torrance"}, {"facility_id": 10, "country": "CA", "region": "CA", "city": "Fountain Valley", "zip_code": "92708", "street_address": "17500 Brookhurst Street", "name": "24 Hour Fitness - Fountain Valley"},{"facility_id": 3, "country": "US", "region": "CA", "city": "Redlands", "zip_code": "92374", "street_address": "27621 San Bernardino Ave", "name": "24 Hour Fitness - Redlands Super Sport"}, {"facility_id": 5, "country": "US", "region": "CA", "city": "Torrance", "zip_code": "90503", "street_address": "19800 Hawthorne Blvd Unit 420", "name": "UFC - Torrance"}, {"facility_id": 10, "country": "US", "region": "CA", "city": "Fountain Valley", "zip_code": "92708", "street_address": "17500 Brookhurst Street", "name": "24 Hour Fitness - Fountain Valley"},{"facility_id": 3, "country": "CA", "region": "CA", "city": "Redlands", "zip_code": "92374", "street_address": "27621 San Bernardino Ave", "name": "24 Hour Fitness - Redlands Super Sport"}, {"facility_id": 5, "country": "CA", "region": "CA", "city": "Torrance", "zip_code": "90503", "street_address": "19800 Hawthorne Blvd Unit 420", "name": "UFC - Torrance"}, {"facility_id": 10, "country": "CA", "region": "CA", "city": "Fountain Valley", "zip_code": "92708", "street_address": "17500 Brookhurst Street", "name": "24 Hour Fitness - Fountain Valley"},{"facility_id": 3, "country": "US", "region": "CA", "city": "Redlands", "zip_code": "92374", "street_address": "27621 San Bernardino Ave", "name": "24 Hour Fitness - Redlands Super Sport"}, {"facility_id": 5, "country": "US", "region": "CA", "city": "Torrance", "zip_code": "90503", "street_address": "19800 Hawthorne Blvd Unit 420", "name": "UFC - Torrance"}, {"facility_id": 10, "country": "US", "region": "CA", "city": "Fountain Valley", "zip_code": "92708", "street_address": "17500 Brookhurst Street", "name": "24 Hour Fitness - Fountain Valley"},{"facility_id": 3, "country": "CA", "region": "CA", "city": "Redlands", "zip_code": "92374", "street_address": "27621 San Bernardino Ave", "name": "24 Hour Fitness - Redlands Super Sport"}, {"facility_id": 5, "country": "CA", "region": "CA", "city": "Torrance", "zip_code": "90503", "street_address": "19800 Hawthorne Blvd Unit 420", "name": "UFC - Torrance"}, {"facility_id": 10, "country": "CA", "region": "CA", "city": "Fountain Valley", "zip_code": "92708", "street_address": "17500 Brookhurst Street", "name": "24 Hour Fitness - Fountain Valley"},{"facility_id": 3, "country": "US", "region": "CA", "city": "Redlands", "zip_code": "92374", "street_address": "27621 San Bernardino Ave", "name": "24 Hour Fitness - Redlands Super Sport"}, {"facility_id": 5, "country": "US", "region": "CA", "city": "Torrance", "zip_code": "90503", "street_address": "19800 Hawthorne Blvd Unit 420", "name": "UFC - Torrance"}, {"facility_id": 10, "country": "US", "region": "CA", "city": "Fountain Valley", "zip_code": "92708", "street_address": "17500 Brookhurst Street", "name": "24 Hour Fitness - Fountain Valley"},{"facility_id": 3, "country": "CA", "region": "CA", "city": "Redlands", "zip_code": "92374", "street_address": "27621 San Bernardino Ave", "name": "24 Hour Fitness - Redlands Super Sport"}, {"facility_id": 5, "country": "CA", "region": "CA", "city": "Torrance", "zip_code": "90503", "street_address": "19800 Hawthorne Blvd Unit 420", "name": "UFC - Torrance"}, {"facility_id": 10, "country": "CA", "region": "CA", "city": "Fountain Valley", "zip_code": "92708", "street_address": "17500 Brookhurst Street", "name": "24 Hour Fitness - Fountain Valley"},{"facility_id": 3, "country": "US", "region": "CA", "city": "Redlands", "zip_code": "92374", "street_address": "27621 San Bernardino Ave", "name": "24 Hour Fitness - Redlands Super Sport"}, {"facility_id": 5, "country": "US", "region": "CA", "city": "Torrance", "zip_code": "90503", "street_address": "19800 Hawthorne Blvd Unit 420", "name": "UFC - Torrance"}, {"facility_id": 10, "country": "US", "region": "CA", "city": "Fountain Valley", "zip_code": "92708", "street_address": "17500 Brookhurst Street", "name": "24 Hour Fitness - Fountain Valley"},{"facility_id": 3, "country": "CA", "region": "CA", "city": "Redlands", "zip_code": "92374", "street_address": "27621 San Bernardino Ave", "name": "24 Hour Fitness - Redlands Super Sport"}, {"facility_id": 5, "country": "CA", "region": "CA", "city": "Torrance", "zip_code": "90503", "street_address": "19800 Hawthorne Blvd Unit 420", "name": "UFC - Torrance"}, {"facility_id": 10, "country": "CA", "region": "CA", "city": "Fountain Valley", "zip_code": "92708", "street_address": "17500 Brookhurst Street", "name": "24 Hour Fitness - Fountain Valley"}];

      let _data: any = testData;
      this.myDataSource.data = _data;
      _data.sort(function(a, b) {
          var textA = a.country.toUpperCase();
          var textB = b.country.toUpperCase();
          return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      const groups = new Set(_data.map(item => item.country));
      const _result = [];

      groups.forEach(g => {
        let data: any;
        data = _data.filter(i => i.country === g);
        let dataSource = new MatTableDataSource<facilityInfo>(data);

        const _result1 = [];
        const _groups = new Set(data.map(item => item.region));
        _groups.forEach(_g => {
            let data1: any;
            data1 = data.filter(i => i.region === _g);
            let dataSource1 = new MatTableDataSource<facilityInfo>(data1);
            if(this.paginator) {
              dataSource1.paginator = this.paginator;
            }
            _result1.push({
              offset: 0,
              name: _g,
              values: data1,
              dataSource: dataSource1
            });
            //this.dataSource.paginator = this.paginator;
        });

        /*this.paginator.page.pipe(tap(() => {
          this.paginator.pageIndex = 0;
        }));*/

        if(this.paginator) {
          dataSource.paginator = this.paginator;
        }
        _result.push({
          offset: 0,
          name: g,
          values: _result1,
          dataSource: dataSource
        })
      });
      console.log(_result);
      this.facilityGroups = _result;
      this.cdr.detectChanges();
  }

  loadFacility() {
    let apiName = 'NetworkAPI';
    API.get(apiName, '', {}).then(res => {
      let _data: any = res;
      this.myDataSource.data = _data;
      _data.sort(function(a, b) {
          var textA = a.country.toUpperCase();
          var textB = b.country.toUpperCase();
          return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      const groups = new Set(_data.map(item => item.country));
      const _result = [];

      groups.forEach(g => {
        let data: any;
        data = _data.filter(i => i.country === g);
        let dataSource = new MatTableDataSource<facilityInfo>(data);

        const _result1 = [];
        const _groups = new Set(data.map(item => item.region));
        _groups.forEach(_g => {
            let data1: any;
            data1 = data.filter(i => i.region === _g);
            let dataSource1 = new MatTableDataSource<facilityInfo>(data1);
            _result1.push({
              name: _g,
              values: data1,
              dataSource: dataSource1,
              paginator: this.paginator
            });
            //this.dataSource.paginator = this.paginator;
        });

        _result.push({
          name: g,
          values: _result1,
          dataSource: dataSource
        })
      });
      console.log(_result);
      this.facilityGroups = _result;
      this.cdr.detectChanges();
    }).catch(error => {
        console.log(error.response)
    });

    /*let testData: any  = [{"facility_id": 3, "country": "US", "region": "CA", "city": "Redlands", "zip_code": "92374", "street_address": "27621 San Bernardino Ave", "name": "24 Hour Fitness - Redlands Super Sport"}, {"facility_id": 5, "country": "US", "region": "CA", "city": "Torrance", "zip_code": "90503", "street_address": "19800 Hawthorne Blvd Unit 420", "name": "UFC - Torrance"}, {"facility_id": 10, "country": "US", "region": "CA", "city": "Fountain Valley", "zip_code": "92708", "street_address": "17500 Brookhurst Street", "name": "24 Hour Fitness - Fountain Valley"},{"facility_id": 3, "country": "CA", "region": "CA", "city": "Redlands", "zip_code": "92374", "street_address": "27621 San Bernardino Ave", "name": "24 Hour Fitness - Redlands Super Sport"}, {"facility_id": 5, "country": "CA", "region": "CA", "city": "Torrance", "zip_code": "90503", "street_address": "19800 Hawthorne Blvd Unit 420", "name": "UFC - Torrance"}, {"facility_id": 10, "country": "CA", "region": "CA", "city": "Fountain Valley", "zip_code": "92708", "street_address": "17500 Brookhurst Street", "name": "24 Hour Fitness - Fountain Valley"}];*/
  };

  onEdit() {

  }

}
