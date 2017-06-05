$(document).ready(function () {
    var type = "";
    $(".selector").click(function () {
        $(".selector").removeClass("active");
        $(this).addClass("active");
        var status = $(this).attr('id');
        if (status === "alldiv") {
            $("#online, #offline").removeClass("hidden");
        } else if (status === "on") {
            $("#online").removeClass("hidden");
            $("#offline,#results").addClass("hidden");
        } else {
            $("#offline").removeClass("hidden");
            $("#online,#results").addClass("hidden");
        }
    });

    var usernames = ["ESL_SC2","OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
    

    $("#search").on('input', function () {
        $("#results").empty();
        var searchVal = $(this).val();
        type = "search";
        $("#online, #offline,#all").addClass("hidden");
        if (searchVal.length >= 3) {
            console.log(searchVal);
            ajax(searchVal);
        }
        else
            if (searchVal.length == 0)
            {
                $("#online, #offline").removeClass("hidden");

            }
    });
    $.each(usernames, function (index, username) {
        type = "";
        ajax(username);
    });
    
    function ajax(username) {
        $.ajax({
            url: "https://api.twitch.tv/kraken/streams/" + username + "?client_id=tfv1nlsqksko9bbz9bti1wtati4e5q",
            dataType: "jsonp",
            data: {
                format: "json"
            },
            success: function (data) {
                process(data, username);
            },
            error: function () {
                console.log("unable to access json1" + username);
            }
        });
    }

    function process(data, username)
    {
        
       
        if (data.stream == null) {
            $.ajax({
                url: "https://api.twitch.tv/kraken/channels/" + username + "?client_id=tfv1nlsqksko9bbz9bti1wtati4e5q",
                dataType: "jsonp",
                data: {
                    format: "json"
                },
                success: function (data) {
                    
                    var logo = data.logo != null ? data.logo : "https://dummyimage.com/50x50/1.jpg&text=X";
                    var url = data.url != null ? data.url : "https://freecodecamp.com";
                    var status = data.status != null ? data.status : "Offline";

                    var $html = $("<div class='row channel'><div class='col-lg-offset-1 col-lg-2 col-md-2 col-sm-2 col-xs-2'><img class='logo img-responsive' src=" + logo + " alt=" + username + "></div><div class='col-lg-2 col-md-2 col-sm-2 col-xs-2'><a href=" + url + " target='_blank'>" + username + "</a></div><div class='status col-lg-6 col-md-8 col-sm-8 col-xs-8'><em>" + status + "</em></div></div>");
                    if (type == "search") {
                        $("#results").append($html);
                    }
                    else {
                        $("#offline").append($html);
                    }
                },
                error: function () {
                    $("#all").append("<div><em>No channel exists with username " + username + "</em></div>");
                }
            });
            
            
        }
        else {
            console.log(data);                      
          
            var logo = data.stream.channel.logo != null ? data.stream.channel.logo : "https://dummyimage.com/50x50/1.jpg&text=X";
            var url = data.stream.channel.url != null ? data.stream.channel.url : "https://freecodecamp.com";
            var status = data.stream.channel.status != null ? data.stream.channel.status : "Online";
            var $html = $("<div class='row channel'><div class='col-lg-offset-1 col-lg-2 col-md-2 col-sm-2 col-xs-2'><img class='logo img-responsive' src=" + logo + " alt=" + username + "></div><div class='col-lg-2 col-md-2 col-sm-2 col-xs-2'><a href=" + url + " target='_blank'>" + username + "</a></div><div class='status col-lg-6 col-md-8 col-sm-8 col-xs-8'><em>" + status + "</em></div></div>");
            if (type == "search") {
                $("#results").append($html);
            }
            else {
                $("#online").append($html);
            }
        }      

    }

    
});