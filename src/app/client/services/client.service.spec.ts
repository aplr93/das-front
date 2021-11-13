import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Client } from '../../shared/models/client.model';
import { ClientService } from './client.service';

describe('ClientService', () => {
  let service: ClientService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let clients: Client[] = [];
  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);
    TestBed.configureTestingModule({
      providers: [
        ClientService,
        {provide: HttpClient, useValue: spy }
      ],
    });
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    service = TestBed.inject(ClientService);

    clients = [
      new Client(1, "98111111111", "Luis", "Silveira"),
      new Client(2, "98222222222", "Carlos", "Barbosa"),
      new Client(3, "98333333333", "Pedro", "Schutz"),
      new Client(4, "98444444444", "João Paulo", "Ortiz"),
    ];

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the same list of clients that was inserted', () => {
    httpClientSpy.get.and.returnValue(of(clients));
    service.listAll().subscribe(
      clientList => expect(clientList).toEqual(clients)
    );
    expect(httpClientSpy.get.calls.count()).toEqual(1);
  });

  it('should insert a new valid client', () => {
    let newClient = new Client(5, "55555555555", "Luana", "Oliveira");
    httpClientSpy.post.and.returnValue(of(clients.push(newClient)));
    service.insert(newClient).subscribe(
      returnedClient => expect(returnedClient).toBeTruthy()
    );
    expect(httpClientSpy.post.calls.count()).toEqual(1);
  });

  it('should return "Luis" when searching for id=1', () => {
    httpClientSpy.get.and.returnValue(of(clients[0]));
    service.findById(1).subscribe(
      client => expect(client.firstName).toEqual('Luis')
    );
    expect(httpClientSpy.get.calls.count()).toEqual(1);
  });

  it('should update "Carlos" to "Gabriela" in "Carlos Barbosa"', () => {
    let clientToBeEdited = new Client(2, "98222222222", "Gabriela", "Barbosa");
    httpClientSpy.put.and.returnValue(of(clientToBeEdited));
    service.update(clientToBeEdited).subscribe(
      returnedClient => {
        expect(returnedClient).toBeTruthy();
        expect(returnedClient.firstName).toEqual('Gabriela');
      }
    );
    expect(httpClientSpy.put.calls.count()).toEqual(1);
  })

  it('should remove client with id=2', () => {
    let clientToBeRemoved = clients[1];
    httpClientSpy.delete.and.returnValue(of(clientToBeRemoved));
    service.remove(1).subscribe(
      returnedClient => expect(returnedClient).toBeTruthy()
    );
    expect(httpClientSpy.delete.calls.count()).toEqual(1);
  })

});
