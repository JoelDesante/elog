chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {type: "getCount"}, function(count) {
        document.getElementById("count").innerHTML = `There are <strong>${count}</strong> violations on this page.`
    });

    chrome.tabs.sendMessage(tabs[0].id, {type: "getErrs"}, function(errs) {
        document.getElementById("errs").innerHTML = arrayToList(errs)

        for(let i=0; i<=errs.length-1; i++) {
            const elm = JSON.parse(errs[i])
            let button = document.getElementById(`${i}`)

            button.onclick = () => {

                let has_atr = button.hasAttribute('isSaved');

                if(!has_atr) {
                    console.log("Saving...");
                    saveBtnClick(elm);
                    button.innerHTML = "Remove from List";
                    button.setAttribute('isSaved', true);
                } else {
                    console.log("Unsaving");
                    unsaveBtnClick(elm);
                    button.innerHTML = "Add to List";
                    button.removeAttribute('isSaved');
                }

            }
        }
    });
});

// Copy Button Functionality
const copyValue = document.getElementById('copyValue')
const copyBtn = document.getElementById('copyTable')

copyBtn.onclick = ()=>{
    copyValue.value = generateTableData()
    copyValue.select()
    copyValue.setSelectionRange(0, 99999)
    document.execCommand("copy")
}

// Clear Data Button
const clearData = document.getElementById('clearData')

clearData.onclick = () => {
    localStorage.clear()
    console.warn("Cleared the save.")
}



function arrayToList(arr) {
	let output = ``
	for(let i = 0; i<=arr.length-1; i++) {
        const elm = JSON.parse(arr[i])
		output += `
                <li>
                    <p class="v_head"><strong>${elm.violation}</strong></p>
                    <div class="subtext">
                        <p class="sub">CODE: ${elm.code}</p>
                        <p class="sub">IMPACT: ${elm.impact}</p>
                        <p class="sub link"><a href="${elm.url}">Page Link</a></p>
                    </div>
                    <input type="text" name="notes" placeholder="Add a note...">
                    ${generateButton(elm, i)}
                </li>`
	}
	return output
}

// Button click function
function saveBtnClick(value) {
    saveElement(`${value.url}:${value.code}`, value)
    //console.log(`Saved Element at ${value.url}:${value.code}`, value)
    //console.log(localStorage.getItem('elog_list'))
}

function unsaveBtnClick(value) {
    removeElement(`${value.url}:${value.code}`)
}

// Some Datastore Stuff
function existsInStorage(key) {

    if(!localStorage.getItem('elog_list')) {
        localStorage.setItem('elog_list', JSON.stringify({}))
    }

    const store = JSON.parse(localStorage.getItem('elog_list'))
    if (store.hasOwnProperty(key)) {
        return true
    }

    return false

}

function getElement(key) {

    if(!localStorage.getItem('elog_list')) {
        localStorage.setItem('elog_list', JSON.stringify({}))
    }

    const store = JSON.parse(localStorage.getItem('elog_list'))
    if(existsInStorage(key)) {
        return store[key]
    }

    return null

}

function saveElement(key, value) {

    if(!localStorage.getItem('elog_list')) {
        localStorage.setItem('elog_list', JSON.stringify({}))
    }

    const store = JSON.parse(localStorage.getItem('elog_list'))
    store[key] = value
    localStorage.setItem('elog_list', JSON.stringify(store))
}

function removeElement(key) {
    if(!localStorage.getItem('elog_list')) {
        localStorage.setItem('elog_list', JSON.stringify({}))
    }

    const store = JSON.parse(localStorage.getItem('elog_list'))

    if (existsInStorage(key)) {
        delete store[key]
        localStorage.setItem('elog_list', JSON.stringify(store))
    }
}

function generateTableData() {

    let username = document.getElementById('username').value;

    if(!localStorage.getItem('elog_list')) {
        localStorage.setItem('elog_list', JSON.stringify({}))
    }

    const store = JSON.parse(localStorage.getItem('elog_list'))

    let data = ``

    for (var key in store) {
        if (store.hasOwnProperty(key)) {
            let elm = store[key]
            data += `<tr><td>Not Corrected</td><td>${username}</td><td>${elm.code}</td><td><a href="${elm.url}">${elm.url}</a></td></tr>`
        }
    }

    return `<table>${data}</table>`
}

function generateButton(value, id) {
    if(existsInStorage(`${value.url}:${value.code}`)) {
        return `<button id="${id}" class="trigger" isSaved="true">Remove from List</button>`;
    }

    return `<button id="${id}" class="trigger">Add To List</button>`;
}