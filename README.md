# ♠️ CardChess ♟️
CardChess is a self-developed game inspired by chess, originally played with French-cards. This software is a computer based version of the game, where you have to defeat the opponent bot.

---

## 📖 Rules

### **♟️ Basics**

* The game is played by two players.
* Each player has 13 cards, using a quarter deck of French-suited playing cards.
* 12 cards are placed on the board, and 1 card is designated as the "swap card".
* The cards are arranged in a 3x4 grid randomly (the King must be in the last row), and the opponent's cards are hidden from view.
* Players can move their cards side, forward or diagonally forward (with some special exceptions).
* The objective of the game is to either capture the opponent's king or move your own king to the opponent's backline.

### **🎮 Gameplay**

In each turn, a player can choose one of the following actions:

1. **Move a card:**

   * If you move onto an opponent's card, both the card you moved and the card you landed on are revealed.
   * If your card is higher in rank than the opponent's, you successfully capture their card, and it is removed from the game. You replace their card with your own.
   * If your card is lower in rank, your card is captured and removed from the game, while the opponent’s card remains face-up on the board.
   * **Important note**: To capture a king, it can only be defeated by a *face card* (Jack, Queen, or King) or a *Ten*. *Aces cannot capture the King*.

2. **Swap two adjacent cards:**

   * You can exchange the position of two adjacent cards on the board.

3. **Swap a card with the "swap card":**

   * You can replace one of your cards (except the King) with the swap card on the board.

After your turn, the next player takes their turn.

### **⬆️ Promotion**

* If you reach the opponent's backline with a card, you can exchange it to a captured one.
* If there is no captured card yet, the same card will be promoted.
* The promoted card is placed at the first blank space in the column.

### **🃏 Special Cards**

* **💣 Mine (Ace):**

  * When a mine is stepped on, it explodes, causing both the stepping card and the mine to be removed from the game.
  * The mine itself can move, but it cannot step on an opponent’s card.

* **🛡️ Shield (Two):**

  * If a card steps on a Shield, the attack is deflected, and the Shield stays in place. However, in the next turn, the Shield can be captured by a higher-ranked card.

* **⚔️ Jack:**

  * The Jack card cannot attack diagonally. However, it can move forward, even jumping over one of the cards directly in front of it.

* **👑 Queen:**

  * The Queen can only attack diagonally.
  * Additionally, it can reveal the first unflipped enemy card in front of it.

### **🏆 Winning Conditions**

* A player wins the game if they either:

  * Capture the opponent’s King.
  * Successfully move their own King to the opponent's backline.

* If a King is captured by the opponent's King, it is a draw.