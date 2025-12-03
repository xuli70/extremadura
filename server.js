const express = require('express')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 3000

// Servir archivos estáticos
app.use(express.static('public'))
app.use(express.static('src'))

// Ruta para servir index.html (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en puerto ${PORT}`)
  console.log(`Accede a: http://localhost:${PORT}`)
})