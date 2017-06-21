$(document).ready(function() {

    var type = "";
    var usernames = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

    $('.tablinks').on('click', function() {
        var i, tabcontent, tablinks;
        $('.tablinks').removeClass('active');
        $(this).addClass('active');
        var divName = $(this).data("id");
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        document.getElementById(divName).style.display = "block";
    });

    $.each(usernames, function(index, username) {
        type = "";
        ajax(username);
    });

   /* $("#search").on('input', function() {
        $("#results").empty();
        var searchVal = $(this).val();
        type = "search";
        $("#online, #offline,#all").addClass("hidden");
        if (searchVal.length >= 3) {
            console.log(searchVal);
            ajax(searchVal);
        } else
        if (searchVal.length == 0) {
            $("#online, #offline").removeClass("hidden");

        }
    });*/

    function ajax(username) {
        $.ajax({
            url: "https://api.twitch.tv/kraken/streams/" + username + "?client_id=tfv1nlsqksko9bbz9bti1wtati4e5q",
            dataType: "jsonp",
            data: {
                format: "json"
            },
            success: function(data) {
                process(data, username);
            },
            error: function() {
                console.log("unable to access json " + username);
            }
        });
    }

    function process(data, username) {
        if (data.stream == null) {
            $.ajax({
                url: "https://api.twitch.tv/kraken/channels/" + username + "?client_id=tfv1nlsqksko9bbz9bti1wtati4e5q",
                dataType: "jsonp",
                data: {
                    format: "json"
                },
                success: function(data) {
                    var logo = data.logo != null ? data.logo : "https://dummyimage.com/50x50/1.jpg&text=X";
                    var url = data.url != null ? data.url : "https://freecodecamp.com";
                    var status = data.status != null ? data.status : "Offline";

                    var $html = $("<div class='container'><div class='nav left'><img class='logo img-responsive' src=" + logo + " alt=" + username + "></div><div class='main'><div class='col top'><a href=" + url + " target='_blank'>" + username + "</a></div><div class='col middle'><em>" + status + "</em></div></div></div>");
                    if (type == "search") {
                        $("#results").append($html);
                    } else {
                        $html.clone().appendTo($('#offline'));
                        $html.clone().appendTo($('#all'));
                    }
                },
                error: function() {
                     console.log("error");                    
                }
            });


        } else {
            var logo = data.stream.channel.logo != null ? data.stream.channel.logo : "https://dummyimage.com/50x50/1.jpg&text=X";
            var url = data.stream.channel.url != null ? data.stream.channel.url : "https://freecodecamp.com";
            var status = data.stream.channel.status != null ? data.stream.channel.status : "Online";
            var $html = $("<div class='container'><div class='nav left'><img class='logo img-responsive' src=" + logo + " alt=" + username + "></div><div class='main'><div class='col top'><a href=" + url + " target='_blank'>" + username + "</a></div><div class='col middle'><em>" + status + "</em></div></div></div>");
            if (type == "search") {
                $("#results").append($html);
            } else {
                $html.clone().appendTo($('#online'));
                $html.clone().appendTo($('#all'));
            }
        }

    }

    $('#defaultTab').trigger('click');
});