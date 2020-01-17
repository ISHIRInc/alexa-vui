import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private authService: AuthService,
    private router: Router,
    private ngxService: NgxUiLoaderService) { }

  ngOnInit() {
    const token = localStorage.getItem("userToken");
    console.log("Token: ", token);
    if (token) {
      this.ngxService.start();
      this.authService.validateToken(token).subscribe(res => {
        this.ngxService.stop();
        console.log(res);
        if (res.success) {
          this.router.navigateByUrl('/skill-manipulation');
        } else {
          location.href = "https://playground.eno8.com/";
        }
      });
    } else {
      location.href = "https://playground.eno8.com/";
    }
  }

}
