import { NotImplementedException } from './not-implemented-exception';

describe('NotImplementedException', () => {
  it('should create an instance', () => {
    expect(new NotImplementedException()).toBeTruthy();
  });
});
