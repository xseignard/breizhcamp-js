'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('breizhcamp-js backend app', function() {

  describe('Geeks list view', function() {

    beforeEach(function() {
      browser().navigateTo('../../app/index.html');
    });


    it('should filter the geeks list as user types into the search box', function() {
      expect(repeater('.geeks div').count()).toBe(3);

      input('query').enter('Nantes');
      expect(repeater('.geeks div').count()).toBe(2);
    });

  });
});
