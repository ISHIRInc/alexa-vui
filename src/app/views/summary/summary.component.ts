import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  authenticated: boolean = true;

  constructor(private router: Router,
    private authService: AuthService,
    private ngxService: NgxUiLoaderService) { }

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
          this.router.navigateByUrl('/tech-summary');
        } else {
          this.authenticated = false;
          location.href = "https://playground.eno8.com/";
        }
      });
    } else {
      this.authenticated = false;
      location.href = "https://playground.eno8.com/";
    }
  }

}
