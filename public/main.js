var update = document.getElementById('update');

update.addEventListener('click', function() {
  fetch('quotes', {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'name': 'Paco Says',
      'quote': 'This is an example that will update.'
    })
  })
  .then(function(res) {
    if (res.ok) return res.json()
  })
  .then(function(data) {
    console.log(data);
    window.location.reload(true)
  })
  app.use(bodyParser.json())
})