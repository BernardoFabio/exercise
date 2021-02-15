import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor( private firestore: AngularFirestore)
   {  }

   saveDates(dato: any){
      return this.firestore.collection("datos").add(dato);
   }

    getDates(userId:string){
      return this.firestore.collection("datos").snapshotChanges();
    }
         
  deleteDates(id: any){
       return this.firestore.collection("datos").doc(id).delete();
   }

   updateDates(id:any, dato:any){
      return this.firestore.collection("datos").doc(id).update(dato);
   }   

}
