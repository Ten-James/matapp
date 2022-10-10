export const GenerateFries = () => {
  const fries = document.querySelector(".fries");
  for (let i = 0; i < 20; i++) {
    const sx = Math.random() * 100;
    const sy = Math.random() * 100;
    const liveTime = Math.random() * 5000 + 3000;
    const finishDirection = Math.random() * Math.PI * 2;
    const speed = Math.random() * 70 + 30;
    const fx = Math.cos(finishDirection) * speed;
    const fy = Math.sin(finishDirection) * speed;
    const frie = document.createElement("div");
    frie.classList.add("frie");
    fries.appendChild(frie);
    frie.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 360}deg)`;
    frie.style.transition = `all cubic-bezier(.32,.63,.43,.97) ${liveTime}ms`;
    frie.style.opacity = 0;
    frie.style.left = `${sx}vw`;
    frie.style.top = `${sy}vh`;

    setTimeout(() => {
      frie.style.left = `${fx + 50}vw`;
      frie.style.top = `${fy + 50}vh`;
      frie.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 360}deg)`;
      frie.style.opacity = 1;
    }, 100);
    setTimeout(() => {
      fries.removeChild(frie);
    }, liveTime);
  }
};
