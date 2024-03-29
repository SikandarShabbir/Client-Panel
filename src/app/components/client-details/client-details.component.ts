import { Component, OnInit } from '@angular/core';
import { ClientService } from "../../services/client.service";
import { Client } from '../../models/Client';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  id: string;
  client: Client;
  hasBalance: boolean = false;
  showBalanceUpdateInput: boolean = false;
  constructor(
    private clientService: ClientService,
    private flashMessage: FlashMessagesService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    //Get Id from URL
    this.id = this.route.snapshot.params['id'];
    this.clientService.getClient(this.id).subscribe(client => {
      if (client != null) {
        if (client.balance > 0) {
          this.hasBalance = true;
        }
      }
      this.client = client;
      // console.log(this.client);

    })
  }
  updateBalance(){
    this.clientService.updateClient(this.client);
    this.flashMessage.show('Balance Updated', {
      cssClass:'alert-success', timeout: 4000
    });
  } 
  onDeleteClick(){
    if (confirm("Are you sure?")) {
      this.clientService.deleteClient(this.client);
      this.flashMessage.show("Clenet Deleted Successfully",{
        cssClass:'alert-success', timeout:4000
      });
      this.router.navigate(['/']);
    }
  }
}
