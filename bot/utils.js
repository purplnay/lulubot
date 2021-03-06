/**
 * Remove mentions from a message.
 * @param {string} message The message.
 * @return {string} The message without mentions
 */
const removeMentions = message => {
  return message.replace(/(<@!?[0-9]+>)|(@[a-z]+)/ig, '');
};

/**
 * Remove extra spaces.
 * @param {string} message The message.
 * @return {string} The trimmed message.
 */
const trimMessage = message => {
  return message.replace(/\s\s+/g, ' ');
};

/**
 * Remove the delimiteres from a Discord message.
 * @param {string} message 
 * @return {string} The message with escaped delimiters.
 */
const removeDelimiters = message => {
  return message.replace(/%startf%/g, 'startf').replace(/%endf%/g, 'endf');
};

/**
 * Get the command name from a message, or null if none.
 * @param {string} message 
 * @return {string|null}
 */
const getCommand = message => {
  const command = trimMessage(removeMentions(message)).trim();
  
  if (['!start', '!stop', '!status'].indexOf(command) !== -1) {
    return command;
  }

  return null;
}

module.exports = {
  removeMentions, trimMessage, removeDelimiters, getCommand
};
