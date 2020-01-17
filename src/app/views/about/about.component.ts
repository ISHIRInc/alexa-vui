import { Component, OnInit, OnDestroy } from '@angular/core';
import {SocketService} from "../../services/socket.service"
import {Constants,VoiceMapper} from "../../global/Constants"
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router"
import {Subscription} from "rxjs"
import { AuthService } from 'src/app/services/auth.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit,OnDestroy {
  authenticated: boolean = true;
  activeRoute:any
  subscriptions:Subscription[]=[]
  constructor(
    private socketService:SocketService,
    private activatedRoute: ActivatedRoute,
    private router:Router,
    private authService: AuthService,
    private ngxService: NgxUiLoaderService
  ) { }

  ngOnInit() {
    const token = localStorage.getItem("userToken");
    if (token) {
      this.ngxService.start();
      this.authService.validateToken(token).subscribe(res => {
        this.ngxService.stop();
        console.log(res);
        debugger;
        if (res.success) {
          this.authenticated = true;
          this.router.navigateByUrl('/about-us');
        } else {
          this.authenticated = false;
          location.href = "https://playground.eno8.com/";
        }
      });
    } else {
      this.authenticated = false;
      location.href = "https://playground.eno8.com/";
    }

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
