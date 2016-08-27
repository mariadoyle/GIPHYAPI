var buttonIndex = 0;

function insertButton(text)
{
    var buttonType = ["A"];
    if (text)
    {
    var flagButton = "<button type='button' class='btn btn-block flagButton btn-" + buttonType[buttonIndex] +  "'>" + text + "</button>";
        $("#buttonDiv").append(flagButton);
    }
}


var flagsArray = ['USA', 'Venezuela', 'Argentina', 'Italy', 'Ireland', 'France', 'England', 'Mexico', 'Brasil', 'Portugal']
var search = $("#searchBox").val();

for (var i =0; i<flagsArray.length; i++){
    insertButton(flagsArray[i]);
}

$(".btn-primary").on('click', function(){
    var buttonText = $("#searchForm").val();
    insertButton(buttonText);
    return false;
})


$(".container-fluid").on("click", ".flagButton", function() {
	var selectedGif = $(this).text();
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + selectedGif + "&api_key=dc6zaTOxFJmzC&limit=10";

    $("#gifsDiv").empty();

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).done(function(response){

        console.log("queryURL: " + queryURL);
        console.log("response: " + response);

        var results = response.data;

        for (var i = 0; i < results.length; i++) {
        	var animate = results[i].images.fixed_height.url;
        	var still = results[i].images.fixed_height_still.url;
        	var gifBox = $("<div class ='thumbnail'>");
        	var flagImg = $("<img>").attr(
            {
                "src": still,
                "class": "flagImg"
            });
        	var rating = $("<p class = 'caption'>").text("Rating: " + results[i].rating);

            flagImg.data(
            {
                "animate": animate,
                "still": still,
                "state": true
            });

            gifBox.append(flagImg);
            gifBox.append(rating);

      		$("#gifsDiv").prepend(gifBox);
        }         
    })
});


$(".container-fluid").on("click", ".flagImg", function()
{
    var state = $(this).data('state');
    console.log(".flagImg click");
    console.log(state);

    if (state)
    {
        $(this).attr("src", $(this).data("animate"));
        $(this).data("state", false);
    }

    else
    {
        $(this).attr("src", $(this).data("still"));
        $(this).data("state", true);
    }
});