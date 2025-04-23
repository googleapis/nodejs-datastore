// logger-setup.js (or include this at the top of your main script)

const fs = require('fs');
const util = require('util'); // For formatting messages like console.log does
const path = require('path'); // To handle file paths robustly

// --- Configuration ---
const logFileName = 'app.log';
// Use path.join for cross-platform compatibility
const logFilePath = path.join(__dirname, logFileName); // Puts log file in the same directory as the script
const logToConsoleToo = true; // Set to false if you ONLY want file logging
// --------------------

// Create a writable stream (flags: 'a' means append)
// This opens the file once and keeps it open for writing.
const logStream = fs.createWriteStream(logFilePath, {flags: 'a'});

console.log(`Logging initialized. Output will be written to: ${logFilePath}`);

// Store original console methods
const originalConsoleLog = console.log;
const originalConsoleWarn = console.warn;
const originalConsoleError = console.error;
const originalConsoleInfo = console.info;
const originalConsoleDebug = console.debug;

// Function to format the log entry
function formatLogEntry(level, args) {
  const timestamp = new Date().toISOString();
  // Use util.format to handle multiple arguments, object formatting, etc., like console.log
  const message = util.format(...args);
  return `[${timestamp}] [${level.toUpperCase()}] ${message}\n`;
}

// --- Override Console Methods ---

console.log = function (...args) {
  const logEntry = formatLogEntry('log', args);
  logStream.write(logEntry);
  if (logToConsoleToo) {
    originalConsoleLog.apply(console, args); // Call original log
  }
};

console.warn = function (...args) {
  const logEntry = formatLogEntry('warn', args);
  logStream.write(logEntry);
  if (logToConsoleToo) {
    originalConsoleWarn.apply(console, args);
  }
};

console.error = function (...args) {
  const logEntry = formatLogEntry('error', args);
  logStream.write(logEntry);
  if (logToConsoleToo) {
    originalConsoleError.apply(console, args);
  }
};

console.info = function (...args) {
  const logEntry = formatLogEntry('info', args);
  logStream.write(logEntry);
  if (logToConsoleToo) {
    originalConsoleInfo.apply(console, args);
  }
};

console.debug = function (...args) {
  const logEntry = formatLogEntry('debug', args);
  logStream.write(logEntry);
  if (logToConsoleToo) {
    originalConsoleDebug.apply(console, args);
  }
};

// --- Graceful Shutdown ---
// Ensure logs are flushed before exiting
function cleanup() {
  originalConsoleLog('Process exiting. Closing log stream...'); // Use original log here
  return new Promise(resolve => {
    logStream.end(resolve); // Close the stream and resolve when done
  });
}

// Handle normal exit
process.on('exit', () => {
  // Note: Cannot use async operations directly in 'exit' handler
  // If log flushing is critical, handle it in signal handlers below
  originalConsoleLog('Log stream potentially closing due to exit.');
  // logStream.end(); // May not complete fully here
});

// Handle graceful termination signals
['SIGINT', 'SIGTERM', 'SIGUSR2'].forEach(signal => {
  process.once(signal, async () => {
    originalConsoleLog(`Received ${signal}. Cleaning up...`);
    await cleanup();
    process.kill(process.pid, signal); // Re-signal to exit after cleanup
  });
});

// Handle uncaught exceptions (optional, but good practice)
process.on('uncaughtException', async err => {
  originalConsoleError('Uncaught Exception:', err); // Use original error
  // Attempt to log the error to the file before crashing
  const logEntry = formatLogEntry('FATAL', [
    'Uncaught Exception:',
    util.format(err),
  ]);
  logStream.write(logEntry);

  await cleanup();
  process.exit(1); // Exit with failure code
});

// Handle stream errors
logStream.on('error', err => {
  originalConsoleError('Error writing to log stream:', err);
});

// --- Example Usage (if this file is run directly) ---
if (require.main === module) {
  // This block runs only if you execute `node logger-setup.js` directly
  // If you require('./logger-setup.js') from another file, this block won't run here.

  console.log('This is a standard log message.');
  console.warn('This is a warning message.');
  console.error('This is an error message.');
  console.info({message: 'This is an info object', value: 123});
  console.debug(
    'This is a debug message (might not show in console by default).'
  );

  const user = {id: 1, name: 'Alice'};
  console.log('User object:', user);

  // Simulate exiting after a delay
  setTimeout(async () => {
    console.log('Simulating exit.');
    // In a real app, you might not call process.exit() directly
    // but let the app finish naturally or handle signals.
    // Forcing exit here to demonstrate cleanup.
    await cleanup(); // Manually trigger cleanup if forcing exit
    process.exit(0);
  }, 2000);
}

// Export something simple if needed when required by other modules
// (often not necessary if just setting up logging globally)
module.exports = {
  logFilePath, // Export the path if other modules might need it
};
