import { Test, TestingModule } from '@nestjs/testing';
import { IndexManagmentService } from './index_managment.service';

describe('IndexManagmentService', () => {
  let service: IndexManagmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IndexManagmentService],
    }).compile();

    service = module.get<IndexManagmentService>(IndexManagmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
