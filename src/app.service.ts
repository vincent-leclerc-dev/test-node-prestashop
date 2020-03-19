import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    console.log('hello PrestaShop');
    return 'hello PrestaShop';
  }
  getInfos(): string {
    console.log('pod name: ' + process.env.POD_NAME);
    return 'pod name: ' + process.env.POD_NAME;
  }
}
