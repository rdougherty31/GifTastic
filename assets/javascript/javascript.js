var  artists= ["frank sinatra","alicia keys","chance the rapper","avicii","sia","justin timberlake"];
$(document).ready(function() {
    alert("Click the buttons to see GIFs. Then click the GIFs to play & pause!");
    function headerBG() {
        $(".header").css("background-image","linear-gradient(#fff,#00021dc7)");
    }
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
        if (artists.length > 9) {
            $("#gifContainer").css("margin-top","26rem");
        }
    }

    renderButtons();
    getGifs();

    function getGifs() {
        $(".artist").click(function() {
            var artToGet = $(this).attr("data-name");
            console.log(artToGet);
            var queryURL = "https://api.giphy.com/v1/gifs/search?q="+artToGet+"&api_key=BfMWv9whatITDicyhgJzqwmg50jHEHD6"; //get queryURL http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=YOUR_API_KEY
            $.ajax({
            url: queryURL,
            method: "GET"
            }).then(function(response) {
                console.log(response);
                for (var i=0; i<response.data.length; i++) {
                    var gifRating = response.data[i].rating;
                    if (gifRating !== "r" && gifRating !== "pg-13") {
                        var gifDiv = $("<div>");
                        var gifP = $("<p>");
                        gifP.text("Rating: "+gifRating);
                        var gifImgDiv = $("<img>");
                        var gifImage = response.data[i].images.fixed_height_still.url;
                        var gifMove = response.data[i].images.fixed_height.url;
                        gifImgDiv.addClass("gifImages");
                        gifImgDiv.attr("src",gifImage);
                        gifImgDiv.attr("data-still",gifImage);
                        gifImgDiv.attr("data-move",gifMove);
                        gifImgDiv.attr("data-state","still");
                        console.log(gifImage);
                        console.log(gifImgDiv.attr("src"));
                        console.log(gifImgDiv.attr("data-still"));
                        console.log(gifImgDiv.attr("data-move"));
                        console.log(gifImgDiv.attr("data-state"));
                    }
                    if (i < 10) {
                        gifDiv.append(gifImgDiv);
                        gifDiv.append(gifP);
                        $("#gifContainer").prepend(gifDiv);
                    }
                }
                $(".gifImages").click(gifToggle);
            });
            headerBG();
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
        $("#artistInput").val("");
    });
    function gifToggle() {
        var still = $(this).attr("data-still");
        var move = $(this).attr("data-move");
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src",move);
            $(this).attr("data-state","move");
        } else if (state === "move") {
            $(this).attr("src",still);
            $(this).attr("data-state","still");
        }
        console.log($(this).attr("src"));
        console.log($(this).attr("data-still"));
        console.log($(this).attr("data-move"));
        console.log($(this).attr("data-state"));
    }
});