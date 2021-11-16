const axios = require("axios");
const seed = require("../../../utils/save-seed.js");

// Once a googel sheet is "published to the web" we can access its JSON
// via a URL of this form. We just need to pass in the ID of the sheet
// which we can find in the URL of the document.
const sheetID = "1RtQSBly4Bu1T5GnZqEWj8YnhFOpkqLhfczHA_n2YkyI";
const googleSheetUrl = `https://spreadsheets.google.com/feeds/list/${sheetID}/1/public/values?alt=json`;

module.exports = () => {
    return new Promise((resolve, reject) => {
        console.log(`Requesting data from ${googleSheetUrl}`);

        axios
            .get(googleSheetUrl)
            .then((response) => {
                // massage the data from the Google Sheets API into
                // a shape that will more convenient for us in our SSG.
                var data = {
                    content: [],
                };
                response.data.feed.entry.forEach((item) => {
                    data.content.push({
                        member: item.gsx$member.$t,
                        greeting: item.gsx$greeting.$t,
                        logo: item.gsx$logo.$t,
                        main: item.gsx$main.$t,
                        ftth: item.gsx$ftth.$t,
                        cableinternet: item.gsx$cableinternet.$t,
                        fixedwireless: item.gsx$fixedwireless.$t,
                        dsl: item.gsx$dsl.$t,
                        dialup: item.gsx$dialup.$t,
                        iptv: item.gsx$iptv.$t,
                        catv: item.gsx$catv.$t,
                        streamingtv: item.gsx$streamingtv.$t,
                        email: item.gsx$email.$t,
                        businessvip: item.gsx$businessvip.$t,
                        specialcircuits: item.gsx$specialcircuits.$t,
                        linelocates: item.gsx$linelocates.$t,
                        escalations: item.gsx$escalations.$t,
                    });
                });

                // stash the data locally for developing without
                // needing to hit the API each time.
                seed(JSON.stringify(data), `${__dirname}/../dev/spog.json`);

                // resolve the promise and return the data
                resolve(data);
            })

        // uh-oh. Handle any errrors we might encounter
        .catch((error) => {
            console.log("Error :", error);
            reject(error);
        });
    });
};