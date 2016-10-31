var restify = require('restify');
var builder = require('botbuilder');
var sourceFile = require('./sourceFile');

//luis ai app model for CTD-TN-ChatBot
var recognizer = new builder.LuisRecognizer('https://api.projectoxford.ai/luis/v1/application?id=4bfd4766-4ee7-4ae5-a1d8-097f73158dc3&subscription-key=c9ad898006c6426d95251f015167aaa1&q=');
var dialog  = new builder.IntentDialog({ recognizers: [recognizer] });

// #chat connector
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());
// #end chat connector

// //#region Console Connector
// var connector = new builder.ConsoleConnector().listen();
// var bot = new builder.UniversalBot(connector, {
//     localizerSettings: {
//         botLocalePath: "./node_modules/botbuilder/lib/locale",
//         defaultLocale: "en"
//     }
// });
// var server = restify.createServer(); // Setup Restify Server
// server.get(/.*/, restify.serveStatic({ // Serve a static web page
//     'directory': '.',
//     'default': 'index.html'
// }));
// server.listen(process.env.port || process.env.PORT || 3978, process.env.IP || process.env.ip, function() {
//     console.log('%s listening to %s', server.name, server.url);
// });
// //#endregion Console Connector


// Create bot root dialog
bot.dialog('/', dialog);

//App 1
dialog.matches('None', builder.DialogAction.send(sourceFile.None));
dialog.matches('ITPortal', builder.DialogAction.send(sourceFile.ITPortal));
dialog.matches('FTCPassword', builder.DialogAction.send(sourceFile.FTCPassword));
dialog.matches('ForgotPassword', builder.DialogAction.send(sourceFile.ForgotPassword));
dialog.matches('DealerSearch', builder.DialogAction.send(sourceFile.DealerSearch));
dialog.matches('CommodityDetails', builder.DialogAction.send(sourceFile.CommodityDetails));
dialog.matches('CanceledDealer', builder.DialogAction.send(sourceFile.CanceledDealer));
dialog.matches('MapPractTransact', builder.DialogAction.send(sourceFile.MapPractTransact));
dialog.matches('ReportTaxEvasion', builder.DialogAction.send(sourceFile.ReportTaxEvasion));
dialog.matches('MacroSettingPopUp', builder.DialogAction.send(sourceFile.MacroSettingPopUp));
dialog.matches('MacroValidationError', builder.DialogAction.send(sourceFile.MacroValidationError));
dialog.matches('ContactTNCTD-HD', builder.DialogAction.send(sourceFile.ContactTNCTDHD));

