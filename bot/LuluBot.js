const fs = require('fs');
const Corpus = require('./Corpus');
const { getCommand } = require('./utils');

class LuluBot {
  /**
   * @param {Corpus} [corpus] The corpus to use for the bot. If none, will load /corpus.json or an empty corpus.
   */
  constructor(corpus) {
    if (corpus === undefined) {
      if (fs.existsSync('corpus.json')) {
        corpus = Corpus.fromJSON(fs.readFileSync('corpus.json'));
      } else {
        corpus = new Corpus();
      }
    }

    /**
     * @type {Corpus}
     */
    this.corpus = corpus;

    /**
     * @type {boolean}
     */
    this.sleeping = false;
  }

  /**
   * Learn from a message or executes a command, then build a reply.
   * @param {string} message The discord message object.
   * @return {string} The bot-generated messasge or the command's reply.
   */
  reply(message) {
    let answer = '';

    switch (getCommand(message)) {
      case '!start':
        answer = this._start();
        break;
      case '!stop':
        answer = this._stop();
        break;
      case '!status':
        answer = this._getStatus();
        break;
      default:
        if (!this.sleeping) this.corpus.updateCorpus(message);
        answer = this.corpus.generateMessage();
        break;
    }

    return answer;
  }

  /**
   * Start the learning process.
   * @return {string}
   * @private
   */
  _start() {
    this.sleeping = false;

    return '*Wakes up*';
  }

  /**
   * Stop the learning process.
   * @return {string}
   * @private
   */
  _stop() {
    this.sleeping = true;

    return '*Zzzzz*';
  }

  /**
   * Get the bot's status.
   * @return {string}
   * @private
   */
  _getStatus() {
    return this.sleeping ? '*Sleeping*' : '*Learning*';
  }
}

module.exports = LuluBot;
