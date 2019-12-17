const fs = require('fs');
const Corpus = require('./Corpus');

class LuluBot {
  /**
   * @param {Corpus} [corpus] The corpus to use for the bot. If none, will load /corpus.json or an empty corpus.
   */
  constructor(corpus) {
    if (corpus === undefined) {
      if (fs.existsSync('corpus.json')) {
        this.corpus = Corpus.fromJSON(fs.readFileSync('corpus.json'));
      } else {
        this.corpus = new Corpus();
      }
    } else {
      this.corpus = corpus;
    }

  }

  /**
   * Learn from a message, then build a reply.
   * @param {string} message The discord message object.
   * @return {string} The bot-generated messasge.
   */
  reply(message) {
    this.corpus.updateCorpus(message);

    return this.corpus.generateMessage();
  }
}

module.exports = LuluBot;
