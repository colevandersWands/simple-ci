'use strict';

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { describeIt } from './describe-it.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const sourceRelativePath = process.argv[2] || '../src';

const SOURCE_DIR = path.normalize(path.join(__dirname, sourceRelativePath));

const testFolder = async (dir) => {
  const paths = fs.readdirSync(dir);

  for (const nextPath of paths) {
    const testPath = path.normalize(path.join(dir, nextPath));

    const isDirectory =
      fs.existsSync(testPath) && fs.statSync(testPath).isDirectory();
    if (isDirectory) {
      await testFolder(testPath);
    }

    const isSpecFile = /.spec.js/.test(testPath);
    if (!isSpecFile) {
      continue;
    }

    const reportPath = path.join(
      testPath.split('.spec.js').join('.report.txt')
    );

    let report = '';

    // written to work with describeIt, not a general solution
    const outputIntercept = function () {
      for (const arg of arguments) {
        const colorsRemoved = arg
          .split('[32m')
          .join('')
          .split('[31m')
          .join('')
          .split('[0m')
          .join('')
          .split('[39m')
          .join('')
          .split('[90m')
          .join('');

        const cleanedStacks = colorsRemoved
          .split(path.dirname(__dirname))
          .join(' [ ... ] ');

        report += cleanedStacks;
      }
    };

    const { describe, it } = describeIt(outputIntercept);
    global.describe = describe;
    global.it = it;

    try {
      await import(testPath);
    } catch (err) {
      report = err.toString();
    }

    const compressedReport =
      new Date().toLocaleString() +
      '\n\n' +
      report.replace(/\n[ \t]{2,}\n/gim, '\n');

    fs.writeFile(reportPath, compressedReport, 'utf-8', (err) =>
      err ? console.error(err) : null
    );
  }
};

testFolder(SOURCE_DIR);
