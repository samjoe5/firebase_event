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
    events: "",
    time:""
  }

  public messages = [];
  public messages5 = [];
  constructor(db: AngularFireDatabase, private zone: NgZone) {
    this.message = db.list('/message');

  }
  view(): void {
    var messageRef = firebase.database().ref("message/");
    
    messageRef.on("child_added", (data, prevChildKey) => {
      var newMessage = data.val();

      console.log("coin: " + newMessage.coin);
      console.log("events: " + newMessage.events);
      console.log("time: " + newMessage.time)
      console.log("Previous Message: " + prevChildKey);

      this.zone.run(() => {
        this.messages.push({
          "coin": newMessage.coin,
          "events": newMessage.events,
          "time": newMessage.time,
          "prevChildKey": prevChildKey,

        });

        this.messages5 = [...this.messages].slice(1).slice(-5);

      });

    })
  };

  // time(): void {
  //   var userLastOnlineRef = firebase.database().ref("message/");
  //   userLastOnlineRef.onDisconnect().set(firebase.database.ServerValue.TIMESTAMP);
  //   userLastOnlineRef.on('value', (snapshot) => {
  //     console.log(snapshot.val());
  //   });
  // }

  cancel(): void {
    console.log('do nothing')
    this.message.coin = ""
    this.message.events = ""
  }
  save(): void {
    let error = false;

    if (error === false) {
      this.message.push({
        "coin": this.message.coin,
        "events": this.message.events,
        "time": firebase.database.ServerValue.TIMESTAMP

      });
      console.log(this.message);
      alert("Submitted Successfully!");
      this.message.coin = ""
      this.message.events = ""

    }
  }
}
