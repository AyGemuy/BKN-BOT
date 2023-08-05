const prefix = ".";

let game = {
  roles: {
    Werewolf: {
      count: 1,
      inGame: 0,
      description:
        "Bertahan dan jangan dipilih! Jika Anda adalah satu-satunya Werewolf yang sedang bermain, Anda menjadi Lone Wolf dan Anda dapat memeriksa salah satu kartu tengah.",
      perform: function () {
        return werewolf();
      },
    },
    Villager: {
      count: 1,
      inGame: 0,
      description: "Find out who is Werewolf and vote him/her out!",
    },
    Minion: {
      count: 1,
      inGame: 0,
      description:
        "Membantu Manusia Serigala untuk menang. Manusia serigala tidak tahu siapa Anda.",
      perform: function () {
        return minion();
      },
    },
    Mason: {
      count: 0,
      inGame: 0,
      description:
        "Anda mengenal siapa pemain Mason lainnya. Jika Anda tidak melihat siapa pun, berarti kartu Mason ada di tengah.",
      perform: function () {
        return mason();
      },
    },
    Seer: {
      count: 1,
      inGame: 0,
      description:
        "Anda dapat mencentang satu kartu pemain atau dua kartu tengah.",
      perform: function (player) {
        return seer(player);
      },
    },
    Robber: {
      count: 1,
      inGame: 0,
      description:
        "Anda dapat menukar kartu Anda dengan salah satu pemain dan melihat kartu baru Anda. (Anda mungkin tidak melakukan apa-apa)",
      perform: function (player) {
        return robber(player);
      },
    },
    Troublemaker: {
      count: 0,
      inGame: 0,
      description:
        "Anda dapat menukar dua kartu pemain satu sama lain tanpa mereka sadari. (Tindakan ini termasuk menukar diri Anda dengan pemain lain)",
      perform: function (player) {
        return troublemaker(player);
      },
    },
    Drunk: {
      count: 0,
      inGame: 0,
      description:
        "Anda sangat mabuk sehingga Anda harus menukar kartu Anda dengan salah satu kartu tengah tanpa mengetahui kartunya.",
      perform: function (player) {
        return drunk(player);
      },
    },
    Insomniac: {
      count: 0,
      inGame: 0,
      description:
        "Anda bangun sebelum orang lain dan memeriksa kartu terakhir Anda.",
      perform: function () {
        return insomniac();
      },
    },
    Tanner: {
      count: 0,
      inGame: 0,
      description:
        "Anda sangat membenci pekerjaan Anda sehingga Anda ingin mati. Dapatkan suara untuk menang!",
    },
    Hunter: {
      count: 0,
      inGame: 0,
      description:
        "Saat Anda terpilih, Anda dapat menembak pemain dan membunuhnya.",
      perform: function () {
        return hunter();
      },
    },
    Doppelganger: {
      count: 0,
      inGame: 0,
      description:
        "Anda bisa melihat kartu pemain dan menjadi peran itu selama sisa permainan.",
      role: "",
      perform: function () {
        return doppelganger();
      },
    },
  },
  players: [],
  deck: [],
  emojis: {
    join: "🎮",
    start: "🟢",
    confirm: "✅",
    deny: "❌",
    Werewolf: "🐺",
    Minion: "🧟",
    Villager: "👨",
    Seer: "🧙‍♂️",
    Robber: "🦹",
    Troublemaker: "🤷",
    Drunk: "🍺",
    Hunter: "🔫",
    Mason: "👷",
    Insomniac: "🦉",
    Tanner: "💀",
    Doppelganger: "🤡",
    numbers: ["0️⃣", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"],
  },
  timers: { role: 20000, discussion: 120000, vote: 10000 },
  collectors: [],
  order: [
    "Werewolf",
    "Minion",
    "Mason",
    "Seer",
    "Robber",
    "Troublemaker",
    "Drunk",
    "Insomniac",
  ],
  on: false,
};

let noPermissionNotice =
  "Bot tidak memiliki izin untuk mengirim pesan ke saluran ini.";

export default {
  name: "Manusia Serigala Tertinggi Satu Malamf",
  description: "One Night Ultimate Werewolf Bot WhatsApp By ArifzynXD",
  werewolf: async function (message) {
    console.log(gameCondition());

    try {
      if (game.players.length)
        return message.reply("Sebuah permainan sudah dalam sesi.");

      const welcomeMsg = await message.reply(
        "Selamat datang di One Night Ultimate Werewolf. Tekan ikon pengontrol untuk bergabung atau ketik 'squish join'."
      );
      await this.sendMessage(message.chat, {
        react: { text: game.emojis.join, key: message.key },
      });
      await this.sendMessage(message.chat, {
        react: { text: game.emojis.start, key: message.key },
      });

      //collect "🎮" and "🟢" reactions from welcome message
      const filter = (reaction, user) =>
        [game.emojis.join, game.emojis.start].includes(reaction.emoji.name) &&
        !user.bot;
      //no max limit only time limit of 30 seconds
      const options = { time: 60000, dispose: true };
      const welcomeMsgCollector = welcomeMsg.createReactionCollector(
        filter,
        options
      );
      game.collectors.push(welcomeMsgCollector);

      //collect users that reacted with "🎮" and only the host can press "🟢" to start the game
      welcomeMsgCollector.on("collect", (reaction, user) => {
        if (reaction.emoji.name === game.emojis.join) {
          if (game.players.findIndex((i) => i.id === user.id) === -1) {
            game.players.push(user);
            message.reply(`${user.username} joined.`);
          }
        } else if (user.id === message.author.id) {
          welcomeMsgCollector.stop();
          message.reply(`Start button pressed.`);
          message.reply(
            `Joined players ${game.players.map((player) => player.username)}`
          );

          if (!game.players.length)
            return message.reply(
              "Tidak dapat memulai permainan tanpa ada pemain."
            );
          setRoles(message);
        }
      });

      //remove users that un-reacted "🎮"
      welcomeMsgCollector.on("remove", (reaction, user) => {
        let userIndex = game.players.findIndex((i) => i.id === user.id);
        if (userIndex !== -1) {
          game.players.splice(userIndex, 1);
          message.reply(`${user.username} removed.`);
        }
      });
    } catch (err) {
      console.log(noPermissionNotice);
    }
  },

  join: function (message) {
    if (game.on)
      return message
        .reply("Cannot join when game is in session.")
        .catch(() => console.log(noPermissionNotice));

    if (game.players.findIndex((i) => i.id === message.author.id) === -1) {
      game.players.push(message.author);
      message.reply(`${message.author.username} joined.`);
    }
  },

  leave: function (message) {
    if (game.on)
      return message
        .reply("Cannot leave when game is in session.")
        .catch(() => console.log(noPermissionNotice));

    let userIndex = game.players.findIndex((i) => i.id === message.author.id);
    if (userIndex !== -1) {
      game.players.splice(userIndex, 1);
      message.reply(`${message.author.username} removed.`);
    }
  },

  players: function (message) {
    if (!game.players.length)
      return message
        .reply("No players.")
        .catch(() => console.log(noPermissionNotice));
    message.reply(game.players);
  },

  roles: function (message) {
    let rolesString = "";
    let keys = Object.keys(game.roles);

    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      if (game.roles[key]) {
        rolesString += `${game.emojis[key]} ${game.emojis.confirm.repeat(
          game.roles[key].count
        )} (${key})\n`;
      } else {
        rolesString += `${game.emojis[key]} ${game.emojis.deny} (${key})\n`;
      }
    }

    message.reply(rolesString).catch(() => console.log(noPermissionNotice));
  },

  add: function (message, args) {
    if (game.on)
      return message
        .reply("Cannot change roles when game is in session.")
        .catch(() => console.log(noPermissionNotice));

    for (let i = 0; i < args.length; i++) {
      let roleName = args[i][0].toUpperCase() + args[i].slice(1).toLowerCase(); //converting to proper name
      if (game.roles[roleName]) {
        game.roles[roleName].count += 1;
        console.log(`Added ${roleName} (${game.roles[roleName].count})`);
      }
    }
    getBalanceNotice(message);
  },

  remove: function (message, args) {
    if (game.on)
      return message
        .reply("Cannot change roles when game is in session.")
        .catch(() => console.log(noPermissionNotice));

    for (let i = 0; i < args.length; i++) {
      let roleName = args[i][0].toUpperCase() + args[i].slice(1).toLowerCase(); //converting to proper name
      if (game.roles[roleName].count > 0) {
        game.roles[roleName].count -= 1;
        console.log(`Removed ${roleName} (${game.roles[roleName].count})`);
      }
    }
    getBalanceNotice(message);
  },

  stop: function (message) {
    if (!game.on && !game.players.length)
      return message
        .reply("No game in session.")
        .catch(() => console.log(noPermissionNotice));

    game.on = false;
    game.roles.Doppelganger.role = "";
    game.timer.cancel();
    clearTimeout(game.timer);

    //clear all inGame roles to 0
    let entries = Object.keys(game.roles);
    for (let i = 0; i < entries.length; i++) {
      let roleName = entries[i];
      game.roles[roleName].inGame = 0;
    }

    //clear all emoji collectors
    for (let i = 0; i < game.collectors.length; i++) {
      game.collectors[i].stop();
    }

    //reset all arrays
    game.players = [];
    game.deck = [];
    game.collectors = [];

    console.log(gameCondition());
    message.reply("Game Terminated.");
    console.log("Stop. Game terminated.");
  },

  again: function (message) {
    if (game.on && game.players.length)
      return message
        .reply("Game is in session.")
        .catch(() => console.log(noPermissionNotice));
    if (!game.on && !game.players.length)
      return message
        .reply("No previous players history.")
        .catch(() => console.log(noPermissionNotice));

    game.on = false;
    game.roles.Doppelganger.role = "";
    if (game.timer) {
      game.timer.cancel();
      clearTimeout(game.timer);
    }

    //clear all inGame roles to 0
    let entries = Object.keys(game.roles);
    for (let i = 0; i < entries.length; i++) {
      let roleName = entries[i];
      game.roles[roleName].inGame = 0;
    }

    //clear all emoji collectors
    for (let i = 0; i < game.collectors.length; i++) {
      game.collectors[i].stop();
    }

    //reset all arrays except joined players
    game.deck = [];
    game.collectors = [];

    console.log("Play again.");
    startGame(message);
  },

  skip: function () {
    game.timer.cancel();
  },
};

function gameCondition() {
  let gameOn = game.on;
  let players = game.players.map((player) => player.username);
  let deck = game.deck;
  let roles = getPlayersRoles();
  return { gameOn, players, deck, roles };
}

function timeout(ms) {
  let resolve, reject;
  let promise = new Promise(function (res, rej) {
    resolve = res;
    reject = rej;
  });

  promise.timeout = setTimeout(function () {
    resolve(`${ms} times up.`);
  }, ms);

  promise.cancel = function () {
    reject("Skipped");
    clearTimeout(promise.timeout);
  };

  return promise;
}

function werewolf() {
  return new Promise(async (resolve, reject) => {
    if (game.roles.Werewolf.inGame === 1) {
      const player = game.players.find((player) => player.role === "Werewolf");

      const msg = await player.send(
        "You are a Lone Wolf. You get to see a card in the middle."
      );
      for (let i = 1; i <= 3; i++) {
        this.sendMessage(message.chat, {
          react: { text: game.emojis.numbers[i], key: message.key },
        });
      }

      let madeAnAction = false;

      const filter = (reaction, user) =>
        game.emojis.numbers.includes(reaction.emoji.name) && !user.bot;
      const options = { max: 1, time: game.timers.role };
      const collector = msg.createReactionCollector(filter, options);
      game.collectors.push(collector);

      collector.on("collect", (reaction, user) => {
        madeAnAction = true;
        let choice = 0;

        if (reaction.emoji.name === game.emojis.numbers[1]) {
          choice = 1;
        } else if (reaction.emoji.name === game.emojis.numbers[2]) {
          choice = 2;
        } else if (reaction.emoji.name === game.emojis.numbers[3]) {
          choice = 3;
        }

        let card = game.deck[game.deck.length - choice];
        player.send(`Card ${choice} is ${card}.`);
        resolve(`Lone Wolf (${player.username}) chose card ${choice} ${card}.`);
      });

      collector.on("end", () => {
        if (!madeAnAction) {
          player.send(`Times up. You chose to do nothing.`);
          resolve(`Lone Wolf (${player.username}) chose to do nothing.`);
        }
      });
    } else {
      for (let i = 0; i < game.players.length; i++) {
        let player = game.players[i];
        if (player.role === "Werewolf") {
          if (game.roles.Werewolf.inGame === 2)
            player.send(
              `(${
                findOtherPlayersWithRole("Werewolf", player)[0]
              }) is your teammate.`
            );
          if (game.roles.Werewolf.inGame > 2)
            player.send(
              `(${findOtherPlayersWithRole("Werewolf", player).join(
                ", "
              )}) are your teammates.`
            );
        }
      }
      resolve(`Werewolves checked their teammates.`);
    }
  });
}

function minion() {
  return new Promise((resolve) => {
    let werewolfCount = game.roles.Werewolf.inGame;
    for (let i = 0; i < game.players.length; i++) {
      let player = game.players[i];
      if (player.role === "Minion") {
        if (!werewolfCount)
          player.send(
            `There are no Werewolf in play. Survive and don't get voted out to win.`
          );
        if (werewolfCount)
          player.send(
            `Prevent this player (${
              findPlayersWithRole("Werewolf")[0]
            }) from getting voted out to win.`
          );
        if (werewolfCount > 1)
          player.send(
            `Prevent these players (${findPlayersWithRole("Werewolf").join(
              ", "
            )}) from getting voted out to win.`
          );
      }
    }
    resolve("Minion checked their masters");
  });
}

function mason() {
  return new Promise((resolve) => {
    let masonCount = game.roles.Mason.inGame;
    for (let i = 0; i < game.players.length; i++) {
      let player = game.players[i];
      if (player.role === "Mason") {
        if (masonCount === 1) player.send(`You are by yourself.`);
        if (masonCount === 2)
          player.send(
            `(${
              findOtherPlayersWithRole("Mason", player)[0]
            }) is the other Mason.`
          );
        if (masonCount > 2)
          player.send(
            `(${findOtherPlayersWithRole("Mason", player).join(
              ", "
            )}) are the other Masons.`
          );
      }
    }
    resolve("Masons checked with each other.");
  });
}

function seer(player) {
  return new Promise(async (resolve, reject) => {
    if (!player) player = game.players.find((player) => player.role === "Seer");

    const msg = await player.send(
      `You may:\n${game.emojis.numbers[1]} look at another player's card.\n${game.emojis.numbers[2]} look at 2 cards in the middle.`
    );
    await this.sendMessage(message.chat, {
      react: { text: game.emojis.numbers[1], key: message.key },
    });
    await this.sendMessage(message.chat, {
      react: { text: game.emojis.numbers[2], key: message.key },
    });

    const filter = (reaction, user) =>
      game.emojis.numbers.includes(reaction.emoji.name) && !user.bot;
    const options = { max: 1, time: game.timers.role };
    const collector = msg.createReactionCollector(filter, options);
    game.collectors.push(collector);
    let option = 0;

    collector.on("collect", (reaction, user) => {
      if (reaction.emoji.name === game.emojis.numbers[1]) {
        option = 1;
      } else if (reaction.emoji.name === game.emojis.numbers[2]) {
        option = 2;
      }
      console.log(`Seer (${player.username}) chose option ${option}.`);
    });

    collector.on("end", async () => {
      if (!option) {
        player.send(`Times up.`);
        resolve("Seer chose to do nothing");
      } else if (option === 1) {
        const option1Msg = await player.send(
          `Select a player to see his/her role. ${getPlayersString()}`
        );
        for (let i = 0; i < game.players.length; i++) {
          option1Msg.react(game.emojis.numbers[i + 1]);
        }

        const filter = (reaction, user) =>
          game.emojis.numbers.includes(reaction.emoji.name) && !user.bot;
        const options = { max: 1, time: game.timers.role };
        const collector = option1Msg.createReactionCollector(filter, options);
        game.collectors.push(collector);

        collector.on("collect", (reaction, user) => {
          let numberIndex = game.emojis.numbers.findIndex(
            (emoji) => emoji === reaction.emoji.name
          );
          let selectedPlayer = game.players[numberIndex - 1];
          player.send(
            `(${selectedPlayer.username}) is ${game.deck[numberIndex - 1]}`
          );
          resolve(
            `Seer (${player.username}) chose (${selectedPlayer.username} ${
              game.deck[numberIndex - 1]
            }).`
          );
        });

        collector.on("end", () => {
          resolve(`Seer (${player.username}) chose to not pick a player.`);
        });
      } else {
        const option2Msg = await player.send(`Select 2 cards in the middle.`);
        for (let i = 1; i <= 3; i++) {
          option2Msg.react(game.emojis.numbers[i]);
        }

        const filter = (reaction, user) =>
          game.emojis.numbers.includes(reaction.emoji.name) && !user.bot;
        const options = { max: 2, time: game.timers.role };
        const collector = option2Msg.createReactionCollector(filter, options);
        game.collectors.push(collector);
        let amountOfClicks = 0;
        let card1 = "";

        collector.on("collect", (reaction, user) => {
          let numberIndex = game.emojis.numbers.findIndex(
            (emoji) => emoji === reaction.emoji.name
          );
          let cardIndex = game.deck.length - 1 - (numberIndex - 1);
          player.send(`Card ${reaction.emoji.name} is ${game.deck[cardIndex]}`);
          amountOfClicks += 1;
          if (card1 === "") card1 = reaction.emoji.name;

          if (amountOfClicks === 2) {
            resolve(
              `Seer (${player.username}) chose card ${card1} and ${reaction.emoji.name}.`
            );
          }
        });

        collector.on("end", () => {
          resolve(
            `Seer (${player.username}) chose to pick ${
              amountOfClicks === 0 ? "0 cards" : "1 card"
            } from the middle.`
          );
        });
      }
    });
  });
}

function robber(player) {
  return new Promise(async (resolve) => {
    if (!player)
      player = game.players.find((player) => player.role === "Robber");

    const msg = await player.send(`Select a player. ${getPlayersString()}`);
    for (let i = 0; i < game.players.length; i++) {
      this.sendMessage(message.chat, {
        react: { text: game.emojis.numbers[i + 1], key: message.key },
      });
    }

    const filter = (reaction, user) =>
      game.emojis.numbers.includes(reaction.emoji.name) && !user.bot;
    const options = { max: 1, time: game.timers.role };
    const collector = msg.createReactionCollector(filter, options);
    game.collectors.push(collector);

    collector.on("collect", (reaction, user) => {
      let numberIndex = game.emojis.numbers.findIndex(
        (emoji) => emoji === reaction.emoji.name
      );
      let selectedPlayer = game.players[numberIndex - 1];
      player.send(
        `You robbed (${selectedPlayer.username}). This player is ${
          game.deck[numberIndex - 1]
        }.`
      );
      swapPlayerCards(player, selectedPlayer);
      resolve(
        `Robber (${player.username}) robbed (${selectedPlayer.username} ${
          game.deck[numberIndex - 1]
        }).`
      );
    });

    collector.on("end", () => {
      resolve(`Robber (${player.username}) chose to not rob anyone.`);
    });
  });
}

function troublemaker(player) {
  return new Promise(async (resolve, reject) => {
    if (!player)
      player = game.players.find((player) => player.role === "Troublemaker");

    const msg = await player.send(`Select a player. ${getPlayersString()}`);
    for (let i = 0; i < game.players.length; i++) {
      this.sendMessage(message.chat, {
        react: { text: game.emojis.numbers[i + 1], key: message.key },
      });
    }

    const filter = (reaction, user) =>
      game.emojis.numbers.includes(reaction.emoji.name) && !user.bot;
    const options = { max: 2, time: game.timers.role };
    const collector = msg.createReactionCollector(filter, options);
    game.collectors.push(collector);

    let players = [];

    collector.on("collect", (reaction, user) => {
      let numberIndex = game.emojis.numbers.findIndex(
        (emoji) => emoji === reaction.emoji.name
      );
      let cardIndex = numberIndex - 1;
      players.push(game.players[cardIndex]);

      if (players.length === 2) {
        let [p1, p2] = players;
        player.send(`You swapped ${p1} and ${p2}.`);
        swapPlayerCards(p1, p2);
        resolve(
          `Troublemaker (${player.username}) swapped ${p1.username} and ${p2.username}.`
        );
      }
    });

    collector.on("end", () => {
      resolve(`Troublemaker (${player.username}) chose to not swap anyone.`);
    });
  });
}

function drunk(player) {
  return new Promise(async (resolve, reject) => {
    let playerIndex = game.players.findIndex(
      (player) => player.role === "Drunk"
    );
    if (!player) {
      player = game.players[playerIndex];
    }

    const msg = await player.send(`Select a card in the middle.`);
    for (let i = 1; i <= 3; i++) {
      this.sendMessage(message.chat, {
        react: { text: game.emojis.numbers[i], key: message.key },
      });
    }

    let madeAnAction = false;

    const filter = (reaction, user) =>
      game.emojis.numbers.includes(reaction.emoji.name) && !user.bot;
    const options = { max: 1, time: game.timers.role };
    const collector = msg.createReactionCollector(filter, options);
    game.collectors.push(collector);

    collector.on("collect", (reaction, user) => {
      madeAnAction = true;
      let numberIndex = game.emojis.numbers.findIndex(
        (emoji) => emoji === reaction.emoji.name
      );
      let cardIndex = game.deck.length - 1 - (numberIndex - 1);

      let temp = game.deck[playerIndex];
      game.deck[playerIndex] = game.deck[cardIndex];
      game.deck[cardIndex] = temp;
      player.send(
        `You swapped with card ${reaction.emoji.name} in the middle.`
      );
      resolve(
        `Drunk (${player.username}) swapped with card ${reaction.emoji.name} in the middle.`
      );
    });

    collector.on("end", () => {
      if (!madeAnAction) {
        let randomIndex = Math.floor(Math.random() * 3);
        let cardIndex = game.deck.length - 1 - randomIndex;

        let temp = game.deck[i];
        game.deck[i] = game.deck[cardIndex];
        game.deck[cardIndex] = temp;

        player.send(
          `You have been swapped with card ${
            game.emojis.numbers[randomIndex + 1]
          } that was randomly chosen.`
        );
        resolve(
          `Drunk (${player.username}) did not choose. Card ${
            game.emojis.numbers[randomIndex + 1]
          } was randomly chosen.`
        );
      }
    });
  });
}

function insomniac() {
  return new Promise(async (resolve, reject) => {
    for (let i = 0; i < game.players.length; i++) {
      let player = game.players[i];
      if (player.role === "Insomniac") {
        let playerIndex = game.players.findIndex((i) => i.id === player.id);
        player.send(
          `Your card after the night ends is ${game.deck[playerIndex]}.`
        );
      }
    }

    resolve(`Insomniac checked final card.`);
  });
}

function doppelganger() {
  return new Promise(async (resolve, reject) => {
    for (let i = 0; i < game.players.length; i++) {
      let player = game.players[i];
      if (player.role === "Doppelganger") {
        let msg = await player.send(`Select a player. ${getPlayersString()}`);

        for (let i = 0; i < game.players.length; i++) {
          this.sendMessage(message.chat, {
            react: { text: game.emojis.numbers[i + 1], key: message.key },
          });
        }

        let madeAnAction = false;

        const filter = (reaction, user) =>
          game.emojis.numbers.includes(reaction.emoji.name) && !user.bot;
        const options = { max: 1, time: game.timers.role };
        const collector = msg.createReactionCollector(filter, options);
        game.collectors.push(collector);

        collector.on("collect", async (reaction, user) => {
          madeAnAction = true;
          let cardIndex =
            game.emojis.numbers.findIndex(
              (emoji) => emoji === reaction.emoji.name
            ) - 1;
          let newRole = game.deck[cardIndex];

          player.role = newRole;
          game.roles[newRole].inGame += 1;
          game.roles.Doppelganger.role = newRole;

          player.send(`Your new role is ${player.role}.`);

          //if the selected role has an ability at night, perform the action right away
          if (["Seer", "Robber", "Troublemaker", "Drunk"].includes(newRole))
            await game.roles[newRole].perform(player);

          resolve(
            `Doppelganger (${player.username}) chose ${reaction.emoji.name} and is now ${player.role}.`
          );
        });

        collector.on("end", () => {
          if (!madeAnAction) {
            let cardIndex = Math.floor(Math.random() * game.players.length);
            let newRole = game.deck[cardIndex];

            player.role = newRole;
            game.roles[newRole].inGame += 1;
            game.roles.Doppelganger.role = newRole;

            player.send(`Your new role is ${player.role}.`);
            resolve(
              `Doppelganger (${player.username}) did not select. Card ${
                game.emojis.numbers[cardIndex + 1]
              } was randomly chosen.`
            );
          }
        });
      }
    }
  });
}

async function hunter(message, player, alreadyHunter = "") {
  message.reply(
    `${player.username} is the Hunter. Before dying, this player gets to shoot one player and completely overrides all previous votes.`
  );
  let msg = await player.send(`Select a player. ${getPlayersString()}`);
  for (let i = 0; i < game.players.length; i++) {
    if (alreadyHunter === i + 1) continue; //skip the previous hunter
    this.sendMessage(message.chat, {
      react: { text: game.emojis.numbers[i + 1], key: message.key },
    });
  }

  const filter = (reaction, user) =>
    game.emojis.numbers.includes(reaction.emoji.name) && !user.bot;
  const options = { max: 1, time: game.timers.role };
  const collector = msg.createReactionCollector(filter, options);
  game.collectors.push(collector);

  collector.on("collect", (reaction, user) => {
    madeAnAction = true;
    let playerIndex =
      game.emojis.numbers.findIndex((emoji) => emoji === reaction.emoji.name) -
      1;
    let selectedPlayer = game.players[playerIndex];
    let playerRole = selectedPlayer.role;
    if (playerRole === "Doppelganger")
      playerRole = game.roles.Doppelganger.role;
    console.log(`${player.username} chose ${selectedPlayer.username}.`);

    if (playerRole === "Tanner") {
      message.reply(`${selectedPlayer.username} wins!`);
    } else if (
      playerRole === "Werewolf" ||
      (playerRole === "Minion" && !game.roles.Werewolf.inGame)
    ) {
      message.reply(`Village team wins!`);
    } else if (playerRole === "Hunter") {
      //do not recursion call if a player shoots him/herself
      if (player.username !== selectedPlayer.username) {
        hunter(message, selectedPlayer, playerIndex);
      } else {
        console.log(1);
        message.reply(`Evil team wins!`);
      }
    } else {
      console.log(2);
      message.reply(`Evil team wins!`);
    }
  });

  collector.on("end", () => {
    if (!madeAnAction) {
      message.reply(`Evil team wins!`);
    }
  });
}

async function startGame(message) {
  game.on = true;
  createDeck();
  shuffleDeck();
  dealCards();
  console.log(gameCondition());

  message.reply("Night falls. Everyone check your card and go to sleep.");

  if (game.roles.Doppelganger.inGame) {
    let action = await game.roles["Doppelganger"]
      .perform()
      .catch((err) => console.log("Porlbme here"));
    console.log(action);
  }

  for (let i = 0; i < game.order.length; i++) {
    let roleName = game.order[i];
    if (game.roles[roleName].inGame) {
      console.log(`${roleName}'s Turn.`);
      let action = await game.roles[roleName]
        .perform()
        .catch((err) => console.log("proiej"));
      console.log(action);
    }
  }

  //reset in game counter
  resetInGameRoles();
  //deal cards again after all the switching
  dealFinalCards();

  if (!game.on) return;

  try {
    let discuss = await discussion(message);
    console.log(discuss);
  } catch (err) {
    console.log(err);
  } finally {
    let voteResult = await vote(message);
    if (voteResult === "Game was terminated.") return;

    if (voteResult) {
      console.log("Someone got voted out.");
      message.reply(`${voteResult.username} received the most votes.`);

      let playerRole = voteResult.role;
      if (playerRole === "Doppelganger")
        playerRole = game.roles.Doppelganger.role;

      if (playerRole === "Tanner") {
        message.reply(`${voteResult.username} wins!`);
      } else if (
        playerRole === "Werewolf" ||
        (playerRole === "Minion" && !game.roles.Werewolf.inGame)
      ) {
        message.reply(`Village team wins!`);
      } else if (playerRole === "Hunter") {
        hunter(message, voteResult);
      } else {
        message.reply(`Evil team wins!`);
      }
    } else {
      console.log("No one got voted out.");
      if (game.roles.Werewolf.inGame || game.roles.Minion.inGame) {
        message.reply(`No one got voted out. Evil team wins!`);
      } else {
        message.reply(`No one got voted out. Village team wins!`);
      }
    }
  }

  game.on = false;
  console.log("Game session has ended.");
}

function discussion(message) {
  message.reply(`Discussion Time. (${game.timers.discussion / 1000} seconds)`);
  game.timer = timeout(game.timers.discussion);
  return game.timer;
}

function vote(message) {
  return new Promise(async (resolve, reject) => {
    if (!game.on) {
      console.log("Game was terminated by stop command.");
      resolve("Game was terminated.");
    } else {
      const msg = await message.reply(
        `Vote Time. Careful! You can only vote once! ${getPlayersString()}`
      );
      for (let i = 1; i <= game.players.length; i++) {
        this.sendMessage(message.chat, {
          react: { text: game.emojis.numbers[i], key: message.key },
        });
      }

      const filter = (reaction, user) =>
        game.emojis.numbers.includes(reaction.emoji.name) && !user.bot;
      const collector = msg.createReactionCollector(filter, {
        time: game.timers.vote,
        dispose: true,
      });
      game.collectors.push(collector);

      let votedPlayers = {};

      collector.on("collect", (reaction, player) => {
        if (votedPlayers[player.username]) {
          // voteMsg.remove(reaction.emoji);
        } else {
          votedPlayers[player.username] = true;
        }

        let votedCount = Object.values(votedPlayers).length;
        if (votedCount === game.players.length) collector.stop();
      });

      collector.on("remove", (reaction, player) => {
        if (votedPlayers[player.username]) {
          // player.send("You have already voted.");
        }
      });

      collector.on("end", (reaction, player) => {
        let votedCount = Object.values(votedPlayers).length;
        if (votedCount) {
          console.log("Everyone has voted.");

          let voteArr = msg.reactions.cache.map((cache) => cache.count);
          console.log(voteArr);

          let max = Math.max(...voteArr);
          let occurrence = findOccurrence(max, voteArr);

          if (occurrence) {
            console.log("Duplicate highest votes.");
            resolve();
          } else {
            let playerIndex = voteArr.findIndex((i) => i === max);
            let player = game.players[playerIndex];

            console.log(`${player.username} received the highest vote.`);
            resolve(player);
          }
        } else {
          console.log("No one voted.");
          resolve();
        }
      });
    }
  });
}

async function setRoles(message) {
  const roleMsg = await message.reply(
    `Use '${prefix} roles' to see all the toggled roles.\nEach roles can also be toggled using '${prefix} add/remove role name'.\nThen the host can press the green circle to start the game.`
  );
  getBalanceNotice(message);

  await roleMsg.react(game.emojis.start);
  //collect "🟢" reactions from role message
  const filter = (reaction, user) =>
    game.emojis.start === reaction.emoji.name && !user.bot;
  //no max limit only time limit of 15 seconds
  const roleMsgCollector = roleMsg.createReactionCollector(filter, {
    time: 600000,
  });
  game.collectors.push(roleMsgCollector);

  //only the host can press "🟢" to start the game
  roleMsgCollector.on("collect", (reaction, player) => {
    if (player.id === message.author.id) {
      roleMsgCollector.stop();
      startGame(message);
    }
  });
}

function createDeck() {
  let roles = Object.entries(game.roles);
  for (let i = 0; i < roles.length; i++) {
    const [roleName, roleValue] = roles[i];
    if (roleValue.count)
      game.deck = game.deck.concat(Array(roleValue.count).fill(roleName));
  }
}

function shuffleDeck() {
  for (let i = 0; i < game.deck.length; i++) {
    let pointer = Math.floor(Math.random() * game.deck.length);
    let temp = game.deck[i];
    game.deck[i] = game.deck[pointer];
    game.deck[pointer] = temp;
  }
}

function dealCards() {
  for (let i = 0; i < game.players.length; i++) {
    let card = game.deck[i];
    game.players[i].role = card;
    game.players[i]
      .send(
        `You are ${card}. ${game.roles[card].description}\n${getRoleOrder()}`
      )
      .catch(() =>
        console.log(`Failed to send message to ${game.players[i].username}`)
      );
    game.roles[card].inGame += 1;
  }
}

function resetInGameRoles() {
  let roles = Object.keys(game.roles);
  for (let i = 0; i < roles.length; i++) {
    roles[i].inGame = 0;
  }
}

function dealFinalCards() {
  for (let i = 0; i < game.players.length; i++) {
    let card = game.deck[i];
    game.players[i].role = card;
    game.roles[card].inGame += 1;
  }
}

function getBalanceNotice(message) {
  let msg = "";
  let balanceRoleCount = game.players.length + 3;
  if (balanceRoleCount < getRolesCount()) {
    msg = `Need ${getRolesCount() - balanceRoleCount} less roles.`;
  } else if (balanceRoleCount > getRolesCount()) {
    msg = `Need ${balanceRoleCount - getRolesCount()} more roles.`;
  } else {
    msg = "Roles balanced.";
  }
  message.reply(msg);
}

function getPlayersString() {
  return (
    "\n" +
    game.players
      .map((player, index) => {
        return `${game.emojis.numbers[index + 1]} ${player.username}`;
      })
      .join(`\n`)
  );
}

function getPlayersRoles() {
  return game.players.map((player) => player.username + " " + player.role);
}

function getRolesCount() {
  let roles = Object.values(game.roles);
  return roles.reduce((a, b) => a + b.count, 0);
}

function findPlayersWithRole(role) {
  let players = game.players.filter((player) => player.role === role);
  return players.map((player) => player.username);
}

function findOtherPlayersWithRole(role, player) {
  let players = game.players.filter(
    (p) => p.role === role && p.username !== player.username
  );
  return players.map((player) => player.username);
}

function swapPlayerCards(p1, p2) {
  let p1Index = game.players.findIndex((i) => i.id === p1.id);
  let p2Index = game.players.findIndex((i) => i.id === p2.id);

  let temp = game.deck[p1Index];
  game.deck[p1Index] = game.deck[p2Index];
  game.deck[p2Index] = temp;
}

function findOccurrence(n, arr) {
  let repeat = {};
  for (let i = 0; i < arr.length; i++) {
    if (repeat[arr[i]]) {
      repeat[arr[i]] += 1;
    } else {
      repeat[arr[i]] = 1;
    }
  }
  if (repeat[n] > 1) return true;
  return false;
}

function getRoleOrder() {
  let order = [];
  for (let i = 0; i < game.order.length; i++) {
    let roleName = game.order[i];

    if (game.roles[roleName].count) {
      order.push(roleName);
    }
  }

  return order.join(" -> ");
}
