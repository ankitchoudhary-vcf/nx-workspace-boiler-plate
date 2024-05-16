import { Module } from '@nestjs/common';

import { OrmModule } from '@app/orm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [OrmModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
