MOCHA="node_modules/.bin/mocha"
JSHINT="node_modules/.bin/jshint"

TESTS=$(shell find test/ -name "*.test.js")

clean:
	rm -rf reports

test:
	$(MOCHA) -R spec $(TESTS)
	
xunit:
	@# check if reports folder exists, if not create it
	@test -d reports || mkdir reports
	export XUNIT_FILE="reports/TESTS-xunit.xml"; \
	$(MOCHA) -R xunit-file $(TESTS)

jshint:
	$(JSHINT) src test --show-non-errors
	
.PHONY: test xunit jshint