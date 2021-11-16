const axios = require('axios');
const seed = require('../../../utils/save-seed.js');


// Once a googel sheet is "published to the web" we can access its JSON
// via a URL of this form. We just need to pass in the ID of the sheet
// which we can find in the URL of the document.
const sheetID = "1K6TIXfRT5WMEk2xqU_xSm2OXCPZ_5Dco9HAx0LHU7ck";
const googleSheetUrl = `https://spreadsheets.google.com/feeds/list/${sheetID}/1/public/values?alt=json`;

module.exports = () => {
    return new Promise((resolve, reject) => {

        console.log(`Requesting data from ${googleSheetUrl}`);

        axios.get(googleSheetUrl)
            .then(response => {
                // massage the data from the Google Sheets API into
                // a shape that will more convenient for us in our SSG.
                var data = {
                    "content": []
                };
                response.data.feed.entry.forEach(item => {
                    data.content.push({
                        "title": item.gsx$title.$t,
                        "content": item.gsx$content.$t,



                    })
                });

                // stash the data locally for developing without
                // needing to hit the API each time.
                seed(JSON.stringify(data), `${__dirname}/../dev/mailpage.json`);

                // resolve the promise and return the data
                resolve(data);

            })

        // uh-oh. Handle any errrors we might encounter
        .catch(error => {
            console.log('Error :', error);
            reject(error);
        });
    })
}