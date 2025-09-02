import { Injectable } from '@nestjs/common';

@Injectable()
export class EnrollmentServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
