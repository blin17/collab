$("form").submit(function() {
  if ($("input:first").val() == "correct") {
    $("span").text("Validated...").show();
    return true;
  }
  $("span").text("Not valid!").show().fadeOut(1000);
  return false;
});