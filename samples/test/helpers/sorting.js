// This function is used for comparing console output when the
// order of the console output doesn't matter.

function sortConsoleOutput(output) {
  return output.split('\n').sort().join('\n');
}

module.exports = sortConsoleOutput;
