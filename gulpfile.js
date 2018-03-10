//when you use the require function you don't need to include the '.js'
/*
the require syntax works in our gulp file becuase gulp runs within the context of node.js
and node supports the require and import functionality, so if we wanted to use 'require' on
a .js file for our application it wouldn't be recognized by the browser
*/
require('./gulp/tasks/styles');
require('./gulp/tasks/watch');
require('./gulp/tasks/sprites');
//-scripts- it works here but maybe it should be over the watch task
require('./gulp/tasks/scripts');
require('./gulp/tasks/modernizr');
