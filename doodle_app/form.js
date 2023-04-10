const form = document.querySelector('form');

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const name = form.elements['name'].value;
  const email = form.elements['email'].value;
  const date = form.elements['date'].value;
  const time = form.elements['time'].value;

  // Do something with the form data, such as submit it to a server
});
