//this create a asyncronous request for the domains
//it takes in the data given by the promise and changes it into a array
const getDomains = () =>{
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.addEventListener('readystatechange' , () =>{
      if(request.readyState === 4 && request.status === 200){
        const text = request.responseText
        const parsed = text.split('\n')
        resolve(parsed)
      }
      else if(request.readyState === 4){
        reject('error getting the domains')
      }
    });
    request.open('GET','http://data.iana.org/TLD/tlds-alpha-by-domain.txt')
    request.send()
  })
}
//this is takes in what the use put in and compares it to the array
// this returns if the top domain is within the array
function compareEmails(array){
  let found = false
  let email = document.getElementById('user_email').value
  const secondDomain = email.split("@")
  if(email.split(".").length != 2){return found;}
  const Domain = email.split(".")[1]
  const upperDomain = Domain.toUpperCase()
  let i = 0
  for(i = 0; i< array.length; i++){
    if (array[i] === upperDomain){
      found = true;
      break
    }
  }
  return found;
}
//this function activates when the button is clicked
function clickFunction(event) {
  emailjs.init("user_RiAh1B9FT6QjgGoPEER2X")
  let compared = false
  let everythingElse = true;
  event.preventDefault()
  var div = document.getElementById('confirmation_contact')
  while(div.firstChild){div.removeChild(div.firstChild)}
  div.append( "we need(")
  //this checks every other element needed for the email and tells the user about the missing element
  if(!document.getElementById('user_fname').value){
    div.append( " ,first name")
    everythingElse = false;
  }
  if(!document.getElementById('user_lname').value){
    div.append( " ,last name")
    everythingElse = false;
  }
  if(!document.getElementById('user_phone').value){
    div.append( " ,phone number")
    everythingElse = false;
  }
  if(!document.getElementById('user_message').value){
    div.append( " ,a message")
    everythingElse = false;
  }
  div.append(")")
  //this uses a then function to have it activate after the getDomain function finishes
  getDomains().then((data) =>{
    compared = compareEmails(data)
    if(compared && everythingElse){
      let form = document.getElementById('nameform')
      console.log(form)
      emailjs.sendForm("service_gnon29i", "template_mk72pnt",form, "user_RiAh1B9FT6QjgGoPEER2X" )
      div.append("we have received your message\n")
    }
    else if(!compared){
      div.append(" your email is not vaild")
    }
  }).catch(error =>{
    div.append("Cannot fetch needed data, try again later")
  })
}

document.getElementById('contact-button').onclick = (e) => clickFunction(e)