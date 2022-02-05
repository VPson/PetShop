import express from 'express'

const app = express()

app.get('/.', (req, res) => {
  return res.json({ message: 'fala filho da puta' })
})

app.listen(3000, () => 'rodando')
