const qrcode = require('qrcode')

exports.main = (args) => {

  const {encode, decode} = require('gpt-3-encoder')

  const str = 'This is an example sentence to try encoding out on!'
  const encoded = encode(str)
  console.log('Encoded this string looks like: ', encoded)

  console.log('We can look at each token and what it represents')
  for(let token of encoded){
    console.log({token, string: decode([token])})
  }

  const decoded = decode(encoded)
  console.log('We can decode it back into:\n', decoded)

  return qrcode.toDataURL(args.text).then(res => ({
    headers:  { 'content-type': 'text/html; charset=UTF-8' },
    body: args.img == undefined ? res : `<img src="${res}">`
  }))
}

if (process.env.TEST) exports.main({text:"hello"}).then(console.log)
