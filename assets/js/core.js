// Scarcity Timer (Real-time)
function startTimer(duration, display) {
  let timer = duration, minutes, seconds;
  setInterval(() => {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    display.textContent = minutes + ":" + seconds;
    if (--timer < 0) timer = duration;
  }, 1000);
}
window.addEventListener('load', () => {
  const timerElement = document.getElementById('scarcity-timer');
  if (timerElement) startTimer(60 * 10, timerElement); // 10 phút
});

// Exit Intent Popup
document.addEventListener('mouseout', (e) => {
  if (!e.toElement && !e.relatedTarget) {
    if (!sessionStorage.getItem('exitPopupShown')) {
      alert('✨ Ưu đãi đặc biệt đang chờ bạn! Đừng bỏ lỡ.');
      sessionStorage.setItem('exitPopupShown', 'true');
    }
  }
});

// Form Submit (Minimal Fields)
document.getElementById('leadForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  // Gửi qua webhook hoặc CRM (không lộ endpoint)
  fetch('/api/lead', {
    method: 'POST',
    body: JSON.stringify(Object.fromEntries(formData)),
    headers: { 'Content-Type': 'application/json' }
  }).then(() => {
    alert('Cảm ơn bạn! Chuyên gia sẽ liên hệ ngay.');
    e.target.reset();
  });
});