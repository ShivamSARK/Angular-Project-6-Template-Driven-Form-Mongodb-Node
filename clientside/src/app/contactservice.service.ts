import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {User} from './contact'

@Injectable({
  providedIn: 'root'
})
export class ContactserviceService {

  users:User[];

  constructor(private http:HttpClient) { }

  getData(){
    return this.http.get('http://localhost:3000/users');
  }
  addData(newUser){
    return this.http.post('http://localhost:3000/users',newUser);
  }
  deleteData(id){
    return this.http.delete('http://localhost:3000/users/'+id)
  }
  updateData(updatedUser,id){
    return this.http.put('http://localhost:3000/users/'+id,updatedUser);
  }
}
