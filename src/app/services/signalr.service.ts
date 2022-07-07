import { EventEmitter, Injectable } from '@angular/core';
import { SystemConstants } from '../common/system.constants';
import { AuthService } from './auth.service';
declare var $: any;
@Injectable()
export class SignalrService {
  private proxy: any;
  private proxyName: string = 'WorkHub';
  private connection: any;
  // create the Event Emitter  
  public announcementReceived: EventEmitter<any>;

  public connectionEstablished: EventEmitter<Boolean>;
  public connectionExists: Boolean;

  constructor(private authService: AuthService) { 
    this.connectionEstablished = new EventEmitter<Boolean>();
    this.announcementReceived = new EventEmitter<any>();
    this.connectionExists = false;
    // create hub connection  
    this.connection = $.hubConnection(SystemConstants.BASE_API);
    this.connection.qs = { "access_token": authService.getLoggedInUser().access_token };
    // create new proxy as name already given in top  
    this.proxy = this.connection.createHubProxy(this.proxyName);
    // register on server events  
    this.registerOnServerEvents();
    // call the connecion start method to start the connection to send and receive events.  
    this.startConnection();
  }
  private startConnection(): void {
    this.connection.start().done((data: any) => {
      console.log('Now connected ' + data.transport.name + ', connection ID= ' + data.id);
      this.connectionEstablished.emit(true);
      this.connectionExists = true;
    }).fail((error: any) => {
      console.log('Could not connect ' + error);
      this.connectionEstablished.emit(false);
    });
  }

  private registerOnServerEvents(): void {
    this.proxy.on('addAnnouncement', (announcement: any) => {
      this.announcementReceived.emit(announcement);
    });
  }
}
