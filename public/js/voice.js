document.getElementById('voice').addEventListener('click', () => {
  if(!('webkitSpeechRecognition' in window)) {
    alert('您的浏览器不支持语音识别');
    return;
  }
  
  const recognition = new webkitSpeechRecognition();
  recognition.lang = document.querySelector('.lang-btn.active').dataset.lang === 'en' 
    ? 'en-US' 
    : 'zh-CN';
  
  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    document.getElementById('question').value = transcript;
  };
  
  recognition.start();
});