import { MynumberPipe } from './mynumber.pipe';

describe('MynumberPipe', () => {
  it('create an instance', () => {
    const pipe = new MynumberPipe();
    expect(pipe).toBeTruthy();
  });
});
