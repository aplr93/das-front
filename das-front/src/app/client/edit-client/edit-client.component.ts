import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../../shared/models';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

  @ViewChild("formClient") formClient!: NgForm;
  client!: Client;

  constructor(
    private clientService: ClientService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    let id = +this.route.snapshot.params['id'];
    this.client = this.clientService.findById(id);
  }

  update(): void {
    
    if (this.formClient.form.valid) {
      this.clientService.update(this.client);
      this.router.navigate(['/clients']);
    }
  }

}
