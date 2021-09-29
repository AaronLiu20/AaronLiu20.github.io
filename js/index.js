async function TopDomain(){
  console.log("before")
  let response = fetch('domains.txt')
    .then(response =>response.text())
    .then(text => console.log(text))
  console.log("after")
}

function compareEmails(topDomains){
  email = document.getElementById(email)

}
function clickFunction(event) {
  event.preventDefault()
  console.log("Hi Aaron")
  TopDomain()
}

document.getElementById('contact-button').onclick = (e) => clickFunction(e)