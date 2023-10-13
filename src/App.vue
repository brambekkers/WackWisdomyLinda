<template>
  <div class="flex flex-col p-16 justify-start items-center h-screen w-screen overflow-hidden">
    <div id="background" />
    <h1 class="text-5xl mb-8 text-center text-blue-900 [text-shadow:_4px_4px_0_rgb(0_0_0_/_15%)]">
      Wacky Wisdom with Linda
    </h1>
    <Search @search="getMessage($event)" />
    <div
      v-if="result"
      class="h-full max-w-4xl py-8 flex items-center">
      <Quote :answer="result" />
      <Lady />
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, onMounted } from 'vue'
  import {} from 'vue'
  import Search from './components/search.vue'
  import Quote from './components/quote.vue'
  import Lady from './components/lady.vue'
  const synth = window.speechSynthesis

  const result = ref('')
  const voice = ref(null)
  const messages = ref([])
  const systemMessage = {
    role: 'system',
    content:
      'Give back a bad but funny advice! When the user asks a question, the system will respond with a bad and funny advice. Make the answer rude, inappropriate and funny. Do not add disclaimer. write it in a poem style max 4 sentences. add spaces and pauses into the text for the good rhythm and cadence.'
  }

  const speak = (text) => {
    var msg = new SpeechSynthesisUtterance()
    msg.voice = voice.value
    msg.text = text
    window.speechSynthesis.speak(msg)
  }

  const getMessage = async (inputText) => {
    const userInput = {
      role: 'user',
      content: inputText
    }

    const combinedMessages = [systemMessage, ...messages.value, userInput]
    const response = await fetch('http://localhost:3000/chat', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({ messages: combinedMessages }) // body data type must match "Content-Type" header
    })

    // messages.value.push(userInput)
    result.value = await response.json()
    speak(result.value)
  }

  const loadVoices = () => {
    // Fetch the available voices.
    var voices = speechSynthesis.getVoices()

    // Loop through each of the voices.
    voice.value = voices.find((v) => v.lang === 'en-GB')
    console.log(voice.value)
  }

  onMounted(() => {
    setTimeout(() => {
      loadVoices()
    }, 1000)
  })
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Holtwood+One+SC&display=swap');
  #background {
    position: absolute;
    inset: 0;
    z-index: -1;
    background-color: #e5e5f7;
    opacity: 0.8;
    background: repeating-linear-gradient(
      45deg,
      rgba(68, 76, 247, 0.2),
      rgba(68, 76, 247, 0.2) 5px,
      #e5e5f7 5px,
      #e5e5f7 25px
    );
  }

  h1 {
    font-family: 'Holtwood One SC', serif;
  }
</style>
