import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server;

  // wsClients = [];

  afterInit(server: Server) {
    console.log('Init');
  }

  handleDisconnect(client: Socket) {
    console.log(`Client Disconnected : ${client.id}`);
  }

  handleConnection(client: Socket) {
    console.log(`Client Connected : ${client.id}`);
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: string, @ConnectedSocket() client): void {
    // const { sids, rooms } = client.adapter;
    // console.log(sids);
    // console.log(rooms);
    // console.log('\n\n');
    const [room, name, message] = data;
    this.server.to(room).emit('message', { name, message, room });
  }

  @SubscribeMessage('enter_room')
  enterRoom(@MessageBody() data: string, @ConnectedSocket() client) {
    const [nickname, room] = data;
    client.join(room, (err: any) => {
      if (err) {
        console.log(err);
      }
    });
    console.log(`${nickname}님이 : ${room}방에 접속했습니다.`);
    // this.wsClients.push(client);
  }

  @SubscribeMessage('leave_room')
  leaveRoom(@MessageBody() data: string, @ConnectedSocket() client) {
    const [nickname, room] = data;
    client.leave(room, (err: any) => {
      if (err) {
        console.log(err);
      }
    });
    const message = `${nickname}님이 : ${room}방에서 나갔습니다.`;
    this.server.to(room).emit('message', { name: 'system', message, room });
    console.log(message);
  }
}
