// common.js

// A simple function to log actions with a timestamp
function logAction(action, details) {
  console.log(`[${new Date().toISOString()}] Action: ${action} | Details:`, details);
}
