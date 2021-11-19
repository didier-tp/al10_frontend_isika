import { TestBed } from '@angular/core/testing';

import { MyAuthInterceptor } from './my-auth.interceptor';

describe('MyAuthInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      MyAuthInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: MyAuthInterceptor = TestBed.inject(MyAuthInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
