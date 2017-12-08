/*jshint esversion: 6 */

// let logIn = (() => {
//   $.post('/users/login');
// }
// .then((token) => {
//   localStorage.setItem(token, token);
//   console.log(token);
// }));

function getToken() {
  let xhr = new XMLHttpRequest();

  xhr.open('POST', '/users/login', true);
  xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

  xhr.addEventListener('load', function() {
    var responseObject = JSON.parse(this.response);
    console.log(responseObject);
    if (responseObject.token) {
      console.log(responseObject.token);
    } else {
      console.log("No token received");
    }
  });

  let sendObject = JSON.stringify({ email: 'rafter@dm.com', password: '12345'});

  xhr.send(sendObject);
}

let logIn = () => {
  let creds = {
    "email": "dennis@dm.com",
    "password": "123456"
  };
  console.log(creds, typeof creds);
  $.post('/users/login', creds)
  .done((data) => {
    // localStorage.setItem(token, data);
    console.log(data.headers);
  });
};



let addUser = () => {
  let newUser = {
    email: 'buff@dm.com',
    password: '123456'
  };
  $.post('/users', newUser)
  .done((data) => {
    console.log('User created', data.headers());
  })
  .fail(() => {
    console.log('fail!');
  });
};

let getTodos = () => {
  $.get('/todos')
  .done((data) => {
    for (i = 0; i < data.length; i++) {
      let str = data[i].text + ' ' + data[i].completed + '< br/>';
    }
  });
};

let addMe = () => {
  var clientId = "MyApp";
  var clientSecret = "MySecret";

  var authorizationBasic = $.base64.btoa(clientId + ':' + clientSecret);

// Where does the token go?
  $.ajax({
      type: 'POST',
      url: '/users',
      data: { email: 'joker@dm.com', password: '123456', grant_type: 'password' },
      dataType: "json",
      contentType: 'application/x-www-form-urlencoded; charset=utf-8',
      xhrFields: {
         withCredentials: true
      },
      // crossDomain: true,
      headers: {
         'x-auth': authorizationBasic
      },
      //beforeSend: function (xhr) {
      //},
      success: function (result) {
         var token = result;
         console.log(token);
      },
      //complete: function (jqXHR, textStatus) {
      //},
      error: function (req, status, error) {
      console.log(error);
      }
  });
};

let addTodo = () => {
  $.ajax({
      type: 'POST',
      url: '/todos',
      data: { text: 'Get after it!' },
      dataType: "json",
      contentType: 'application/x-www-form-urlencoded; charset=utf-8',

      // crossDomain: true,
      // So this works!
      headers: {
         'x-auth': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTI5Zjk5MzY0MGM4YzU3ZDZjNTNjMjgiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTEyNzAwMzA3fQ.DyZQ6XQAN25Rzaq2Az7zTdvzO8BbUyBd4culDwaj2eQ'
      },
      //beforeSend: function (xhr) {
      //},
      success: function (result) {
         var token = result;
         console.log(token);
      },
      //complete: function (jqXHR, textStatus) {
      //},
      error: function (req, status, error) {
      console.log(error);
      }
  });
};
