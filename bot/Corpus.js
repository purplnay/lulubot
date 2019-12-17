const fs = require('fs');
const { removeMentions, trimMessage, removeDelimiters } = require('./utils');

class Corpus {
  /**
   * @param {Object} [data] The corpus data to use, or none.
   */
  constructor(data = {'%startf%': []}) {

    /**
     * The corpus structure.
     * @type {Object}
     */
    this.words = data;
  }

  /**
   * Update the corpus with a new message.
   * @param {string} message The raw message content from Discord.
   */
  updateCorpus(message) {
    // Add delimiters and split the message.
    const cleanedMessage = removeDelimiters(removeMentions(message));
    const words = trimMessage(`%startf% ${cleanedMessage} %endf%`).split(' ');

    // Add words to the corpus.
    words.forEach((word, index) => {
      if (word === '%endf%') return;
      
      if (this.words[word] === undefined) this.words[word] = [];

      this.words[word].push(words[index + 1]);
    });
  }

  /**
   * Generate a message using the current corpus.
   * Do not use an empty corpus or the function will fail.
   * @return {string}
   */
  generateMessage() {
    const message = ['%startf%'];

    // Get next word while the last word is not %end% delimiter.
    while (message[message.length - 1] !== '%endf%') {
      const lastWord = message[message.length - 1];
      const possibleWords = this.words[lastWord];
      const nextWord = possibleWords[Math.floor(Math.random() * possibleWords.length)];

      message.push(nextWord);
    }

    // Remove delimiters.
    message.shift();
    message.pop();

    return message.join(' ');
  }

  /**
   * Save the corpus to a JSON file.
   * @param {string} [path] The path where to save the file. Defaults to 'corpus.json'.
   * @return {Promise<void,NodeJS.ErrnoException>}
   */
  saveCorpus(path = 'corpus.json') {
    return new Promise((r, e) => {
      fs.writeFile(path, this.toJSON(), err => {
        if (err) return e(err);

        r();
      });
    });
  }

  /**
   * Convert the corpus to a JSON string.
   * @return {string}
   */
  toJSON() {
    return JSON.stringify(this.words);
  }

  /**
   * Create a Corpus object from JSON data.
   * @param {string} json The JSON corpus data as a string.
   * @return {Corpus}
   */
  static fromJSON(json) {
    return new Corpus(JSON.parse(json));
  }
}

module.exports = Corpus;
