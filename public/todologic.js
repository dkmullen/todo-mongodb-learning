/*jshint esversion: 6 */

let logIn = () => {
  let xhr = new XMLHttpRequest(),
    data = { email: 'joker@dm.com', password: '123456' };

  xhr.onreadystatechange = () => {
    if (xhr.readyState==4 && xhr.status==200) {
      let response = xhr.responseText,
        token = xhr.getResponseHeader('x-auth');

      localStorage.setItem('token', token);
    }
    if(xhr.readyState==4 && xhr.status==403){
      console.log(message);
    }
  };
  xhr.open('POST', '/users/login', true);
  xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
  xhr.send(JSON.stringify(data));
};

let logOut = () => {
  $.ajax({
    type: 'DELETE',
    url: '/users/me/token',
    headers: { 'x-auth': localStorage.getItem('token') },
    success: () => { localStorage.removeItem('token'); },
    error: (req, status, error) => {
    console.log(error);
    }
  });
};

let addTodo = () => {
  $.ajax({
    type: 'POST',
    url: '/todos',
    data: { text: 'And here is number 3' },
    dataType: "json",
    contentType: 'application/x-www-form-urlencoded; charset=utf-8',
    headers: { 'x-auth': localStorage.getItem('token') },
    success: (result) => { console.log(result); },
    error: (req, status, error) => { console.log(error); }
  });
};

let getTodos = () => {
  $.ajax({
    type: 'GET',
    url: '/todos',
    headers: { 'x-auth': localStorage.getItem('token') },
    success: (result) => { console.log(result); },
    error: (req, status, error) => { console.log(error); }
  });
};
