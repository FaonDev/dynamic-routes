import Local from './src/main';

var App = new Local(8155);
// -> TCP: 8155

App.setDefault('./src/routes/get/home');
App.useFolder('./src/routes');