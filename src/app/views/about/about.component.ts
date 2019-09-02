import { Component, OnInit, OnDestroy } from '@angular/core';
import {SocketService} from "../../services/socket.service"
import {Constants,VoiceMapper} from "../../global/Constants"
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router"
import {Subscription} from "rxjs"

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit,OnDestroy {
  activeRoute:any
  subscriptions:Subscription[]=[]
  constructor(
    private socketService:SocketService,
    private activatedRoute: ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit() {
    this.activeRoute=this.activatedRoute.url["_value"][0]["path"]
    let messageRecieved=this.socketService.messageRecieved.subscribe(x=>{
      if(!x){
        return;
      }
        

      console.log("x---->",VoiceMapper.ALEXA_COMMANDS[x["activity"]])
      let voice= VoiceMapper.ALEXA_COMMANDS[x["activity"]]
      if(voice["path"]!=this.activeRoute){
        return this.router.navigate([voice["path"]])
      }
      console.log()
      switch(x["activity"]){
        case "OpenAboutVUI":{
          break;
        }
    
       
      }
      
    })
    this.subscriptions.push(messageRecieved)
  }
  ngOnDestroy(){
    this.subscriptions.forEach(x=>x && x.unsubscribe())
  }

}
