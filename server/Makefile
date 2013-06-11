MOCHA="node_modules/.bin/mocha"
_MOCHA="node_modules/.bin/_mocha"
JSHINT="node_modules/.bin/jshint"
YUIDOC="node_modules/.bin/yuidoc"
ISTANBUL="node_modules/.bin/istanbul"

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

checkstyle:
	@# check if reports folder exists, if not create it
	@test -d reports || mkdir reports
	$(JSHINT) src test --reporter=checkstyle > reports/checkstyle.xml || exit 0

coverage:
	@# check if reports folder exists, if not create it
	@test -d reports || mkdir reports
	$(ISTANBUL) cover --report lcovonly --dir ./reports $(_MOCHA) -- -R spec $(TESTS)
		
sonar:
	@# add the sonar sonar-runner executable to the PATH and run it
	PATH="$$PWD/tools/sonar-runner-2.2.1/bin:$$PATH" sonar-runner

docs:
	@# check if reports folder exists, if not create it
	@test -d reports || mkdir reports
	$(YUIDOC) src -o reports/docs

all: clean test jshint

ci: clean xunit checkstyle coverage sonar

.PHONY: test xunit jshint
