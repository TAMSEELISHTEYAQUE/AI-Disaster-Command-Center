/* =====================================================
   AI DISASTER COMMAND CENTER
   UTILS.JS
===================================================== */

function getCurrentTime(){

    return new Date();

}

function formatDateTime(){

    return new Date().toLocaleString("en-IN");

}

function randomItem(array){

    return array[Math.floor(Math.random()*array.length)];

}

function generateIncidentId(){

    return "ADC-" + Date.now();

}