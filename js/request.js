
document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission behavior
  
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
  
    var data = {
      username: username,
      email: email,
      password: password
    };
  
    sendRequestRegister(data);
    return false;
  });

  function sendRequestRegister(data) {
    if(validateCaptcha()==true){
    var xhr = new XMLHttpRequest();
  
    xhr.open('POST', 'http://localhost:3000/register', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
  
    xhr.onreadystatechange = function () {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        if (xhr.status == 200) {
          // Request was successful, handle response here
          console.log(xhr.responseText);
        } else {
          // Request failed
          console.error('Error:', xhr.status, xhr.statusText);
        }
      }
    };
  
    xhr.send(JSON.stringify(data));
    }else{
        alert('Captcha Invalido')
    }
  }
  