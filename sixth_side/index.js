const styleSheet = document.createElement("style");
styleSheet.textContent = ``;
document.head.appendChild(styleSheet);
const itemsvg = {
  potion_svg: `<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.05 3.00002v5C7.33127 8.93351 5.05005 11.2392 5.05005 14.2c0 3.7555 3.13401 6.8 6.99995 6.8 3.866 0 7-3.0445 7-6.8 0-2.9608-2.2812-5.26649-5-6.19998v-5m-4 0h4m-4 0H8.05005m5.99995 0h2M5.09798 15H19.0021"/>
</svg>
`,
  burger_svg: `<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m4 12 2.66667-1 2.66666 1L12 11l2.6667 1 2.6666-1L20 12m-1 5H5v1c0 1.1046.89543 2 2 2h10c1.1046 0 2-.8954 2-2v-1ZM5 9.00003h14v-1c0-2.20914-1.7909-4-4-4H9c-2.20914 0-4 1.79086-4 4v1ZM18.5 14h-13c-.82843 0-1.5.6716-1.5 1.5 0 .8285.67157 1.5 1.5 1.5h13c.8284 0 1.5-.6715 1.5-1.5 0-.8284-.6716-1.5-1.5-1.5Z"/>
</svg>
`,
  apple_svg: `<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10.0419c-1.3902 0-1.3935-1.1249-4.20643-1.037-1.73056.05408-3.15551 2.2303-2.71168 5.3081C5.35949 16.2381 6.98619 21 8.99172 21c2.00548 0 2.07358-.8508 3.00828-.8508.9347 0 .8551.8508 3.0083.8508s3.6322-4.7619 3.9098-6.687c.4438-3.0778-.9811-5.25402-2.7117-5.3081-2.8129-.0879-2.8162 1.037-4.2064 1.037Zm2.3598-4.2126c-.8779.74829-1.8612.71957-2.7221.71957 0-.62576.0792-1.94012.8609-2.76911.7817-.82898 2.1271-.7664 2.6434-.7664 0 .59448.0956 2.06766-.7822 2.81594Z"/>
</svg>

`,
  pizza_svg: `<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <g clip-path="url(#a)">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m10.4149 10.7623.0005.0109m3.0868 3.0764.0005.0108M8.91554 15.349l.00046.0108m-.8276-8.44549L4.39857 19.9133l12.95163-3.7371m-.8271-8.43475c2.0971 2.09707 3.269 4.77055 3.5172 7.51635.067.7413-.4619 1.3752-1.1869 1.5293-1.0146.2158-1.9613-.5811-2.0926-1.615-.2412-1.9-.9437-3.5721-2.52-5.1484-1.5779-1.57793-3.3173-2.3457-5.25302-2.61955-1.02139-.1445-1.79555-1.1099-1.5387-2.10314.17236-.66653.76818-1.14208 1.45754-1.08543 2.78088.22851 5.49388 1.40332 7.61648 3.52587Z"/>
  </g>
  <defs>
    <clipPath id="a">
      <path fill="#fff" d="M0 0h24v24H0z"/>
    </clipPath>
  </defs>
</svg>
`,
  coffe_svg: `<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13h2c1.1046 0 2 .8954 2 2s-.8954 2-2 2h-2.5M10 3c0 2.4-3 1.6-3 4m8-4c0 2.4-3 1.6-3 4m-7 4 .6398 6.398C5.84428 19.4428 7.56494 21 9.61995 21H10.38c2.0551 0 3.7757-1.5572 3.9802-3.602L15 11H5Z"/>
</svg>
`,
};
const existingContainer = document.querySelector(".game-container");

let chill = false;
let state = "menu";
let playerHP = 10;
let maxPlayerHP = 10;
let playerLevel = 1;
let playerXP = 0;
let nextLevelXP = 10;
let gold = 0;
let floorLevel = 1;
let animations = true;
let hex = 0;
let enemyHP = 0;
let maxEnemyHP = 0;
let enemyAttack = 0;
let currentEnemy = null;

let diceValues = [];
let diceTypes = [];
let combatLog = [];

const originalDiceHandlers = [];
const consumables = {
  red_potion: {
    name: "Red Potion",
    description: "Restore all health and permanently increase max HP by 3%",
    price: 25,
    icon: itemsvg.potion_svg,
    color: "#ff5252",
    use: () => {
      const hpBonus = Math.ceil(maxPlayerHP * 0.03);
      maxPlayerHP += hpBonus;
      playerHP = maxPlayerHP;
      addToCombatLog(
        `Red Potion: Restored full HP and gained +${hpBonus} max HP permanently!`,
        "success"
      );
      updateStats();
    },
  },
  blue_potion: {
    name: "Blue Potion",
    description: "Next dice roll will be twice as effective",
    price: 18,
    icon: itemsvg.potion_svg,
    color: "#2196f3",
    use: () => {
      addEffect("double_power", 1);
      addToCombatLog(
        "Blue Potion: Next roll will be twice as powerful!",
        "info"
      );
    },
  },
  green_potion: {
    name: "Green Potion",
    description: "Convert one random die to a different type",
    price: 15,
    icon: itemsvg.potion_svg,
    color: "#4caf50",
    use: () => {
      if (diceTypes.length > 0) {
        const randomIndex = Math.floor(Math.random() * diceTypes.length);
        const currentType = diceTypes[randomIndex];

        let newType;
        do {
          newType = getRandomDiceType();
        } while (newType === currentType);

        diceTypes[randomIndex] = newType;

        const dice = document.querySelectorAll(".dice")[randomIndex];
        if (dice) {
          dice.style.color = dice_types[newType].color;
        }

        addToCombatLog(
          `Green Potion: Converted a ${dice_types[currentType].name} die to ${dice_types[newType].name}!`,
          "success"
        );
      } else {
        addToCombatLog("Green Potion: No dice available to convert!", "danger");
      }
    },
  },
  apple: {
    name: "Apple",
    description: "Restore 50% of your current health",
    price: 8,
    icon: itemsvg.apple_svg,
    color: "#ff5252",
    use: () => {
      const healAmount = Math.ceil(maxPlayerHP * 0.5);
      playerHP = Math.min(maxPlayerHP, playerHP + healAmount);
      addToCombatLog(`Apple: Restored ${healAmount} HP!`, "success");
      updateStats();
    },
  },
  pizza: {
    name: "Pizza",
    description: "Heal 20% max HP and gain +1 defense for next battle",
    price: 12,
    icon: itemsvg.pizza_svg,
    color: "#ff9800",
    use: () => {
      const healAmount = Math.ceil(maxPlayerHP * 0.2);
      playerHP = Math.min(maxPlayerHP, playerHP + healAmount);
      addEffect("bonus_defense", 1);
      addToCombatLog(
        `Pizza: Restored ${healAmount} HP and gained +1 defense for next battle!`,
        "success"
      );
      updateStats();
    },
  },
  burger: {
    name: "Burger",
    description: "Heal 30% max HP and gain +2 attack for next roll",
    price: 15,
    icon: itemsvg.burger_svg,
    color: "#8d6e63",
    use: () => {
      const healAmount = Math.ceil(maxPlayerHP * 0.3);
      playerHP = Math.min(maxPlayerHP, playerHP + healAmount);
      addEffect("bonus_attack", 1);
      addToCombatLog(
        `Burger: Restored ${healAmount} HP and gained +2 attack for next roll!`,
        "success"
      );
      updateStats();
    },
  },
  coffee: {
    name: "Coffee",
    description: "Allows you to reroll up to 2 dice on your next turn",
    price: 10,
    icon: itemsvg.coffe_svg,
    color: "#795548",
    use: () => {
      addEffect("reroll", 1);
      addToCombatLog(
        "Coffee: You can reroll up to 2 dice on your next turn!",
        "info"
      );
    },
  },
};

const addDiceBtn = document.getElementById("add-dice");
const slider = document.querySelector(".slider");
const diceContainer = document.getElementById("dice-container");
const scoreDisplay = document.getElementById("score");
const playBtn = document.getElementById("play");
const rollBtn = document.getElementById("roll");
const playerStatsDisplay = document.getElementById("player-stats");
const enemyStatsDisplay = document.getElementById("enemy-stats");
const logContainer = document.getElementById("combat-log");

let dialogContainer = document.getElementById("dialog-container");

const dice_faces = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
const dice_types = {
  attack: {
    name: "Attack",
    color: "#ff5252",
    description: "Deals damage to enemies",
  },
  defense: {
    name: "Defense",
    color: "#2196f3",
    description: "Blocks incoming damage",
  },
  magic: {
    name: "Magic",
    color: "rgb(124, 18, 200)",
    description: "Cast spells with various effects",
  },
  heal: {
    name: "Heal",
    color: "#4caf50", 
    description: "Restores health points",
  },
};

let inventory = [];
let activeEffects = [];

function addEffect(effectType, duration) {
  activeEffects.push({ type: effectType, duration });
}
function showShop(availableItems = null) {
  const options = [];
  let tooltips = []
  if (!availableItems) {
    const shopItems = [
      "red_potion",
      ,
      "green_potion",
      "apple",
      "pizza",
      "burger",
      "max_hp",
    ];
    availableItems = shopItems.sort(() => Math.random() - 0.5).slice(0, 6);
  }
  if (availableItems === 0) {
    startCombat();
  } else {
    availableItems.forEach((itemId, index) => {
      if (itemId === "new_dice") {
        tooltips.push("Adds a new dice to your dice collection")
        options.push({

          text: "New Dice (15 Gold)",
          action: () => {
            if (gold >= 15) {
              gold -= 15;
              addDice(getRandomDiceType());
              addToCombatLog("You purchased a new dice!", "success");
              updateStats();
              const nextItems = [...availableItems];
              nextItems.splice(index, 1);
              showShop(nextItems);
            } else {
              addToCombatLog("Not enough gold!", "danger");
              showShop(availableItems);
            }
          },
        });
      } else if (itemId === "max_hp") {
        tooltips.push("Adds extra 8 hp")
        options.push({
          text: "Increase Max HP (20 Gold)",
     
          action: () => {
            if (gold >= 20) {
              gold -= 20;
              maxPlayerHP += 8;
              playerHP += 8;
              addToCombatLog("Your maximum HP increased by 8!", "success");
              updateStats();
              const nextItems = [...availableItems];
              nextItems.splice(index, 1);
              showShop(nextItems);
            } else {
              addToCombatLog("Not enough gold!", "danger");
              showShop(availableItems);
            }
          },
        });
      } else {
        const item = consumables[itemId];
        console.log(item.description)
        tooltips.push(item.description)
        options.push({
          text: `${item.name} (${item.price} Gold)`,
          action: () => {
            if (gold >= item.price) {
              if (inventory.length >= 3) {
                addToCombatLog("Full inventory!", "danger");
                showShop(availableItems);
              } else {
                gold -= item.price;
                inventory.push(itemId);
                addToCombatLog(`You purchased ${item.name}!`, "success");
                updateInventoryDisplay();
                updateStats();
                const nextItems = [...availableItems];
                nextItems.splice(index, 1);
                showShop(nextItems);
              }
            } else {
              addToCombatLog("Not enough gold!", "danger");
              showShop(availableItems);
            }
          },
        });
      }
    });

    options.push({
      text: "Leave Shop",
     
      action: () => {
        startCombat();
      },
      
    });
    tooltips.push("")
     
    showDialog(
      "Dungeon Shop",
      `You have ${gold} gold. What would you like to buy?`,
      options, "assets/beep.mp3", tooltips  );
  }
}

function processEffects() {
  activeEffects = activeEffects.filter((effect) => effect.duration > 0);

  activeEffects.forEach((effect) => effect.duration--);
}

function hasEffect(effectType) {
  return activeEffects.some(
    (effect) => effect.type === effectType && effect.duration > 0
  );
}

function useConsumable(itemId) {
  const itemIndex = inventory.findIndex((item) => item === itemId);

  if (itemIndex !== -1) {
    inventory.splice(itemIndex, 1);

    consumables[itemId].use();

    fetchAndPlaySound("assets/heal.mp3", 1.0);

    updateInventoryDisplay();

    return true;
  }

  return false;
}

function updateInventoryDisplay() {
  const inventoryEl = document.getElementById("inventory");
  const itemCounter = document.getElementById("item-counter");

  if (!inventoryEl) return;
  itemCounter.innerText = inventory.length + "/3";
  inventoryEl.innerHTML = "";

  if (inventory.length === 0) {
    inventoryEl.innerHTML = "<p>Your inventory is empty</p>";
    inventoryEl.style.cursor = "text";
    return;
  }

  const groupedInventory = {};

  inventory.forEach((itemId) => {
    if (!groupedInventory[itemId]) {
      groupedInventory[itemId] = 1;
    } else {
      groupedInventory[itemId]++;
    }
  });

  Object.keys(groupedInventory).forEach((itemId) => {
    const item = consumables[itemId];
    const count = groupedInventory[itemId];

    const itemEl = document.createElement("div");
    itemEl.className = "inventory-item";
    inventoryEl.style.cursor = "pointer";
    itemEl.innerHTML = `
      <div class="item-icon" style="color: ${item.color}">
        ${item.icon}
      </div>
      <div class="item-details">
        <h4>${item.name} x${count}</h4>
        <p>${item.description}</p>
      </div>
    `;

    itemEl.addEventListener("click", () => {
      useConsumable(itemId);
    });

    inventoryEl.appendChild(itemEl);
  });
}

function rerollSelectedDice(indices) {
  state = "rolling";

  const diceEls = document.querySelectorAll(".dice");
  diceEls.forEach((dice, index) => {
    dice.classList.remove("selectable", "selected");
    dice.onclick = originalDiceHandlers[index];
  });

  const confirmButton = document.querySelector(".confirm-reroll");
  if (confirmButton) {
    confirmButton.remove();
  }

  indices.forEach((index, i) => {
    setTimeout(() => {
      fetchAndPlaySound("assets/dice.mp3", 0.7 + i / 10 / 2);
      const diceEl = diceEls[index];
      animateDice(diceEl, index);
    }, i * 200);
  });

  setTimeout(() => {
    processTurnResults(false);
    state = "play";
    chill = false;
  }, indices.length * 200 + 200);

  processEffects();
}

function enableDiceSelection() {
  state = "selecting";
  addToCombatLog("Click on up to 2 dice to reroll them", "info");

  const diceEls = document.querySelectorAll(".dice");
  const selectedDice = [];

  diceEls.forEach((dice, index) => {
    dice.classList.add("selectable");
    originalDiceHandlers[index] = dice.onclick;

    dice.onclick = function () {
      if (selectedDice.length < 2 && !selectedDice.includes(index)) {
        selectedDice.push(index);
        dice.classList.add("selected");

        if (selectedDice.length === 2) {
          rerollSelectedDice(selectedDice);
        }
      }
    };
  });

  const confirmButton = document.createElement("button");
  confirmButton.textContent = "Reroll Selected";
  confirmButton.className = "action-button confirm-reroll";
  confirmButton.onclick = () => {
    if (selectedDice.length > 0) {
      rerollSelectedDice(selectedDice);
    } else {
      addToCombatLog("Please select at least one die to reroll", "danger");
    }
  };

  document.querySelector(".dice-container").appendChild(confirmButton);
}

function showDialog(title, message, options, soundPath = "assets/beep.mp3", tooltip="") {
  dialogContainer.innerHTML = "";
  dialogContainer.style.display = "flex";

  const dialogBox = document.createElement("div");
  dialogBox.className = "dialog-box";

  const dialogTitle = document.createElement("h2");
  dialogTitle.textContent = title;
  dialogBox.appendChild(dialogTitle);

  const dialogMessage = document.createElement("p");
  dialogMessage.textContent = message;
  dialogBox.appendChild(dialogMessage);

  const buttonContainer = document.createElement("div");
  buttonContainer.className = "dialog-buttons";

  options.forEach((option, index) => {
    const button = document.createElement("button");
    button.textContent = option.text;
    if (tooltip != ""){
      button.dataset.tooltip = tooltip[index];
    } else {
      button.dataset.tooltip = "";
    }
    

        button.onclick = () => {
      dialogContainer.style.display = "none";
      const sound = new Audio(soundPath);
      sound.play();
      option.action();
    };
    buttonContainer.appendChild(button);
  });

  dialogBox.appendChild(buttonContainer);
  dialogContainer.appendChild(dialogBox);
}

const getNewNumber = (prev = -1) => {
  let num;
  do {
    num = Math.floor(Math.random() * dice_faces.length);
  } while (num === prev);
  return num;
};

const getRandomDiceType = () => {
  const types = Object.keys(dice_types);
  return types[Math.floor(Math.random() * types.length)];
};

const updateStats = () => {
  if (!playerStatsDisplay) return;
  playerStatsDisplay.innerHTML = `
    <div class="stat-row">
      <span class="stat-label">HP:</span> 
      <div class="progress-bar">
        <div class="progress-fill" style="width: ${
          (playerHP / maxPlayerHP) * 100
        }%; background-color: #4caf50;"></div>
        <span class="progress-text">${playerHP}/${maxPlayerHP}</span>
      </div>
    </div>
    
    <div class="stat-row">
      <span class="stat-label">XP:</span> 
      <div class="progress-bar">
        <div class="progress-fill" style="width: ${
          (playerXP / nextLevelXP) * 100
        }%; background-color: #2196f3;"></div>
        <span class="progress-text">${playerXP}/${nextLevelXP}</span>
      </div>
    </div>
    <div class="stat-row">
      <span class="stat-label">Level:</span> ${playerLevel}
    </div>
    <div class="stat-row">
      <span class="stat-label">Gold:</span> ${gold}
    </div>
    <div class="stat-row">
      <span class="stat-label">Floor:</span> ${floorLevel}
    </div>
  `;

  if (currentEnemy && enemyStatsDisplay) {
    enemyStatsDisplay.innerHTML = `
      <h3>${currentEnemy.name}</h3>
      <div class="stat-row">
        <span class="stat-label">HP:</span> 
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${
            (enemyHP / maxEnemyHP) * 100
          }%; background-color: #ff5252;"></div>
          <span class="progress-text">${enemyHP}/${maxEnemyHP}</span>
        </div>
      </div>
      <div class="stat-row">
        <span class="stat-label">Attack:</span> ${enemyAttack}
      </div>
    `;
    enemyStatsDisplay.style.display = "block";
  } else if (enemyStatsDisplay) {
  }
};

const updateCombatLog = () => {
  if (!logContainer) return;

  logContainer.innerHTML = "";

  const recentLogs = combatLog.slice(-5);

  recentLogs.forEach((log) => {
    const logEntry = document.createElement("div");
    logEntry.className = `log-entry ${log.type}`;
    logEntry.textContent = log.message;
    logContainer.appendChild(logEntry);
  });

  logContainer.scrollTop = logContainer.scrollHeight;
};

const addToCombatLog = (message, type = "info") => {
  combatLog.push({ message, type });
  if (combatLog.length > 50) combatLog.shift();
  updateCombatLog();
};

const createEnemy = () => {
  const enemies = [
    { name: "Goblin", hp: 6, attack: 2, xp: 3, gold: 2 },
    { name: "Skeleton", hp: 8, attack: 4, xp: 5, gold: 3 },
    { name: "Orc", hp: 11, attack: 5, xp: 9, gold: 5 },
    { name: "Troll", hp: 16, attack: 6, xp: 12, gold: 8 },
    { name: "Dragon", hp: 25, attack: 9, xp: 20, gold: 15 },
  ];

  // Si estamos en el primer piso, el enemigo debe ser un Goblin
  if (floorLevel === 1) {
    selectedEnemy = enemies[0];  // El Goblin
  }
  // Si estamos en el piso 10, debe ser un Dragon
  else if (floorLevel === 10) {
    selectedEnemy = enemies[4];  // El Dragon
  }
  // Si estamos en pisos 11 o superiores, se eliminan enemigos débiles
  else if (floorLevel > 10) {
    // Eliminar enemigos más débiles conforme el nivel aumenta
    const availableEnemies = enemies.filter((e, i) => i >= Math.max(4 - Math.floor((floorLevel - 1) / 10), 0));

    // Seleccionamos aleatoriamente un enemigo de la lista filtrada
    selectedEnemy = availableEnemies[Math.floor(Math.random() * availableEnemies.length)];
  }

  // Ajustamos las estadísticas del enemigo según el nivel del piso
  const levelMultiplier = 1 + (floorLevel - 1) * 0.12; // Aumento del 12% por piso

  currentEnemy = { ...selectedEnemy };
  maxEnemyHP = Math.floor(selectedEnemy.hp * levelMultiplier);
  enemyHP = maxEnemyHP;
  enemyAttack = Math.floor(selectedEnemy.attack * levelMultiplier);

  addToCombatLog(`A ${currentEnemy.name} appears!`, "danger");

  updateStats();
};



const startCombat = () => {
  state = "combat";
  createEnemy();

  showDialog(
    "Combat Started",
    `You encountered a ${currentEnemy.name}! Prepare to fight!`,
    [
      {
        text: "Fight!",
        action: () => {
          state = "play";
        },
      },
    ]
  );
};


const fetchAndPlaySound = async (path, pitch = 1.0) => {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  try {
    if (audioCtx.state === "suspended") {
      await audioCtx.resume();
    }

    const response = await fetch(path);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);

    const source = audioCtx.createBufferSource();
    source.buffer = audioBuffer;
    source.playbackRate.value = pitch;
    source.connect(audioCtx.destination);
    source.start(0);
  } catch (error) {
    console.error("Sound playback failed:", error);
  }
};

const enemyTurn = () => {
  if (!currentEnemy || enemyHP <= 0) return;

  const damage = Math.max(1, enemyAttack - getDefenseTotal());
  playerHP = Math.max(0, playerHP - damage);

  fetchAndPlaySound("assets/hit.mp3", Math.random() * (0.9 - 0.7) + 0.7);

  addToCombatLog(
    `${currentEnemy.name} attacks for ${damage} damage!`,
    "danger"
  );

  updateStats();

  if (playerHP <= 0) {
    gameOver();
  }

  chill = false;
};

let getDefenseTotal = () => {
  let total = 0;
  diceValues.forEach((val, i) => {
    if (diceTypes[i] === "defense") {
      total += val + 1;
    }
  });

  return total;
};

const gameOver = () => {
  state = "gameOver";
  inventory = [];
  showDialog(
    "Game Over",
    `You have been defeated on floor ${floorLevel}. Final score: ${floorLevel}.`,
    [
      {
        text: "Try Again",
        action: () => {
          resetGame();
          state = "menu";
          slider.style.transform = "translateY(0)";
        },
      },
    ]
  );
};

let processTurnResults = (skipEnemyTurn = false) => {
  const totals = calculateDiceTotals();

  processPlayerAttack(totals.attackTotal);
  processPlayerHealing(totals.healTotal);
  processPlayerMagic(totals.magicEffects);

  updateStats();

  if (currentEnemy && !skipEnemyTurn) {
    scheduleEnemyTurn();
  }
};

function calculateDiceTotals() {
  const totals = {
    attackTotal: 0,
    healTotal: 0,
    magicEffects: 0,
  };

  diceValues.forEach((val, i) => {
    const diceValue = val + 1;
    const diceType = diceTypes[i];

    switch (diceType) {
      case "attack":
        totals.attackTotal += diceValue;
        break;
      case "heal":
        totals.healTotal += diceValue;
        break;
      case "magic":
        totals.magicEffects += diceValue;
        break;
    }
  });

  return totals;
}

function processPlayerAttack(attackTotal) {
  if (!currentEnemy || attackTotal <= 0) return;

  enemyHP = Math.max(0, enemyHP - attackTotal);
  addToCombatLog(`You attack for ${attackTotal} damage!`, "success");
  fetchAndPlaySound("assets/hit.mp3", Math.random() * (1 - 1.1) + 0.7);

  if (enemyHP <= 0) {
    handleEnemyDefeat();
  }
}

function handleEnemyDefeat() {
  addToCombatLog(`You defeated the ${currentEnemy.name}!`, "success");

  playerXP += currentEnemy.xp;
  addToCombatLog(`Gained ${currentEnemy.xp} XP`, "info");

  checkForLevelUp();

  gold += currentEnemy.gold;
  addToCombatLog(`Gained ${currentEnemy.gold} gold`, "info");

  currentEnemy = null;
}
function continueA() {
  if (Math.random() < 0.7) {
    nextFloor();
  } else {
    randomEvent();
  }
}

function checkForLevelUp() {
  if (playerXP >= nextLevelXP) {
    playerXP -= nextLevelXP;
    updateStats();

    playerLevel++;
    maxPlayerHP += 2;
    playerHP = maxPlayerHP;
    nextLevelXP = Math.floor(nextLevelXP * 1.5);

    fetchAndPlaySound("assets/level-up.mp3");
    addToCombatLog(`You reached level ${playerLevel}!`, "success");

    showLevelUpDialog();
  } else {
    continueA();
  }
}

function showLevelUpDialog() {
  showDialog("Level Up!", "Choose your reward:", [
    {
      text: "New Dice",
      action: () => {
        addDice(getRandomDiceType());

        continueA();
      },
    },
    {
      text: "Upgrade Max Health",
      action: () => {
      
        maxPlayerHP = Math.floor(maxPlayerHP * 1.11); 
        playerHP = maxPlayerHP; 
      
        updateStats(); 
      
        continueA();
      },
      
    },
  ]);
}

function processPlayerHealing(healTotal) {
  if (healTotal <= 0) return;

  const oldHP = playerHP;
  playerHP = Math.min(maxPlayerHP, playerHP + healTotal);
  const actualHeal = playerHP - oldHP;

  if (actualHeal > 0) {
    addToCombatLog(`You heal for ${actualHeal} HP`, "success");
  }
}

function processPlayerMagic(magicEffects) {
  if (magicEffects <= 0) return;

  if (magicEffects >= 4) {
    handleStrongMagic(magicEffects);
  } else {
    addToCombatLog(`Your spell fizzles with minor effects`, "info");
  }
}

function handleStrongMagic(magicEffects) {
  if (!currentEnemy) return;

  const magicDamage = Math.floor(magicEffects * 1.5);
  enemyHP = Math.max(0, enemyHP - magicDamage);
  addToCombatLog(`Your spell deals ${magicDamage} damage!`, "success");

  if (enemyHP <= 0) {
    handleEnemyDefeat();
  }
}

function scheduleEnemyTurn() {
  setTimeout(() => {
    enemyTurn();
    chill = false;
  }, 500);
}

const nextFloor = () => {
  const bg = document.getElementById("bg");
  hex = hex + 10;
  dialogContainer.style.filter = `hue-rotate(${hex}deg)`;
  bg.style.filter = `hue-rotate(${hex}deg)`;
  floorLevel++;
  addToCombatLog(`Advancing to floor ${floorLevel}`, "info");

  showDialog("New Floor", `You've reached floor ${floorLevel}.`, [
    {
      text: "Continue",
      action: () => {
        if (floorLevel % 3 === 0) {
          showShop();
        } else {
          startCombat();
        }
      },
    },
  ]);
};

const randomEvent = () => {
  chill = false;
  const events = [
    {
      title: "Treasure Chest",
      message: "You found a treasure chest!",
      options: [
        {
          text: "Open It",
          action: () => {
            if (Math.random() < 0.2) {
              const damage = Math.floor(Math.floor(Math.random() * playerHP/2) + playerHP/10);
              playerHP = Math.max(0, playerHP - damage);
              addToCombatLog(
                `The chest was trapped! You take ${damage} damage.`,
                "danger"
              );

              if (playerHP <= 0) {
                gameOver();
                return;
              }

              updateStats();
              startCombat();
            } else {
              const goldFound =
               Math.ceil( Math.floor(Math.random() * 20) + floorLevel/2) ;
              gold += goldFound;
              addToCombatLog(`You found ${goldFound} gold!`, "success");
              updateStats();
              startCombat();
            }
          },
        },
        {
          text: "Leave It",
          action: () => {
            startCombat();
          },
        },
      ],
    },
    {
      title: "Healing Fountain",
      message: "You discovered a healing fountain. Drink from it?",
      options: [
        {
          text: "Drink",
          action: () => {
            const healing = Math.floor(maxPlayerHP * 0.3);
            playerHP = Math.min(maxPlayerHP, playerHP + healing);
            addToCombatLog(`You restored ${healing} HP!`, "success");
            updateStats();
            startCombat();
          },
        },
        {
          text: "Ignore",
          action: () => {
            startCombat();
          },
        },
      ],
    },
    {
      title: "Mysterious Stranger",
      message:
        "A cloaked figure offers to change the enchantment of one of your dice for 10 gold.",
      options: [
        {
          text: "Accept (10 Gold)",
          action: () => {
            if (gold >= 10) {
              gold -= 10;

              const attackDiceCount = diceTypes.filter(
                (type) => type === "attack"
              ).length;

              let availableIndices = [];

              if (attackDiceCount <= 1) {
                diceTypes.forEach((type, index) => {
                  if (type !== "attack") {
                    availableIndices.push(index);
                  }
                });
              } else {
                availableIndices = diceTypes.map((_, index) => index);
              }

              if (availableIndices.length === 0) {
                addToCombatLog("No dice available to enhance!", "danger");
                gold += 10;
                startCombat();
                return;
              }

              const randomIndex =
                availableIndices[
                  Math.floor(Math.random() * availableIndices.length)
                ];
              const currentType = diceTypes[randomIndex];

              const availableTypes = Object.keys(dice_types).filter(
                (type) => type !== currentType
              );

              if (availableTypes.length === 0) {
                addToCombatLog("No suitable enhancement found!", "danger");
                gold += 10;
                startCombat();
                return;
              }

              const newType =
                availableTypes[
                  Math.floor(Math.random() * availableTypes.length)
                ];
              diceTypes[randomIndex] = newType;

              const dice = document.querySelectorAll(".dice")[randomIndex];
              if (dice) {
                dice.style.color = dice_types[newType].color;
              }

              addToCombatLog(
                `Your ${dice_types[currentType].name} dice was enhanced to ${dice_types[newType].name}!`,
                "success"
              );
              updateStats();
              startCombat();
            } else {
              addToCombatLog("You don't have enough gold!", "danger");
              startCombat();
            }
          },
        },
        {
          text: "Decline",
          action: () => {
            startCombat();
          },
        },
      ],
    },
  ];

  const randomEvent = events[Math.floor(Math.random() * events.length)];
  showDialog(randomEvent.title, randomEvent.message, randomEvent.options);
};
let activeSpec = null;
let activeDie = null;

const bodyClick = (event) => {
  // Asegúrate de que el evento esté definido correctamente
  if (!event) return;

  // Si se hizo click fuera de un dado, cerrar el spec
  if (activeSpec && !activeDie.contains(event.target)) {
    activeDie.style.transform = "translateY(0)";
    activeSpec.remove();
    activeSpec = null;
    activeDie = null;
  }
};

// Agregar el event listener para el click en cualquier parte
document.addEventListener("click", bodyClick);

// Función para añadir un nuevo dado
const addDice = (type = null) => {
  const dice = document.createElement("div");
  dice.className = "dice";

  const diceType = type || getRandomDiceType();
  diceTypes.push(diceType);

  dice.style.color = dice_types[diceType].color;

  const value = getNewNumber();
  dice.innerText = dice_faces[value];
  diceValues.push(value);

  diceContainer.appendChild(dice);

  dice.onclick = () => {
    const index = Array.from(diceContainer.children).indexOf(dice);

    // Si ya hay un spec abierto en otro dado, lo cerramos
    if (activeSpec && activeDie !== dice) {
      activeDie.style.transform = "translateY(0)";
      activeSpec.remove();
      activeSpec = null;
      activeDie = null;
    }

    // Toggle: si clickeas el mismo dado, se cierra
    if (activeSpec && activeDie === dice) {
      dice.style.transform = "translateY(0)";
      activeSpec.remove();
      activeSpec = null;
      activeDie = null;
      return;
    }

    // Crear nuevo spec
    const specText = document.createElement("div");
    specText.className = "dice-specs";
    specText.style.position = "absolute";
    specText.style.bottom = "-30px";
    specText.style.left = "50%";
    specText.style.transform = "translateX(-50%)";
    dice.style.position = "relative";

    specText.innerText = `Type: ${dice_types[diceTypes[index]].name}\n${
      dice_types[diceTypes[index]].description
    }\nValue: ${diceValues[index] + 1}`;

    dice.style.transform = "translateY(-10px)";
    dice.appendChild(specText);

    // Guardar como el activo
    activeSpec = specText;
    activeDie = dice;
  };

  dice.onmouseleave = () => {
    if (activeSpec && activeDie === dice) {
      dice.style.transform = "translateY(0)";
      activeSpec.remove();
      activeSpec = null;
      activeDie = null;
    }
  };

  updateStats();
};

const animateDice = (diceEl, index) => {
  diceEl.style.transform = "scale(1.3)";
  const newVal = getNewNumber(diceValues[index]);

  setTimeout(() => {
    diceEl.innerText = dice_faces[newVal];
    diceEl.style.transform = "scale(1)";
    diceValues[index] = newVal;

    if (index === diceValues.length - 1) {
      processTurnResults();
      state = "play";
    }
  }, 150);
};

rollBtn.onclick = function () {
  if (state !== "play" || chill === true) return;

  if (hasEffect("reroll")) {
    showDialog(
      "Coffee Effect",
      "You can reroll up to 2 dice. Select which dice to roll, or roll all.",
      [
        {
          text: "Roll specific dice",
          action: () => {
            state = "play";
            enableDiceSelection();
          },
        },
        {
          text: "Roll all dice",
          action: () => {
            chill = true;
            state = "rolling";
            const diceEls = document.querySelectorAll(".dice");

            diceEls.forEach((diceEl, i) => {
              if (animations) {
                setTimeout(() => {
                  fetchAndPlaySound("assets/dice.mp3", 0.7 + i / 10 / 2);
                  animateDice(diceEl, i);
                }, i * 200);
              } else {
                const newVal = getNewNumber(diceValues[i]);
                diceEl.innerText = dice_faces[newVal];
                diceValues[i] = newVal;
              }
            });

            if (!animations) {
              state = "play";
              chill = false;
            }

            processEffects();
          },
        },
      ]
    );
  } else {
    state = "rolling";
    const diceEls = document.querySelectorAll(".dice");

    diceEls.forEach((diceEl, i) => {
      if (animations) {
        setTimeout(() => {
          fetchAndPlaySound("assets/dice.mp3", 0.7 + i / 10 / 2);
          animateDice(diceEl, i);
        }, i * 200);
      } else {
        const newVal = getNewNumber(diceValues[i]);
        diceEl.innerText = dice_faces[newVal];
        diceValues[i] = newVal;
      }
    });

    if (!animations) {
      processTurnResults();
      state = "play";
      chill = false;
    }
  }
};

let originalProcessTurnResults = processTurnResults;
processTurnResults = function () {
  const doubleEffect = hasEffect("double_power");

  if (doubleEffect) {
    diceValues = diceValues.map((val) => Math.min(5, val * 2));

    const diceEls = document.querySelectorAll(".dice");
    diceEls.forEach((dice, i) => {
      dice.innerText = dice_faces[diceValues[i]];
    });

    addToCombatLog("Double power activated! Dice effects doubled!", "success");
  }

  if (hasEffect("bonus_attack")) {
    diceValues = diceValues.map((val, i) => {
      if (diceTypes[i] === "attack") {
        return Math.min(5, val + 2);
      }
      return val;
    });

    const diceEls = document.querySelectorAll(".dice");
    diceEls.forEach((dice, i) => {
      dice.innerText = dice_faces[diceValues[i]];
    });

    addToCombatLog("Attack bonus activated! +2 to all attack dice!", "success");
  }

  originalProcessTurnResults();

  processEffects();
};

const resetGame = () => {
  playerHP = 10;
  maxPlayerHP = 10;
  playerLevel = 1;
  playerXP = 0;
  nextLevelXP = 10;
  gold = 5;
  floorLevel = 1;
  enemyHP = 0;
  maxEnemyHP = 0;
  enemyAttack = 0;
  currentEnemy = null;
  diceValues = [];
  diceTypes = [];
  hex = 0;
  combatLog = [];
  inventory = [];
  updateInventoryDisplay();
  dialogContainer.style.filter = `hue-rotate(0deg)`;
  bg.style.filter = `hue-rotate(0deg)`;

  diceContainer.innerHTML = "";

  updateStats();
  updateCombatLog();
};
const addItemToInventory = (item_id) => {
  inventory.push(item_id);
  updateInventoryDisplay();
};

const originalGetDefenseTotal = getDefenseTotal;
getDefenseTotal = function () {
  let total = originalGetDefenseTotal();

  if (hasEffect("bonus_defense")) {
    total += 1;
    addToCombatLog("Defense bonus activated! +1 defense!", "success");
  }

  return total;
};
playBtn.onclick = function () {
  slider.style.transform = "translateY(-100%)";
  state = "play";
  fetchAndPlaySound("assets/start.mp3");

  showDialog(
    "Welcome to the Sixth Side",
    "You are a brave adventurer exploring a dangerous dungeon. Use your dice to defeat enemies and advance through the floors.\nPro-tip: Click on a dice to see what it does :)",
    [
      {
        text: "Begin Adventure",
        action: () => {
          state = "play";

          setTimeout(() => {
            startCombat();
          
          }, 500);
        },
      },
    ]
  );
  resetGame();

  addDice("attack");
  addDice("defense");

};

const originalRollFunction = rollBtn.onclick;
rollBtn.onclick = function () {
  if (state !== "play" || chill === true) return;

  if (hasEffect("reroll")) {
    showDialog(
      "Coffee Effect",
      "You can reroll up to 2 dice. Select which dice to roll, or roll all.",
      [
        {
          text: "Roll specific dice",
          action: () => {
            enableDiceSelection();
          },
        },
        {
          text: "Roll all dice",
          action: () => {
            originalRollFunction();
          },
        },
      ]
    );
  } else {
    originalRollFunction();
  }
};

window.onload = () => {
  if (!document.getElementById("game-container")) {
    enemyStatsDisplay.style.display = "block";
    enemyStatsDisplay.innerHTML = `
      <h3>???</h3>
      <div class="stat-row">
        <span class="stat-label">HP:</span> 
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${
            (0 / 1) * 100
          }%; background-color: #ff5252;"></div>
          <span class="progress-text">??/??</span>
        </div>
      </div>
      <div class="stat-row">
        <span class="stat-label">Attack:</span> ?
      </div>
    `;

    const existingContainer = document.querySelector(".game-container");

    if (existingContainer) {
      existingContainer.id = "game-container";
    }
  }

  slider.style.display = "block";
  updateStats();
  setTimeout(() => {}, 100);
};
