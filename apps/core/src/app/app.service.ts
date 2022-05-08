import { Injectable } from '@nestjs/common'
import { Message } from '@rovacc/core-interfaces'

@Injectable()
export class AppService {
  getData(): Message {
    return { message: 'Welcome to core!' }
  }
}
