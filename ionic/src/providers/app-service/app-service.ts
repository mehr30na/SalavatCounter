import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

/*
 Generated class for the AppServiceProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */

@Injectable()
export class AppServiceProvider {

  constructor(public http: Http) {
  }

  read(url: string) {
    console.log(url);
    return this.http.get(url)
      .map(res =>
        res.json()
      );
  }

  save(url: string, object) {
    return this.http.post(url, object)
      .map(res =>
        res.json()
      );
  }


}
