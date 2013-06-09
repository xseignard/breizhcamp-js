describe('bzh.geektic', function() {

  beforeEach(function() {
      browser().navigateTo('../../index.html');
    }
  );

  it('should redirect everything to /', function() {
    expect(browser().location().url()).toBe('/');
    browser().navigateTo('../../index.html#/test');
    expect(browser().location().url()).toBe('/');
  });

  it('should have 12 geeks', function() {
    expect(element('.results > .result').count()).toEqual(12);
  });

  it('should load 6 geeks more', function() {
    element('.icon-search').click();
    sleep(1);
    expect(element('.results > .result').count()).toEqual(18);
  });

  it('should filter to 4 geeks when entering java as search input', function() {
    input('q').enter('java');
    sleep(1);
    expect(element('.results > .result').count()).toEqual(5);
  });

  it('should display the details when clicking on a geek', function() {
    expect(element('.details').count()).toEqual(0);
    element('.result').click();
    sleep(1);
    expect(element('.details').count()).toEqual(1);
  }); 


});