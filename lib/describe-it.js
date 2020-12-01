'use strict';

export const describeIt = (reporter) => {
  let depth = 0;
  let indent = '  ';

  const testConsole = {
    log: function () {
      const localIndent = Array(depth).fill(indent).join('');
      reporter(localIndent, ...Array.from(arguments), '\n');
    },
    group: function () {
      const localIndent = Array(depth).fill(indent).join('');
      reporter(localIndent, ...Array.from(arguments), '\n');
      depth++;
    },
    groupCollapsed: function () {
      const localIndent = Array(depth).fill(indent).join('');
      reporter(localIndent, ...Array.from(arguments), '\n');
      depth++;
    },
    groupEnd: function () {
      depth && depth--;
      const localIndent = Array(depth).fill(indent).join('');
      reporter(localIndent, ...Array.from(arguments), '\n');
    },
    error: function () {
      const localIndent = Array(depth).fill(indent).join('');
      reporter(
        localIndent,
        ...Array.from(arguments).map((entry) => {
          if (!entry) {
            return entry;
          }
          if (entry instanceof Error) {
            return entry.stack
              .toString()
              .split('\n')
              .join('\n' + localIndent);
          }
          return entry
            .toString()
            .split('\n')
            .join(localIndent + '\n');
        }),
        '\n'
      );
    },
  };

  return {
    describe: (description, testFunction, collapsed = false) => {
      if (typeof description !== 'string') {
        throw new TypeError('first argument must be a string');
      }
      if (typeof testFunction !== 'function') {
        throw new TypeError('second argument must be a function');
      }

      if (collapsed) {
        testConsole.groupCollapsed(`${description}`);
      } else {
        testConsole.group(`${description}`);
      }
      try {
        testFunction();
      } catch (err) {
        testConsole.error('SUITE ERROR: ', err);
      }
      testConsole.groupEnd();
    },

    it: (() => {
      let itIsCalled = false;
      return (description, testFunction) => {
        if (itIsCalled) {
          throw new Error('can not call it from inside of it');
        }
        if (typeof description !== 'string') {
          throw new TypeError('first argument must be a string');
        }
        if (typeof testFunction !== 'function') {
          throw new TypeError('second argument must be a function');
        }

        itIsCalled = true;

        const consoleBackup = Object.assign({}, console);
        const consoleCalls = [];
        for (let key in console) {
          if (typeof console[key] === 'function') {
            console[key] = function () {
              consoleCalls.push({ method: key, args: Array.from(arguments) });
            };
          }
        }

        let thrown = null;
        let threw = false;
        try {
          testFunction();
        } catch (exception) {
          threw = true;
          thrown = exception;
        }

        Object.assign(console, consoleBackup);

        if (threw) {
          // testConsole.groupCollapsed(`✖ FAIL: ${description}`);
          testConsole.groupCollapsed(`✖ ${description}`);
        } else {
          if (consoleCalls.length === 0) {
            // testConsole.log(`√ PASS: ${description}`);
            testConsole.log(`√ ${description}`);
            itIsCalled = false;
            return;
          }
          // testConsole.groupCollapsed(`√ PASS: ${description}`);
          testConsole.groupCollapsed(`√ ${description}`);
        }
        for (let call of consoleCalls) {
          console[call.method](...call.args);
        }
        if (threw) {
          testConsole.error(thrown);
        }
        testConsole.groupEnd();

        itIsCalled = false;
      };
    })(),
  };
};
