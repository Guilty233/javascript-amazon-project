const xhr = new XMLHttpRequest();

xhr.addEventListener('load', () => {
  console.log(xhr.response);
}); // add an event listener to the XMLHttpRequest object to listen for the 'load' event, which is fired when the response is received from the server. When the event is triggered, it will log the response to the console.
  
xhr.open('GET', "https://supersimplebackend.dev/images/apple.jpg");
xhr.send();