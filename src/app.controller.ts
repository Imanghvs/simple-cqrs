import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async bid(): Promise<Record<string, any>> {
    return this.appService.bid();
  }
}
