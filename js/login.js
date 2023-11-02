document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
  
    var username = document.getElementById('usernameLogin').value;
    var password = document.getElementById('passwordLogin').value;
  
    var data = {
      username: username,
      password: password
    };
  
    sendRequest(data);
  });
  
  function sendRequest(data) {
    if(validateCaptcha()==true){
        var xhr = new XMLHttpRequest();
  
    xhr.open('POST', 'http://localhost:3000/login', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
  
    xhr.onreadystatechange = function () {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        if (xhr.status == 200) {
          // Login was successful, handle response here
          console.log(xhr.responseText);
          alert('Logeo Exitoso')
          window.location.href = "main.html";
        } else {
          // Login failed
          console.error('Error:', xhr.status, xhr.statusText);
          alert('Usuario o Contraseña incorrectos')
        }
      }
    };
  
    xhr.send(JSON.stringify(data));
    }else{
        alert('Captcha Invalido')
    }
  }
  