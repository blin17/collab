//when the trigger is clicked we check to see if the popout is currently hidden
//based on the hidden we choose the correct animation
$('#toggle').click( function() {
    if ($('#popout').hasClass('hidden')) {
        $('#popout').removeClass('hidden');
        showPopout();
    }
    else {
        $('#popout').addClass('hidden');
        hidePopout();
    }
});

function showPopout() {
    $('#panel').animate({
        left: 75
    }, 'slow');

}

function hidePopout() {
    $('#panel').animate({
        left: 0
    }, 'slow');
}