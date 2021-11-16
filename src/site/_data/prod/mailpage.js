const axios = require('axios');
const seed = require('../../../utils/save-seed.js');


// Once a googel sheet is "published to the web" we can access its JSON
// via a URL of this form. We just need to pass in the ID of the sheet
// which we can find in the URL of the document.
const sheetID = "1FxWlBJaa0AdcVkhR6sSse2SHgJgrOJlGeasaJ0B7Qs8";
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
                        "affiliate": item.gsx$affiliate.$t,
                        "domain": item.gsx$domain.$t,
                        "webmail": item.gsx$webmail.$t,
                        "mail": item.gsx$mail.$t,
                        "pop": item.gsx$pop.$t,
                        "pop3": item.gsx$pop3.$t,
                        "imap": item.gsx$imap.$t,
                        "smtp": item.gsx$smtp.$t,
                        "secondarydomains": item.gsx$secondarydomains.$t,
                        "aliasdomains": item.gsx$aliasdomains.$t,
                        "businessdomains": item.gsx$businessdomains.$t,
                        "testaccountun": item.gsx$testaccountun.$t,
                        "testaccountpw": item.gsx$testaccountpw.$t,
                        "additionalticketinginfo": item.gsx$additionalticketinginfo.$t,
                        "remoteintodeviceallowed": item.gsx$remoteintodeviceallowed.$t,
                        "newaccountprocess": item.gsx$newaccountprocess.$t,
                        "passwordchangeprocedure": item.gsx$passwordchangeprocedure.$t,


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