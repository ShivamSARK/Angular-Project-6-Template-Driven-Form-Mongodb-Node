import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContactserviceService } from '../contactservice.service';
import {User} from '../contact'

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {


  @ViewChild('userDetail') userDetail:NgForm;
  constructor(private _contactservice:ContactserviceService) { }

  users:User[];
  newId: any = null;

  ngOnInit(): void {

    this.fetchData();
    
  }

  fetchData(){

    this._contactservice.getData().subscribe(
      (response)=>{
        const data = JSON.stringify(response);
        this.users = JSON.parse(data);
      }
    )

  }

  
  onSubmit(form:NgForm){
    if(this.newId==null){
      const newUser ={
        fname:this.userDetail.value.fname,
        lname:this.userDetail.value.lname,
        age:this.userDetail.value.age,
        mobile:this.userDetail.value.mobile,
        skills:this.userDetail.value.skills
      }
      this._contactservice.addData(newUser).subscribe(
        (response)=>{
          const data = JSON.stringify(response);
          this.users.push(JSON.parse(data));
        }
      )
      this.userDetail.reset();
    }
    else{
      const updatedUser = {
        fname:this.userDetail.value.fname,
        lname:this.userDetail.value.lname,
        age:this.userDetail.value.age,
        mobile:this.userDetail.value.mobile,
        skills:this.userDetail.value.skills
      }
      this._contactservice.updateData(updatedUser,this.newId).subscribe(
        (response)=>{}
        
      )
      this.newId = null;
      this.userDetail.reset();
     this.fetchData();
     this.fetchData();
     
  
    }
  
  }




  onRemove(id:any){
    this._contactservice.deleteData(id).subscribe(
      (response)=>{
        this.ngOnInit();
      }
    )
  }

  onUpdate(user,i){
    this.newId = user._id;
   this.userDetail.setValue({
      fname:user.fname,
      lname:user.lname,
      age:user.age,
      mobile:user.mobile,
      skills:user.skills
    })
    }

 
}
