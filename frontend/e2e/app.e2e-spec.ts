import { AncliPage } from './app.po';

describe('ancli App', () => {
  let page: AncliPage;

  beforeEach(() => {
    page = new AncliPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
