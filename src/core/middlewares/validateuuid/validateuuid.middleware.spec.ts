import { ValidateUUIDMiddleware } from './validateuuid.middleware';

describe('ValidateuuidMiddleware', () => {
  it('should be defined', () => {
    expect(new ValidateUUIDMiddleware()).toBeDefined();
  });
});
