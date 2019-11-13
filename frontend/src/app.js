console.log('Hello')

fetch('/api/proxyflights')
  .then(res => res.json())

  .then(res => console.log('response', res))
  .catch(err => console.log(err))