import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private hubConnection: signalR.HubConnection;
  newOrder = new BehaviorSubject<any>(null);

  public startConnection = (hub: string) => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`https://localhost:44342/hubs/${hub}`)
      .configureLogging(signalR.LogLevel.Information)
      .build();
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch((err) => console.log('Error while starting connection: ' + err));
  };

  public newOrderListener = () => {
    if (this.hubConnection) {
      this.hubConnection.on('NewOrder', (data) => {
        this.newOrder.next(data);
      });
    }
  };
}
