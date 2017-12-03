/*jshint esversion: 6 */

let id = '5a1e1921d8bcac2e7110df64';
let getTodos = () => {
  $.get('/todos', (data) => {
    for (i = 0; i < data.length; i++) {
      let str = data[i].text + ' ' + data[i].completed + '< br/>';
      //$('#runs > tbody:last-child').append(str);
      }
  });
};

// 5a1e1921d8bcac2e7110df64
