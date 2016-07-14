import { ReadLaterPage } from './app.po';

describe('read-later App', function() {
  let page: ReadLaterPage;

  beforeEach(() => {
    page = new ReadLaterPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
