import {HttpClient} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, filter, tap, take } from 'rxjs/operators';
import { FakeData } from './main-models';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  data: FakeData[] | undefined;

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.loadInitialData()
      .subscribe(data => {
        this.data = data;

        ;
      });
  }
  
  //Difference between Angular pipes and Rxjs pipes here: https://stackoverflow.com/questions/48030197/what-is-pipe-function-in-angular

  loadInitialData() : Observable<FakeData[]>{
    return this.httpClient
      .get<FakeData[]>('https://jsonplaceholder.typicode.com/users')
        .pipe(
          //map(x => x),
          take(1),
          map(x => x.filter(y => y.id > 5)),
          tap(xy => console.log(xy.map(c => c.address.street).join(' -------> \n ')))
            // tap(x => x
            //   .filter(xx => xx.address.street !== 'Kulas Light')),
            //     tap(x => x.map(x => x.id))
        );
  }

}
