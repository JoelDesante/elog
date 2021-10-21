// content.js

const err_list = document.getElementsByTagName("div")
let violations = []

for(let i=0; i<=err_list.length-1;i++) {
	
	let valid_param = "violation"
	let sub_string = err_list[i].innerHTML.substr(1,valid_param.length).toLowerCase()
	
	if(valid_param == sub_string) {

        let node = {}

		node['violation'] = (err_list[i].innerHTML)
        node['code'] = err_list[i+1].childNodes[1].childNodes[1].childNodes[0].childNodes[3].innerHTML
        node['impact'] = err_list[i+1].childNodes[1].childNodes[1].childNodes[2].childNodes[3].innerHTML
        node['url'] = window.location.href
        node['desc'] = "Hello World!"

        /*console.log("URL:", window.location.href)
        console.log("CODE:", err_list[i+1].childNodes[1].childNodes[1].childNodes[0].childNodes[3].innerHTML)
        console.log("IMPACT:", err_list[i+1].childNodes[1].childNodes[1].childNodes[2].childNodes[3].innerHTML)
        console.log(JSON.stringify(node))*/
        
        violations.push(JSON.stringify(node))
	}
}

chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
        switch(message.type) {
            case "getCount":
                sendResponse(violations.length.toString())
                break;
            case "getErrs":
                console.log(violations)
            	sendResponse(violations)
            	break;
            default:
                console.error("Unrecognised message: ", message)
        }
    }
);