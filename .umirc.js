import fs from 'fs';
import path from 'path';

// ref: https://umijs.org/config/
export default {
  targets: {
    ie: 11,
  },
  chainWebpack(memo, { env, webpack }) {
    memo.output.libraryTarget('amd');

    memo.externals([
      function(context, request, callback) {
        // Every module prefixed with "global-" becomes external
        // "global-abc" -> abc
        if (
          /^dojo/.test(request) ||
          /^dojox/.test(request) ||
          /^dijit/.test(request) ||
          /^esri\//.test(request)
        ) {
          return callback(null, 'amd ' + request);
        }
        callback();
      },
    ]);
    // fs.writeFileSync('C:\\Projects\\umi-amd\\log.txt', JSON.stringify(memo.toConfig()));
  },
};
