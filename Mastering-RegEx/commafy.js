#!/usr/bin/node

/*
    Example of how to use a regular expression to insert commas into a number greater
     than 999 for readability
 */

function CheckAnswer(strInput) {
    /* RegEx:
        ^ - Beginning of the line
        \d{4,} - Match 4 or more digits
        $ - End of the line
        Note:  This ensures there is nothing else but digits and the minimum qty to proceed
    */
    let regexDigitPattern = /^\d{4,}$/

    if(regexDigitPattern.test(strInput)) {
        /* RegEx:
            ?<= - Positive Lookbehind (Can we match this pattern before our current position)
            \d  - Match exactly 1 digit
            ?=  - Positive Lookahead (Can we match this pattern after our current position)
            ()  - Group
            (?: - Do NOT assign this group to a varialbe (By default this would have been assigned to \1)
            \d{3} - Match exactly 3 digits
            ()+ - Match this group 1 or more times
            ?!  - Negative Lookahead (Can we make sure we do not have a match for this pattern after our current position)
            /g  - Global modifier - find all matches
        */
        let regexCommaReplacePattern = /(?<=\d)(?=(?:\d{3})+(?!\d))/g

        // We call the replace() method with our regex as our search pattern and our comma as our replacement string
        strInput = strInput.replace(regexCommaReplacePattern, ',');

        console.log(strInput);
    }
    else {
        // We didn't get the expected input
        console.log("Please enter at least 4 digits!");
    }
}

// This is used to import the readline module to get input from the console
const readline = require("node:readline");

let strNumber = '';


// Well instruct readline how we want to get the input and display the output
let strLine = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Prompt for the number we wish to convert
// We're pushing our input into our child function for processing
// There is most likely a better way to do this.
strLine.question("Please enter a number greater than 999.\nThe greater the number the better: ", assignAnswer => {
    CheckAnswer(assignAnswer);
    strLine.close();
});


