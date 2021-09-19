import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BoxModel } from './interfaces/box.model';
import {Observable} from "rxjs";

@Injectable({ providedIn: 'root' })
export class GeometryService {

  constructor(private http: HttpClient) {}

  // get all the geometries from the api
  getGeometries(): Observable<BoxModel[]>{
    return this.http.get<BoxModel[]>('http://localhost:3000/box_geometries');
  }

  // get one specific geometry depends on the ID which is selected in the frontend
  getOneBox(boxId: string){
    return this.http.get<any>('http://localhost:3000/one_box/' + boxId);
  }

  // update the color of one specific geometry depends on the selected ID
  updateOneBox(boxId: string, color: string){
    console.log(color)
    return this.http.post<any>('http://localhost:3000/update_one_box/' + boxId + '/' + color, color);
  }

  // delete the specific geometry depends on the selected ID
  deleteOneBox(boxId: string){
    return this.http.delete<any>('http://localhost:3000/delete_one_box/' + boxId);
  }
}
