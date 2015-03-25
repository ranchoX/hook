var hook = require('hook').hook;
hook(Math, "max", function() {
  console.log("prev arguments ",arugments.join(','));
});
console.log(Math.max(5, 6, 7) )