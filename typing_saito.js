class TypingGame {
    constructor({
      words = [],
      totalTime = 30,
      selectors = {}
    } = {}) {
      // 設定
      this.words      = words;
      this.totalTime  = totalTime;
      this.score      = 0;
      this.remaining  = totalTime;
      this.isPlaying  = false;
  
      // DOM要素
      const {
        wordEl    = '#word',
        inputEl   = '#input',
        scoreEl   = '#score',
        timeEl    = '#time',
        startBtn  = '#startBtn',
        timerFill = '.timer-fill'
      } = selectors;
  
      this.$word    = document.querySelector(wordEl);
      this.$input   = document.querySelector(inputEl);
      this.$score   = document.querySelector(scoreEl);
      this.$time    = document.querySelector(timeEl);
      this.$button  = document.querySelector(startBtn);
      this.$fill    = document.querySelector(timerFill);
  
      // バインド
      this._onInput     = this._onInput.bind(this);
      this._onStart     = this._onStart.bind(this);
      this._tick        = this._tick.bind(this);
    }
  
    init() {
      this.$button.addEventListener('click', this._onStart);
      this.$input.addEventListener('input', this._onInput);
      return this;  // チェイン可
    }
  
    // ランダム単語
    _pickRandom() {
      return this.words[Math.floor(Math.random() * this.words.length)];
    }
  
    // 画面に単語を描画（正誤ハイライト）
    _renderWord() {
      const target = this.$word.textContent;
      const input  = this.$input.value;
      let html = '';
  
      for (let i = 0; i < target.length; i++) {
        if (i < input.length) {
          html += input[i] === target[i]
            ? `<span class="correct">${target[i]}</span>`
            : `<span class="incorrect">${target[i]}</span>`;
        } else {
          html += `<span>${target[i]}</span>`;
        }
      }
      this.$word.innerHTML = html;
    }
  
    // 次の単語セットアップ
    _nextWord() {
      this.$word.textContent = this._pickRandom();
      this.$word.classList.remove('game-over');
      this.$input.value = '';
      this.$input.focus();
      this._renderWord();
    }
  
    // 入力イベント
    _onInput() {
      if (!this.isPlaying) return;
      this._renderWord();
  
      if (this.$input.value.trim() === this.$word.textContent) {
        this.score++;
        this.$score.textContent = this.score;
        this._nextWord();
      }
    }
  
    // ゲーム開始ボタン
    _onStart() {
      if (this.isPlaying) return;
      this.isPlaying     = true;
      this.score          = 0;
      this.remaining      = this.totalTime;
      this.$score.textContent = '0';
      this.$time.textContent  = this.totalTime;
      this.$fill.style.width  = '100%';
      this.$input.disabled    = false;
      this.$button.disabled   = true;
      this._nextWord();
  
      // パフォンス･タイマー開始
      this._startTime = performance.now();
      requestAnimationFrame(this._tick);
    }
  
    // フレームごとのカウントダウン
    _tick(now) {
      const elapsed = (now - this._startTime) / 1000;
      this.remaining = Math.max(0, this.totalTime - elapsed);
      this.$time.textContent = this.remaining.toFixed(1);
      this.$fill.style.width = (this.remaining / this.totalTime * 100) + '%';
  
      if (this.remaining > 0) {
        requestAnimationFrame(this._tick);
      } else {
        this._endGame();
      }
    }
  
    // ゲーム終了
    _endGame() {
      this.isPlaying    = false;
      this.$input.disabled  = true;
      this.$word.textContent = 'ゲームオーバー！';
      this.$word.classList.add('game-over');
      this.$button.disabled = false;
      this.$button.textContent = 'リスタート';
    }
  }
  
  // ページ読み込み後に起動
  document.addEventListener('DOMContentLoaded', () => {
    new TypingGame({
      words: [
        'apple','banana','cherry','dragonfruit','elderberry',
        'fig','grape','honeydew','kiwi','lemon',
        'mango','nectarine','orange','papaya','quince',
        'raspberry','strawberry','tangerine','ugli','watermelon'
      ],
      totalTime: 30,
      selectors: {
        wordEl:    '#word',
        inputEl:   '#input',
        scoreEl:   '#score',
        timeEl:    '#time',
        startBtn:  '#startBtn',
        timerFill: '.timer-fill'
      }
    }).init();
  });