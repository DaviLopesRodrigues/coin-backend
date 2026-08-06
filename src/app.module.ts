import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SecurityModule } from './modules/security/security.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';

@Module({
  imports: [SecurityModule, PrismaModule, UserModule, RoleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
