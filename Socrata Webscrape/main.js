'use strict';

var DMV_LOCATIONS = [
   {
      ":@computed_region_kjdx_g34t":"2135",
      ":@computed_region_wbg7_3whc":"667",
      "city":"Oswego",
      "friday_beginning_hours":"9:00 AM",
      "friday_ending_hours":"4:45 PM",
      "has_kiosk":"N",
      "latitude":"43.431512",
      "location":{
         "type":"Point",
         "coordinates":[
            -76.483322,
            43.431512
         ]
      },
      "longitude":"-76.483322",
      "monday_beginning_hours":"9:00 AM",
      "monday_ending_hours":"4:45 PM",
      "office_name":"OSWEGO",
      "office_type":"CO",
      "public_phone_extension":"     ",
      "public_phone_number":"3153498300",
      "saturday_beginning_hours":"        ",
      "saturday_ending_hours":"        ",
      "state":"NY",
      "street_address_line_1":"384 East River Road",
      "thursday_beginning_hours":"9:00 AM",
      "thursday_ending_hours":"4:45 PM",
      "tuesday_beginning_hours":"9:00 AM",
      "tuesday_ending_hours":"4:45 PM",
      "wednesday_beginning_hours":"9:00 AM",
      "wednesday_ending_hours":"4:45 PM",
      "zip_code":"13126"
   },
   {
      ":@computed_region_kjdx_g34t":"2031",
      ":@computed_region_wbg7_3whc":"1759",
      "city":"Belmont",
      "friday_beginning_hours":"9:00 AM",
      "friday_ending_hours":"5:00 PM",
      "has_kiosk":"N",
      "latitude":"42.224775",
      "location":{
         "type":"Point",
         "coordinates":[
            -78.033519,
            42.224775
         ]
      },
      "longitude":"-78.033519",
      "monday_beginning_hours":"9:00 AM",
      "monday_ending_hours":"5:00 PM",
      "office_name":"BELMONT",
      "office_type":"CO",
      "public_phone_extension":"     ",
      "public_phone_number":"5852689267",
      "saturday_beginning_hours":"        ",
      "saturday_ending_hours":"        ",
      "state":"NY",
      "street_address_line_1":"7 Court Street",
      "street_address_line_2":"Court House",
      "thursday_beginning_hours":"9:00 AM",
      "thursday_ending_hours":"5:00 PM",
      "tuesday_beginning_hours":"9:00 AM",
      "tuesday_ending_hours":"5:00 PM",
      "wednesday_beginning_hours":"9:00 AM",
      "wednesday_ending_hours":"5:00 PM",
      "zip_code":"14813"
   },
   {
      ":@computed_region_kjdx_g34t":"2093",
      ":@computed_region_wbg7_3whc":"1685",
      "city":"Rochester",
      "friday_beginning_hours":"8:30 AM",
      "friday_ending_hours":"4:30 PM",
      "has_kiosk":"N",
      "latitude":"43.204861",
      "location":{
         "type":"Point",
         "coordinates":[
            -77.69635,
            43.204861
         ]
      },
      "longitude":"-77.69635",
      "monday_beginning_hours":"8:30 AM",
      "monday_ending_hours":"4:30 PM",
      "office_name":"GREECE",
      "office_type":"CO",
      "public_phone_extension":"     ",
      "public_phone_number":"5857531604",
      "saturday_beginning_hours":"        ",
      "saturday_ending_hours":"        ",
      "state":"NY",
      "street_address_line_1":"152 Greece Ridge Center ",
      "thursday_beginning_hours":"8:30 AM",
      "thursday_ending_hours":"4:30 PM",
      "tuesday_beginning_hours":"8:30 AM",
      "tuesday_ending_hours":"6:30 PM",
      "wednesday_beginning_hours":"8:30 AM",
      "wednesday_ending_hours":"4:30 PM",
      "zip_code":"14626"
   },
   {
      ":@computed_region_kjdx_g34t":"2181",
      ":@computed_region_wbg7_3whc":"1786",
      "city":"Ithaca",
      "friday_beginning_hours":"8:30 AM",
      "friday_ending_hours":"4:30 PM",
      "has_kiosk":"N",
      "latitude":"42.447122",
      "location":{
         "type":"Point",
         "coordinates":[
            -76.504849,
            42.447122
         ]
      },
      "longitude":"-76.504849",
      "monday_beginning_hours":"8:30 AM",
      "monday_ending_hours":"4:30 PM",
      "office_name":"ITHACA                                  ",
      "office_type":"CO",
      "public_phone_extension":"(null)",
      "public_phone_number":"6072737187",
      "saturday_beginning_hours":"        ",
      "saturday_ending_hours":"        ",
      "state":"NY",
      "street_address_line_1":"301 Third Street",
      "thursday_beginning_hours":"8:30 AM",
      "thursday_ending_hours":"4:30 PM",
      "tuesday_beginning_hours":"8:30 AM",
      "tuesday_ending_hours":"4:30 PM",
      "wednesday_beginning_hours":"8:30 AM",
      "wednesday_ending_hours":"4:30 PM",
      "zip_code":"14850"
   }
];

/*
    Route the incoming request based on type (LaunchRequest, IntentRequest, etc.).
    The JSON body of the request is provided in the event parameter.
*/
exports.handler = function(event, context) {
  try {
    console.log("event.session.application.applicationId=" + event.session.application.applicationId);

    /*
      Uncomment this IF STATEMENT and populate it with your skill's application ID
      To prevent someone else from configuring a skill that sends requests to this function.
    */

    if (event.session.application.applicationId !== "amzn1.ask.skill.b59ff074-ee2b-497c-a98e-8e6958d08444") {
      context.fail("Invalid Application ID");
    }

    if (event.session.new) {
      onSessionStarted({requestId: event.request.requestId}, event.session);
    }

    if (event.request.type === "LaunchRequest") {
      onLaunch(event.request, event.session, function callback(sessionAttributes, speechletResponse) {
        context.succeed(buildResponse(sessionAttributes, speechletResponse));
      });
    } else if (event.request.type === "IntentRequest") {
      onIntent(event.request, event.session, function callback(sessionAttributes, speechletResponse) {
        context.succeed(buildResponse(sessionAttributes, speechletResponse));
      });
    } else if (event.request.type === "SessionEndedRequest") {
      onSessionEnded(event.request, event.session);
      context.succeed();
    }
  } catch (e) {
    context.fail("Exception: " + e);
  }
};

// Called when the session starts.
function onSessionStarted(sessionStartedRequest, session) {
  console.log("onSessionStarted requestId=" + sessionStartedRequest.requestId + ", sessionId=" + session.sessionId);
  // Add any session init logic here.
}

// Called when the user invokes the skill without specifying an intent.
function onLaunch(launchRequest, session, callback) {
  console.log("onLaunch requestId=" + launchRequest.requestId + ", sessionId=" + session.sessionId);
  getWelcomeResponse(callback);
}

// Called when the user specifies an intent for the skill.
function onIntent(intentRequest, session, callback) {
  console.log("onIntent requestId=" + intentRequest.requestId + ", sessionId=" + session.sessionId);

  var intent = intentRequest.intent;
  var intentName = intentRequest.intent.name;

  // Dispatch to custom intents here.
  if ("AnswerIntent" === intentName) {
    handleUserResponse(intent, session, callback);
  } else if ("AMAZON.HelpIntent" === intentName) {
    getHelp(intent, session, callback);
  } else if ("AMAZON.YesIntent" === intentName) {
    if (session.attributes.previousPlace === "User Response") {
      anythingElse(intent, session, callback);
    } else if (session.attributes.previousPlace === "Anything Else") {
      getWelcomeResponse(callback);
    }
  } else if ("AMAZON.NoIntent" === intentName) {
    endSession(intent, session, callback);
  } else if ("AMAZON.StopIntent" === intentName) {
    endSession(intent, session, callback);
  } else if ("AMAZON.CancelIntent" === intentName) {
    endSession(intent, session, callback);
  } else {
    throw "Invalid Intent";
  }
}

// Called when the user ends the session. Is not called when the skill returns shouldEndSession=true.
function onSessionEnded(sessionEndedRequest, session) {
  console.log("onSessionEnded requestId=" + sessionEndedRequest.requestId + ", sessionId=" + session.sessionId);
  // Add any cleanup logic here.
}

function getWelcomeResponse(callback) {
  var sessionAttributes = {};
  var CARD_TITLE = "New York DMV Location's and Hours";
  var speechOutput = "Hello, I can tell you where New York's Department of Motor Vehicles are located and what time they are open. Just say the office name.  ";
  var repromptText = "What office name would you like to search for?  ";
  var shouldEndSession = false;

  sessionAttributes = {
    "speechOutput": speechOutput,
    "repromptText": repromptText,
    "previousPlace": "Welcome"
  };

  callback(sessionAttributes, buildSpeechletResponse(CARD_TITLE, speechOutput, repromptText, shouldEndSession));
}

function handleUserResponse(intent, session, callback) {
  var sessionAttributes = {};
  var CARD_TITLE = "DMV Offices";
  var DMV = intent.slots.Location.value;
  var speechOutput = "";
  var repromptText = "";
  var shouldEndSession = false;

  if (!DMV_LOCATIONS[DMV]) {
    speechOutput = "I'm sorry I don't have information on that DMV Location. Try asking about another office.  ";
    repromptText = "Try asking about another DMV Office.  ";
  } else {
    var office_name = DMV_LOCATIONS[DMV].office_name;
    var street_1 = DMV_LOCATIONS[DMV].street_address_line_1;
    var street_2 = DMV_LOCATIONS[DMV].street_address_line_2;
    var mon_start = DMV_LOCATIONS[DMV].monday_beginning_hours;
    var mon_end = DMV_LOCATIONS[DMV].monday_ending_hours;
    var tue_start = DMV_LOCATIONS[DMV].tuesday_beginning_hours;
    var tue_end = DMV_LOCATIONS[DMV].tuesday_ending_hours;
    var wed_start = DMV_LOCATIONS[DMV].wednesday_beginning_hours;
    var wed_end = DMV_LOCATIONS[DMV].wednesday_ending_hours;
    var thur_start = DMV_LOCATIONS[DMV].thursday_beginning_hours;
    var thur_end = DMV_LOCATIONS[DMV].thursday_ending_hours;
    var fri_start = DMV_LOCATIONS[DMV].friday_beginning_hours;
    var fri_end = DMV_LOCATIONS[DMV].friday_ending_hours;
    speechOutput = "The " + capitalizeFirst(DMV) + " is located at " + street_1 + ". "
    + "Monday hours are: " + mon_start + " to " + mon_end + ". "
    + "Tuesday hours are: " + tue_start + " to " + tue_end + ". "
    + "Wednesday hours are: " + wed_start + " to " + wed_end + ". "
    + "Thursday hours are: " + thur_start + " to " + thur_end + ". "
    + "And Friday hours are: " + fri_start + " to " + fri_end + ". "
    + "Is there anything else I can help you with today?  ";
    repromptText = "Is there anything else I can help you with today?  ";
  }

  sessionAttributes = {
    "speechOutput": speechOutput,
    "repromptText": repromptText,
    "previousPlace": "User Response"
  };

  callback(sessionAttributes, buildSpeechletResponse(CARD_TITLE, speechOutput, repromptText, shouldEndSession));
}

function anythingElse(intent, session, callback) {
  var sessionAttributes = {};
  var CARD_TITLE = "Anything Else?";
  var speechOutput = "Is there anything else I can help you with today? To hear the information for another DMV office, simply say where is the, and the name of the DMV office you want to know about. You can also start over by saying, yes. Or else you can simply say no, stop, or cancel to end.  ";
  var repromptText = "Say where is the, and the name of the DMV office you want to know about. Or say no, stop, or cancel to end.  ";
  var shouldEndSession = false;

  sessionAttributes = {
    "speechOutput": speechOutput,
    "repromptText": repromptText,
    "previousPlace": "Anything Else"
  };

  callback(sessionAttributes, buildSpeechletResponse(CARD_TITLE, speechOutput, repromptText, shouldEndSession));
}

function getHelp(intent, session, callback) {
  if (!session.attributes) {
    session.attributes = {};
  }
  var CARD_TITLE = "DMV Location Help";
  var speechOutput = "Hello, to get started simply say, where is the, and the DMV Office name you wish to know about. This will not only tell you where the office is located by telling you the address. I will also tell you when the hours of operation are for that DMV Office.";
  var repromptText = "To get started simply say, where is the, and the DMV Office name you wish to know about. This will not only tell you where the office is located by telling you the address. I will also tell you when the hours of operation are for that DMV Office.";
  var shouldEndSession = false;

  callback(session.attributes, buildSpeechletResponseWithoutCard(speechOutput, repromptText, shouldEndSession));
}

function endSession(intent, session, callback) {
  callback(session.attributes, buildSpeechletResponseWithoutCard("Goodbye, thank you for using this skill!", "", true));
}

function capitalizeFirst(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function buildSpeechletResponse(title, output, repromptText, shouldEndSession) {
  return {
    outputSpeech: {
      type: "PlainText",
      text: output
    },
    card: {
      type: "Simple",
      title: title,
      content: output
    },
    reprompt: {
      outputSpeech: {
        type: "PlainText",
        text: repromptText
      }
    },
    shouldEndSession: shouldEndSession
  };
}

function buildSpeechletResponseWithoutCard(output, repromptText, shouldEndSession) {
  return {
    outputSpeech: {
      type: "PlainText",
      text: output
    },
    reprompt: {
      outputSpeech: {
        type: "PlainText",
        text: repromptText
      }
    },
    shouldEndSession: shouldEndSession
  };
}

function buildResponse(sessionAttributes, speechletResponse) {
  return {
    version: "1.0",
    sessionAttributes: sessionAttributes,
    response: speechletResponse
  };
}
