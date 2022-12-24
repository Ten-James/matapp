// TODO: rewrite this so its more readable
export const GenerateFries = () => {
  const fries = document.querySelector('.fries');
  if (!fries) return;
  for (let i = 0; i < 20; i++) {
    const liveTime = Math.random() * 5000 + 3000;

    const start = [Math.random() * 100, Math.random() * 100] as const;
    const finishDirection = Math.random() * Math.PI * 2;
    const speed = Math.random() * 70 + 30;
    const finish = [Math.cos(finishDirection) * speed, Math.sin(finishDirection) * speed] as const;

    const frie = document.createElement('div');
    frie.classList.add('frie');
    fries.appendChild(frie);
    frie.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 360}deg)`;
    frie.style.transition = `all cubic-bezier(.32,.63,.43,.97) ${liveTime}ms`;
    frie.style.opacity = '0';
    frie.style.left = `${start[0]}vw`;
    frie.style.top = `${start[1]}}vh`;

    setTimeout(() => {
      frie.style.left = `${finish[0] + 50}vw`;
      frie.style.top = `${finish[1] + 50}vh`;
      frie.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 360}deg)`;
      frie.style.opacity = '1';
    }, 100);
    setTimeout(() => {
      fries.removeChild(frie);
    }, liveTime);
  }
};
