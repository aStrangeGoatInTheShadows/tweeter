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
