

import { MasterService } from './master.service';
import { FakeValueService } from './value-fake.service';
import { ValueService } from './value.service';

describe('MasterService', () => {
  let service: MasterService;



  it('should return "my value" from the real service', () => {
    const valueService = new ValueService();
    const masterServcice = new MasterService(valueService);
    expect(masterServcice.getValue()).toBe('my value');
  });

  it('should return "fake value" from the fake service', () => {
    const fakeValueService = new FakeValueService();
    const masterServcice = new MasterService(fakeValueService as unknown as ValueService);
    expect(masterServcice.getValue()).toBe('fake value');
  });

  it('should return "fake value" from the fake object', () => {
    const fake = {getValue: () => 'fake from obj'};
    const masterServcice = new MasterService(fake as ValueService);
    expect(masterServcice.getValue()).toBe('fake from obj');
  });
});
