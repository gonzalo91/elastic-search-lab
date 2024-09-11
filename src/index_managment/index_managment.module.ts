import { Module } from '@nestjs/common';
import { IndexManagmentService } from './index_managment.service';
import { IndexManagmentController } from './index_managment.controller';

@Module({
  providers: [IndexManagmentService],
  controllers: [IndexManagmentController]
})
export class IndexManagmentModule {}
