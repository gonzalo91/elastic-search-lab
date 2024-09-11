import { Test, TestingModule } from '@nestjs/testing';
import { IndexManagmentController } from './index_managment.controller';

describe('IndexManagmentController', () => {
  let controller: IndexManagmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IndexManagmentController],
    }).compile();

    controller = module.get<IndexManagmentController>(IndexManagmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
