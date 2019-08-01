const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends stream.Transform {
  constructor(options) {
    super(options);
    this.limit = options.limit || 1024;
    this.size = 0;
    console.log(options);
  }

  _transform(chunk, encoding, callback) {
    this.size += Buffer.byteLength(chunk, encoding);
    console.log(this.size);
    if (this.size >= this.limit) {
      callback(new LimitExceededError(), chunk);
    }
    callback(null, chunk);
  }
}

module.exports = LimitSizeStream;
