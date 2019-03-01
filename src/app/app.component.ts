import { Component, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { text } from '@angular/core/src/render3';
import * as firebase from 'firebase';
import { viewAttached } from '@angular/core/src/render3/instructions';
import { timestamp } from 'rxjs/operators';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { Key } from 'protractor';
import { link } from 'fs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

 
   public message: any = {
      coin: "",
      title: "",
      url: "",
      time:""
    }


  public messages = [];
  public messages5 = [];
  constructor(db: AngularFireDatabase, private zone: NgZone) {
    this.message = db.list('/message');

  }
  

  view(): void {
    var listing = this.messages;
    for (var i =0; i<listing.length;i++) {
      listing[i].remove();
    };
    var ref = firebase.database().ref("message/");
    ref.on("child_added", (snapshot, prevChildKey) => {
      
      var newMessage = (snapshot.val());
      console.log(listing)
      
      
       this.messages.push(
           {"coin": (newMessage.coin),
           "title": (newMessage.title),
           "url": (newMessage.url),
           "time": (newMessage.time)
           });
           console.log('------')
           this.messages5 = [this.messages];
           console.log(this.messages)
       }

          // var messageRef = firebase.database().ref("message/");
    
    // messageRef.on("child_added", (data) => {
    //   //this.messages = [];
    //   var newMessage = data.val();

    //   // console.log("coin: " + newMessage.coin);
    //   // console.log("title: " + newMessage.title);
    //   // console.log("url: " + newMessage.url);
    //   // console.log("time: " + newMessage.time)
    //   //console.log("Previous Message: " + prevChildKey);

    //   //this.zone.run(() => {
    //     this.messages.push({
    //       "coin": (newMessage.coin),
    //       "title": (newMessage.title),
    //       "url": (newMessage.url),
    //       "time": (newMessage.time),
    //       //"prevChildKey": prevChildKey,

    //     });
        
        
    //     //console.log(this.messages[0].coin)
    //     //console.log(this.messages[0].title)
    //     //console.log(this.messages[0].url)
    //     //console.log(this.messages[0].time)
    //     console.log(this.messages)
    //     this.messages5 = this.messages;

      //});

    //})
  )};

  cancel(): void {
    console.log('do nothing')
    this.message.coin = ""
    this.message.url = ""
  }
  save(): void {
    let error = false;

    if (error === false) {
      this.message.push({
        "coin": this.message.coin,
        "title": this.message.title,
        "url": this.message.url,
        "time": firebase.database.ServerValue.TIMESTAMP

      });
      console.log(this.message);
      alert("Submitted Successfully!");
      this.message.coin = ""
      this.message.title = ""
      this.message.url = ""

    }
  }
}
