import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ClientService } from "../../services/client.service";
import { Client } from '../../models/Client';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email: string;
  password: string;
  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {

  }
  onSubmit(){
    this.authService.register(this.email, this.password)
    .then(res=> {
      this.flashMessage.show('You are now registered!',{
        cssClass: 'alert-success', timeout:4000
      });
    }).catch(err => {
      this.flashMessage.show(err,{
        cssClass: 'alert-danger', timeout: 4000
      });
    });
  }
}
