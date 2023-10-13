import express from 'express'
import cors  from 'cors'
import bodyParser from 'body-parser'
import OpenAI from 'openai'

const port = 3000
const app = express()
app.use(cors())
app.use(bodyParser.json())

const openai = new OpenAI({
  apiKey: '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'
})

app.post('/chat', async (req, res) => {
  const messages = req.body.messages
  try {
    if (messages == null) {
      throw new Error('no prompt was provided')
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages
    })
    return res.status(200).json(response.choices[0].message.content)
  } catch (error) {
    console.log(error.message)
  }
})

app.listen(port, () => console.log('Server is running on port ' + port + '...'))