// ���ֲ��ſ���
const player = document.getElementById('player');
const playBtn = document.getElementById('play');
const stopBtn = document.getElementById('stop');
const volume = document.getElementById('volume');
const dogImg = document.getElementById('dog');

// Ĭ������
player.src = '/assets/sounds/music/1.mp3';

playBtn.addEventListener('click', () => {
  player.play();
  dogImg.src = '/assets/dog/shaking.gif';
  playBtn.textContent = '������...';
});

stopBtn.addEventListener('click', () => {
  player.pause();
  dogImg.src = `/assets/dog/${document.getElementById('mood').textContent}.png`;
  playBtn.textContent = '��������';
});

volume.addEventListener('input', () => {
  player.volume = volume.value;
});

// �ʴ�ϵͳ
document.getElementById('ask').addEventListener('click', askQuestion);

function askQuestion() {
  const question = document.getElementById('question').value;
  const lang = document.querySelector('.lang-btn.active').dataset.lang;
  
  if(!question) return;
  
  document.getElementById('answer').innerHTML = '����˼����...';
  
  fetch('/ask', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question, lang })
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById('answer').innerHTML = data.answer;
    
    // ���¹�������
    updateMood(question);
    
    // �����ش�
    if(window.speechSynthesis) {
      const speech = new SpeechSynthesisUtterance(data.answer);
      speech.lang = lang === 'zh' ? 'zh-CN' : 'en-US';
      window.speechSynthesis.speak(speech);
    }
  });
}

// �Զ���������
function updateMood(question) {
  const moodEl = document.getElementById('mood');
  let newMood = 'normal';
  
  if(question.includes('����') || question.includes('����')) newMood = 'happy';
  if(question.includes('�ѹ�') || question.includes('����')) newMood = 'sad';
  if(question.includes('�˷�') || question.includes('����')) newMood = 'excited';
  
  moodEl.textContent = newMood;
  dogImg.src = `/assets/dog/${newMood}.png`;
}

// �����л�
document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});