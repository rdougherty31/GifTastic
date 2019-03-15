var  artists= ["chance the rapper","alicia keys","rihanna","adele","khalid","justin timberlake"];
$(document).ready(function() {
    function renderButtons() {
        $("#btnsContainer").empty();

        for (var i=0; i<artists.length; i++) {
            var btnDiv = $("<button>");
            btnDiv.addClass("artist");
            btnDiv.attr("data-name",artists[i]);
            btnDiv.text(artists[i]);
            $("#btnsContainer").append(btnDiv);
            console.log(artists);
        }
    }

    renderButtons();
    getGifs();

    function getGifs() {
        $(".artist").click(function() {
            var artToGet = $(this).attr("data-name");
            console.log(artToGet);
            var queryURL = "http://api.giphy.com/v1/gifs/search?q="+artToGet+"&api_key=BfMWv9whatITDicyhgJzqwmg50jHEHD6"; //get queryURL http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=YOUR_API_KEY
            $.ajax({
            url: queryURL,
            method: "GET"
            }).then(function(response) {
                for (var i=0; i<response.data.length; i++) {
                    var gifRating = response.data[i].rating;
                    if (gifRating !== "r" && gifRating !== "pg-13") {
                        var gifDiv = $("<div>");
                        var gifP = $("<p>");
                        gifP.text("Rating: "+gifRating);
                        var gifImgDiv = $("<img>");
                        var gifImage = response.data[i].images.fixed_height.url;
                        gifImgDiv.attr("src",gifImage);
                        gifDiv.append(gifP);
                        gifDiv.append(gifImgDiv);
                        $("#gifContainer").prepend(gifDiv);
                    }
                }
            });
        });
    }
    $("#addArtist").click(function(event) {
        event.preventDefault();
        var artist = $("#artistInput").val().trim();
        if (artist !== "") {
            artists.push(artist);
            renderButtons();
            console.log(artist);
            getGifs();
        }
    });
});