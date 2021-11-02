import { TestBed } from '@angular/core/testing';
import { Client } from '../../shared/models/client.model';
import { ClientService } from './client.service';

describe('ClientService', () => {
  let service: ClientService;
  let clients: Client[] = [];
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientService);
    
    clients = [
      new Client(1, "98111111111", "Luis", "Silveira"),
      new Client(2, "98222222222", "Carlos", "Barbosa"),
      new Client(3, "98333333333", "Pedro", "Schutz"),
      new Client(4, "98444444444", "João Paulo", "Ortiz"),
    ];

    var store: any = {};
    store["clients"] = JSON.stringify(clients);

    spyOn(Storage.prototype, 'getItem').and.callFake((key: string): string => {
      return store[key];
    });
    spyOn(Storage.prototype, 'removeItem').and.callFake((key: string): void => {
      delete store[key];
    });
    spyOn(Storage.prototype, 'setItem').and.callFake((key: string, value: string): string => {
      return store[key] = <string>value;
    });
    spyOn(Storage.prototype, 'clear').and.callFake(() => {
      store = {};
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the same list of clients that was inserted', () => {
    expect(
      JSON.stringify(service.listAll()))
      .toEqual(JSON.stringify(clients));
  });

  it('should insert a new object', () => {
    service.insert(new Client(5, "555555555555", "Luana", "Oliveira"));
    expect(service.listAll().length).toEqual(5);
  });


  it('should return "Luis" when searching for id=1', () => {
    expect(service.findById(1).firstName).toEqual("Luis");
  })

  it('should update "Carlos" to "Gabriela" in "Carlos Barbosa"', () => {
    service.update(new Client(2, "98222222222", "Gabriela", "Barbosa"));
    expect(service.findById(2).firstName).toEqual("Gabriela");
  })

  it('should remove client with id=2', () => {
    service.remove(3);
    expect(service.listAll().length).toEqual(3);
  })

});
