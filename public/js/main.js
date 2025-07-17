// 音乐播放控制
const player = document.getElementById('player');
const playBtn = document.getElementById('play');
const stopBtn = document.getElementById('stop');
const volume = document.getElementById('volume');
const dogImg = document.getElementById('dog');

// 默认音乐
player.src = '/assets/sounds/music/1.mp3';

playBtn.addEventListener('click', () => {
  player.play();
  dogImg.src = '/assets/dog/shaking.gif';
  playBtn.textContent = '播放中...';
});

stopBtn.addEventListener('click', () => {
  player.pause();
  dogImg.src = `/assets/dog/${document.getElementById('mood').textContent}.png`;
  playBtn.textContent = '播放音乐';
});

volume.addEventListener('input', () => {
  player.volume = volume.value;
});

// 问答系统
document.getElementById('ask').addEventListener('click', askQuestion);

function askQuestion() {
  const question = document.getElementById('question').value;
  const lang = document.querySelector('.lang-btn.active').dataset.lang;
  
  if(!question) return;
  
  document.getElementById('answer').innerHTML = '狗子思考中...';
  
  fetch('/ask', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question, lang })
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById('answer').innerHTML = data.answer;
    
    // 更新狗子心情
    updateMood(question);
    
    // 语音回答
    if(window.speechSynthesis) {
      const speech = new SpeechSynthesisUtterance(data.answer);
      speech.lang = lang === 'zh' ? 'zh-CN' : 'en-US';
      window.speechSynthesis.speak(speech);
    }
  });
}

// 自动更新心情
function updateMood(question) {
  const moodEl = document.getElementById('mood');
  let newMood = 'normal';
  
  if(question.includes('开心') || question.includes('高兴')) newMood = 'happy';
  if(question.includes('难过') || question.includes('伤心')) newMood = 'sad';
  if(question.includes('兴奋') || question.includes('激动')) newMood = 'excited';
  
  moodEl.textContent = newMood;
  dogImg.src = `/assets/dog/${newMood}.png`;
}

// 语言切换
document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});