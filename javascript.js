let emailPrefix = "i-am-";
let inputHistory = [];

window.onload = function() 
{
    let form = document.getElementById("email_form");
    let inputEmail = document.getElementsByName("email")[0];

    form.onsubmit = function (event) 
    {
        event.preventDefault();
    
        var alertElement = document.getElementsByClassName("alert");
        var alertElementExists = alertElement.length;

        let startsWithIAm = inputEmail.value.startsWith(emailPrefix);
     inputHistory.push(inputEmail.value);

     if(inputEmail.value == "") 
         {
            if(alertElementExists)
                {alertElement[0].remove();}
                 addError('Well, well. Trying to submit an empty email address are we? Try again.')
            }
        
            else if (!startsWithIAm)
            {
             if(alertElementExists)
                {alertElement[0].remove();}
                addError("Hm, your e-mail address is not valid because it doesn't start with <i><b>i-am-</b></i>"); 
            }
        
            else
            {
                if(alertElementExists)
                {
                  document.getElementsByClassName('Input_box')[0].classList.remove('red-border');
                  alertElement[0].remove();
                }
            
             var successText = `<div class="alert alert-success"><p>Hooray! You've been subscribed to our mailing list.</p>`;

                if (inputHistory.length)
                {
                    successText += `<p>Here's a printout of all the attempts:<ol>`;
                    inputHistory.forEach(function(entry) 
                    {
                        if(entry == "")
                        { entry = "(empty email address)";}
                        successText += '<li>'+ entry + '</li>';
                    });
                    
                    successText += `</ol></p>`;
                }
         
                successText += `</div>`;
                 let fragment = createHtmlElement(successText);
                 document.getElementsByClassName('Input_box')[0].after(fragment);
            }
    }
}

function addError(message)
{
    let fragment = createHtmlElement(`<div class="alert alert-danger validation-error"><p>${message}</p></div>`);
    
    document.getElementsByClassName('Input_box')[0].after(fragment);
    document.getElementsByClassName('Input_box')[0].classList.add('red-border');
}

function createHtmlElement(htmlStr) {
    var frag = document.createDocumentFragment(),
        temp = document.createElement('div');
    temp.innerHTML = htmlStr;
    while (temp.firstChild) {
        frag.appendChild(temp.firstChild);
    }
    return frag;
}