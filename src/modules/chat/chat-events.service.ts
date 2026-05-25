import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';

@Injectable()
export class ChatEventsService {
  private readonly events = new Subject<MessageEvent>();

  emit(payload: unknown) {
    this.events.next({ data: payload } as MessageEvent);
  }

  stream() {
    return this.events.asObservable();
  }
}
