import { BookInterfacePage } from './app.po';

describe('book-interface App', () => {
  let page: BookInterfacePage;

  beforeEach(() => {
    page = new BookInterfacePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
