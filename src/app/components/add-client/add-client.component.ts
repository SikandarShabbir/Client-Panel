import { Component, OnInit, ViewChild } from '@angular/core';
import { Client } from '../../models/Client';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { ClientService } from '../../services/client.service';
import { Router } from '@angular/router';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  client: Client = {
    firstName:'',
    lastName:'',
    email:'',
    phone:'',
    balance:0,
  }
  disableBalanceOnAdd: boolean; 
  @ViewChild('clientForm', {static: true}) form :any;
  constructor(
    private flashMessage: FlashMessagesService,
    private clientService: ClientService,
    private router: Router,
    private settingsService: SettingsService,
    ) { }

  ngOnInit() {
    // client: Client;
    this.disableBalanceOnAdd = this.settingsService.getSettings().disableBalanceOnAdd;
  }
  onSubmit({value, valid}: {value: Client, valid: boolean}){
    if (this.disableBalanceOnAdd) {
        value.balance = 0;
      }
      if (!valid) {
        this.flashMessage.show('Please fill out the form correctly',{
          cssClass:'alert-danger', timeout:4000
        });
      } else {
        // Add Client
        this.clientService.newClient(value);
        //Show Success Message
        this.flashMessage.show('New Client Added',{
          cssClass:'alert-success', timeout:4000
        });
        // Navigate to Dashboard
        this.router.navigate(['/']);
      }
  }

}
