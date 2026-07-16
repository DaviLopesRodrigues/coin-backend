import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigEnvModule } from './modules/config-env/config-env.module';

@Module({
  imports: [ConfigEnvModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
