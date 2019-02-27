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

    var messageRef = firebase.database().ref('message/');
    messageRef.once('value', (snap) => {
      var newMessage = snap.val();
      console.log(JSON.stringify(snap.val()));
      
       this.messages.push (
           {"coin": newMessage.coin,
           "title": newMessage.title,
           "url": newMessage.url,
           "time": newMessage.time,
           });
           this.messages5 = [...this.messages];
       }
    // var messageRef = firebase.database().ref("message/");
    
    // messageRef.on("child_added", (data, prevChildKey) => {
    //   this.messages = [];
    //   var newMessage = data.val();

    //   console.log("coin: " + newMessage.coin);
    //   console.log("title: " + newMessage.title);
    //   console.log("url: " + newMessage.url);
    //   console.log("time: " + newMessage.time)
    //   //console.log("Previous Message: " + prevChildKey);

    //   //this.zone.run(() => {
    //     this.messages.push({
    //       "coin": newMessage.coin,
    //       "title": newMessage.title,
    //       "url": newMessage.url,
    //       "time": newMessage.time,
    //       //"prevChildKey": prevChildKey,

    //     });

    //     this.messages5 = [...this.messages];

    //   //});

    // })
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
