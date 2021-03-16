// AdserverX
(function () {
    function getCreativeTemplate(creative) {
        return "<html>" +
            "<body style='height: 250px; width: 300px; margin: 0px;'>" +
                "<img src='//gocm.c.appier.net/gcm' style='display: none;'>" +
                "<script type='application/javascript'>" +
                    "document.write('<div id=\"idMTZmYTVlMzktM\">');\n" +
                    "document.write(" + creative + ");\n" +
                    "document.write(\"</div>\");\n" +
                "</script>" +
            "</body>" +
        "</html>"
    }function getCookiesMap(cookiesString) {
        return cookiesString
            .split(";")
            .map(function (cookieString) {
                return cookieString.trim().split("=");
            })
            .reduce(function (acc, curr) {
                acc[curr[0]] = curr[1];
                return acc;
            }, {});
    }
    function sendBeacon(event, id) {
        try {
            var cookieMap = getCookiesMap(document.cookie || "");
            var beaconApi = "https://pmp-beacon.apx.appier.net/v1/fpc?type=&event=" + event;
            var beaconData = {
                "bidobjid": id,
                "cookies": ["_ga", "_gid", "_gcl_au", "_atrk_uid", "_atrk_siteuid", "_pubcid"].reduce(function (acc, curr) {
                    acc[curr] = cookieMap[curr];
                    return acc;
                }, {}),
                "domain": document.domain,
            };
            var xhr = new XMLHttpRequest();
            xhr.open("POST", beaconApi, true);
            xhr.withCredentials = true;
            xhr.send(JSON.stringify(beaconData));
        } catch (e) {}
    }

    function createBidCreative(iframe, object) {
        sendBeacon("pageview", object.bidObjId);
        iframe.document.open();
        iframe.document.write(getCreativeTemplate(object.creative));
        iframe.document.close();
    }

    var div = document.getElementById("apxzone_HUAi9M-f");
    var iframe = document.createElement("iframe");
    div.appendChild(iframe);
    iframe.width = "300";
    iframe.height = "250";
    iframe.style.border = "none";
    iframe.style.overflow = "hidden";
    iframe.style.display = "block";
    iframe.style.margin = "0 auto";
    iframe.marginWidth = 0;
    iframe.marginHeight = 0;
    iframe.frameBorder = 0;
    iframe.scrolling = "no";

    iframe = iframe.contentWindow || (iframe.contentDocument.document || iframe.contentDocument);
    var adxTag = window.adxTag;
    if (
        adxTag === undefined ||
        adxTag.data === undefined ||
        adxTag.data.zones === undefined ||
        adxTag.data.zones["HUAi9M-f"] === undefined
    ) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                var creativeObj = JSON.parse(xhr.responseText);
                createBidCreative(iframe, creativeObj);
            }
        }
        xhr.open("GET", "https://adx.c.appier.net/pb/0wHT9JDiP3SORJx/zone.bid?acid=X3sOTbmiAVeiQPN6YC1cXw&hzid=HUAi9M-f", true);
        xhr.send();
    } else {
        createBidCreative(iframe, adxTag.data.zones["HUAi9M-f"]);
    }
})();
