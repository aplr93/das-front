import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Client } from '../../shared/models';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-insert-client',
  templateUrl: './insert-client.component.html',
  styleUrls: ['./insert-client.component.css']
})
export class InsertClientComponent implements OnInit {

  @ViewChild('formClient') formClient!: NgForm;
  client!: Client;
  transactionErrorMessage: string = "";

  constructor(
    private clientService: ClientService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.client = new Client();
  }

  insert(): void {
    if (this.formClient.form.valid) {
      this.clientService.insert(this.client).subscribe({
        error: errorResponse => this.displayError(errorResponse),
        complete: () => this.browseToClientsPage()
      });
    }
  }

  browseToClientsPage(): void {
    this.router.navigate( ["/clients"] );
  }

  displayError(errorResponse: any): void{
    console.log(errorResponse);
    this.transactionErrorMessage = errorResponse.error;
  }
}
