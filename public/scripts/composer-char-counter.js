const maxChar = 140,
    goodColor = 545149,
    badColor = 'red';


$(document).ready(() => {
    console.log('composer-char-counter has loaded');
    let i= 0;
    $("#tweet-text").on('input',() => {
        const charCount = $("#tweet-text").val().length;

        $("#counter").val(maxChar - charCount);
        countValid(charCount);
    });
});

const countValid = (input) => {
    if (input > maxChar) {
        $('#counter').css('color', badColor);
        return false;
    }
    $('#counter').css('color', goodColor);
    return true;
}
// Character Counter
// When a user types into the Compose Tweet textarea, 
// the Character Counter is updated to show how many
//  characters a user may still type (subtracting the number
//      of characters they've typed from the 
//      maximum allowable character count of 140)

// The Character Counter turns red (or similar) when more 
// than 140 characters have been typed into the Compose Tweet textarea, and
//  it shows how many characters over the 140 
//  limit have been typed (using a negative number)
