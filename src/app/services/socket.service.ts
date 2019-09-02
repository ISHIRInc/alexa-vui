import { Injectable } from '@angular/core';
import { webSocket } from "rxjs/webSocket";
import {Constants} from "../global/Constants"
import {BehaviorSubject} from "rxjs"

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket
  messageRecieved:BehaviorSubject<any>
  // recievedData:any
  constructor() { 
    this.socket = webSocket(Constants.SOCKET_URL);
    this.messageRecieved=new BehaviorSubject(null)
    this.socket.subscribe(
      msg => this.messageRecieved.next(msg), // Called whenever there is a message from the server.
      err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
      () => console.log('complete') // Called when connection is closed (for whatever reason).
    );

    // this.messageRecieved.subscribe(x=>this.recievedData)
  }
  getSocket(){
    return this.socket
  }
  closeSocket(){
    return this.socket.complete()
  }
}
