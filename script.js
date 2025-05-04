const levelData = [
    {
      symbols: ['🌸', '💧', '🫶'],
      messages: [
        "You’re beginning to bloom u beautiful tulip.",
        "Gentle steps matter.",
        "This healing is yours keep mooving.",
        "You did it with softness really proud of you my lady. 🌸",
      ]
    },
    {
      symbols: ['🦋', '🌱', '🌈', '⭐'],
      messages: [
        "You’re growing stronger.",
        "Brave and beautiful.",
        "Every step counts.",
        "You’re shining from within.",
        "you did great today Look how far you've come. 🌟",
      ]
    }
  ];
  
  let currentLevel = 0;
  let firstCard = null;
  let secondCard = null;
  let matchedPairs = 0;
  
  const board = document.getElementById('game-board');
  const message = document.querySelector('.message');
  const restartBtn = document.getElementById('restart-btn');
  const bgMusic = document.getElementById('bg-music');
  
  window.addEventListener('click', () => {
    if (bgMusic && bgMusic.paused) bgMusic.play();
  }, { once: true });
  
  function setupGame() {
    const { symbols } = levelData[currentLevel];
    let cards = [...symbols, ...symbols].sort(() => 0.5 - Math.random());
  
    board.innerHTML = '';
    matchedPairs = 0;
    message.textContent = "Click on a card to begin!";
    restartBtn.style.display = 'none';
  
    cards.forEach((symbol, index) => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.dataset.symbol = symbol;
      card.dataset.index = index;
      card.addEventListener('click', handleCardClick);
      board.appendChild(card);
    });
  }
  
  function handleCardClick(e) {
    const card = e.target;
    if (card.classList.contains('flipped') || secondCard) return;
  
    card.textContent = card.dataset.symbol;
    card.classList.add('flipped');
  
    if (!firstCard) {
      firstCard = card;
    } else {
      secondCard = card;
      checkMatch();
    }
  }
  
  function checkMatch() {
    const isMatch = firstCard.dataset.symbol === secondCard.dataset.symbol;
    const messages = levelData[currentLevel].messages;
  
    if (isMatch) {
      matchedPairs++;
      showMessage(messages[Math.min(matchedPairs - 1, messages.length - 2)]);
      resetCards();
  
      const totalPairs = levelData[currentLevel].symbols.length;
      if (matchedPairs === totalPairs) {
        setTimeout(() => {
          showMessage(messages[messages.length - 1]);
          restartBtn.style.display = 'inline-block';
          restartBtn.textContent = currentLevel < levelData.length - 1
            ? '✨ Next Level'
            : '🔁 Play Again';
        }, 600);
      }
    } else {
      setTimeout(() => {
        firstCard.textContent = '';
        secondCard.textContent = '';
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetCards();
      }, 1000);
    }
  }
  
  function resetCards() {
    firstCard = null;
    secondCard = null;
  }
  
  function showMessage(text) {
    message.textContent = text;
  }
  
  restartBtn.addEventListener('click', () => {
    if (currentLevel < levelData.length - 1) {
      currentLevel++;
    } else {
      currentLevel = 0;
    }
    setupGame();
  });
  
  setupGame();
  
