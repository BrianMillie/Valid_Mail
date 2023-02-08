var apiKey = "b78f8d13cce7434fadedf6010145e1d2"
var emailTest = 'shippdan72@gmail.com'
// # used for id search
var searcher = $('#searchButton')
// . used for class search
var searchValue = $('.emailInput')
var searchText = []
var individualResults = $('#results')
function getEmailInfo(event) {
    event.stopPropagation()
    // for each class item if the item value (value inside the text box) is more than nothing push it to an array
    searchValue.each(function () {
        if (this.value > "") {
            searchText.push(this.value)
            var newload = (this.value)
            //pull historical checks
            var searches = JSON.parse(localStorage.getItem('searches')) || [];
            //if a new check is unique add to storage the email if not ignore
            if (searches.indexOf(newload) == -1) {
                searches.push(newload)
                localStorage.setItem('searches', JSON.stringify(searches))

                $.get(`https://emailvalidation.abstractapi.com/v1/?api_key=${apiKey}&email=${this.value}`)
                    .then(function (currentData) {
                        console.log(currentData)
                        var mailHistory = JSON.parse(localStorage.getItem('mailHistory')) || [];
                        var autocorrect = currentData.autocorrect
                        console.log(autocorrect.length)
                        if (autocorrect = "") {
                            autocorrect = "No suggested correction"
                        }
                        var fullLoad = [currentData.email, autocorrect, currentData.deliverability, currentData.quality_score]
                        mailHistory.push(fullLoad)
                        localStorage.setItem('mailHistory', JSON.stringify(mailHistory))
                        individualResults.append(`
                        <container class="outputs"> ${currentData.email}</container>
                        <container class="outputs">${autocorrect}</container>
                        <container class="outputs">${currentData.deliverability}</container>
                        <container class="outputs">${currentData.quality_score}</container>
                        <container class="outputs">Date of search </container>
                        `);
                        // timeout as only 1 request per second allowed
                        setTimeout(function () {
                        }, 5000)
                    })
            }
        }
    })

}


function init() {
    searcher.click(getEmailInfo);
}

init()