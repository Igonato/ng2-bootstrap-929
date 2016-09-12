import { Ng2Bootstrap929Page } from './app.po';

describe('ng2-bootstrap-929 App', function() {
  let page: Ng2Bootstrap929Page;

  beforeEach(() => {
    page = new Ng2Bootstrap929Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
