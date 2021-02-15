import { identifierModuleUrl } from '@angular/compiler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import {FirebaseService} from "./firebase.service";

import firebase from 'firebase/app';// <–------------------
import { AngularFireAuth } from '@angular/fire/auth';// <–------------------

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'exercise';

datosForm: FormGroup;
collection:any ={data:[]};

idFirebaseUpdate: string;
actualizar: boolean;



userId: string; // <–------------------
user: firebase.User;  // <–------------------


  constructor(private firebaseService: FirebaseService, public fb: FormBuilder,
    private afAuth: AngularFireAuth){  } 

    
 
    ngOnInit(): void {

      this.idFirebaseUpdate="";
      this.actualizar = false;

     this.datosForm = this.fb.group({
       texto: ["", Validators.required],
       numero:["", Validators.required],
      
     });

     // <–------------------    
    this.afAuth.user.subscribe(user=>{
     if(user){
       this.firebaseService.getDates(user.uid);
       this.user=user;
      }
    })

        
    this.firebaseService.getDates(this.userId).subscribe(resp=>{
      this.collection.data = resp.map((e:any)=>{
        return {
          texto: e.payload.doc.data().texto,
          numero: e.payload.doc.data().numero,
          idFirebase: e.payload.doc.id,  
           userId:this.user?.uid, // <—------
        }
      })
    },
      error => {
        console.error(error);
      }      
    );

      
    }       


    save():void{
      this.firebaseService.saveDates(this.datosForm.value).then(res=>{
        console.log("ola");       

      }).catch(error=>{
        console.log(error);        
      })
    }

    delete(item: any): void{
      this.firebaseService.deleteDates(item.idFirebase);
    }

    openUpdate(item: any){
      this.datosForm.setValue({
        texto: item.texto,
        numero: item.numero,      
      });
      this.idFirebaseUpdate = item.idFirebase;  
       
      this.actualizar = true;       
    }
    
    update(){      
        if (this.idFirebaseUpdate != null || this.idFirebaseUpdate != undefined){
        this.firebaseService.updateDates(this.idFirebaseUpdate,this.datosForm.value).then(resp=>{
        }).catch(error=>{
          console.error(error);
        })
      }           
    }   

  }
 


