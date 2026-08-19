const questions = [
  { grade: 3, q: "日なたに置いた温度計で、気温を正しくはかるために大切なことは？", choices: ["温度計に日光を直接当てる", "地面に置く", "日光を直接当てず風通しをよくする", "水の中に入れる"], answer: 2, explanation: "気温は、温度計に日光を直接当てず、風通しのよい場所ではかります。" },
  { grade: 3, q: "こん虫の体は、頭・むねと、もう一つ何からできている？", choices: ["はら", "しっぽ", "せなか", "つばさ"], answer: 0, explanation: "こん虫の体は、頭・むね・はらの3つの部分からできています。" },
  { grade: 3, q: "じしゃくの、鉄を強く引きつける両はしの部分を何という？", choices: ["極", "電極", "中心", "支点"], answer: 0, explanation: "磁石の両端の、鉄を強く引きつける部分を極といいます。" },
  { grade: 4, q: "水がこおり始める温度は、およそ何℃？", choices: ["0℃", "10℃", "50℃", "100℃"], answer: 0, explanation: "水はおよそ0℃でこおり始めます。" },
  { grade: 4, q: "空気を閉じこめて押すと、空気の体積はどうなる？", choices: ["小さくなる", "大きくなる", "必ず0になる", "変わらない"], answer: 0, explanation: "閉じこめた空気は押すと体積が小さくなり、押し返す力が大きくなります。" },
  { grade: 4, q: "月が光って見えるのはなぜ？", choices: ["月が自分で光を出すから", "太陽の光を反射しているから", "星の光を集めるから", "地球の電気で光るから"], answer: 1, explanation: "月は太陽の光を反射して光って見えます。" },
  { grade: 5, q: "植物の種子が発芽するために必要な条件の組み合わせは？", choices: ["水・適当な温度・空気", "光・土・肥料", "水・光・肥料", "土・空気・光"], answer: 0, explanation: "発芽には、水・適当な温度・空気が必要です。" },
  { grade: 5, q: "水に物質がとけて、全体が均一になった液を何という？", choices: ["水溶液", "混合物", "蒸気", "結晶"], answer: 0, explanation: "物質が水にとけて全体が均一になった液を水溶液といいます。" },
  { grade: 5, q: "流れる水が地面をけずるはたらきを何という？", choices: ["侵食", "運搬", "堆積", "蒸発"], answer: 0, explanation: "流れる水が地面をけずるはたらきを侵食といいます。" },
  { grade: 5, q: "雲の量や動きは、何と関係している？", choices: ["天気の変化", "月の満ち欠けだけ", "磁石の強さ", "電流の向き"], answer: 0, explanation: "雲の量や動きは天気の変化と関係しています。" },
  { grade: 6, q: "物が燃え続けるために必要な気体は？", choices: ["酸素", "二酸化炭素", "窒素", "水蒸気"], answer: 0, explanation: "物が燃えるときには、空気中の酸素が使われます。" },
  { grade: 6, q: "植物が日光を受けて、葉ででんぷんなどをつくるはたらきを何という？", choices: ["光合成", "呼吸", "蒸発", "発芽"], answer: 0, explanation: "植物が日光を受け、葉ででんぷんなどをつくるはたらきを光合成といいます。" },
  { grade: 6, q: "食べ物を通した生物どうしのつながりを何という？", choices: ["食物連鎖", "水の循環", "地層", "電気回路"], answer: 0, explanation: "食べる・食べられるという生物どうしのつながりを食物連鎖といいます。" },
  { grade: 6, q: "月の見える形が日によって変わることに関係するものは？", choices: ["月と太陽の位置関係", "気温だけ", "風向きだけ", "地面の温度だけ"], answer: 0, explanation: "月の見える形は、月と太陽の位置関係によって変わります。" }
];

const startScreen = document.querySelector('#start-screen');
const quizScreen = document.querySelector('#quiz-screen');
const resultScreen = document.querySelector('#result-screen');
const questionEl = document.querySelector('#question');
const choicesEl = document.querySelector('#choices');
const feedbackEl = document.querySelector('#feedback');
const nextBtn = document.querySelector('#next-btn');
const progressEl = document.querySelector('#progress');
const progressBar = document.querySelector('#progress-bar');
const scoreEl = document.querySelector('#score');
const gradeLabel = document.querySelector('#grade-label');

let quiz = [];
let current = 0;
let score = 0;

const shuffle = array => [...array].sort(() => Math.random() - 0.5);

function startQuiz(grade) {
  const pool = grade === 'all' ? questions : questions.filter(item => item.grade === Number(grade));
  quiz = shuffle(pool).slice(0, Math.min(10, pool.length));
  current = 0;
  score = 0;
  startScreen.classList.add('hidden');
  resultScreen.classList.add('hidden');
  quizScreen.classList.remove('hidden');
  showQuestion();
}

function showQuestion() {
  const item = quiz[current];
  progressEl.textContent = `${current + 1} / ${quiz.length}`;
  progressBar.style.width = `${((current + 1) / quiz.length) * 100}%`;
  scoreEl.textContent = `${score}点`;
  gradeLabel.textContent = `${item.grade}年生`;
  questionEl.textContent = item.q;
  choicesEl.innerHTML = '';
  feedbackEl.classList.add('hidden');
  nextBtn.classList.add('hidden');

  item.choices.forEach((choice, index) => {
    const button = document.createElement('button');
    button.className = 'choice';
    button.textContent = choice;
    button.addEventListener('click', () => answerQuestion(index));
    choicesEl.appendChild(button);
  });
}

function answerQuestion(selected) {
  const item = quiz[current];
  const buttons = [...document.querySelectorAll('.choice')];
  buttons.forEach((button, index) => {
    button.disabled = true;
    if (index === item.answer) button.classList.add('correct');
    if (index === selected && selected !== item.answer) button.classList.add('wrong');
  });

  if (selected === item.answer) {
    score++;
    feedbackEl.innerHTML = `<strong>正解！</strong><br>${item.explanation}`;
  } else {
    feedbackEl.innerHTML = `<strong>おしい！</strong><br>${item.explanation}`;
  }
  scoreEl.textContent = `${score}点`;
  feedbackEl.classList.remove('hidden');
  nextBtn.classList.remove('hidden');
  nextBtn.textContent = current === quiz.length - 1 ? '結果を見る' : '次の問題へ';
}

function showResult() {
  quizScreen.classList.add('hidden');
  resultScreen.classList.remove('hidden');
  const percent = Math.round((score / quiz.length) * 100);
  document.querySelector('#result-title').textContent = `${score} / ${quiz.length} 問正解`;
  document.querySelector('#result-message').textContent = percent === 100
    ? '全問正解！ 理科の言葉をしっかり覚えています。'
    : percent >= 70
      ? 'よくできました。まちがえた言葉をもう一度確認してみよう。'
      : 'もう一度挑戦して、理科の言葉を少しずつ増やしていこう。';
}

document.querySelectorAll('.grade-btn').forEach(button => {
  button.addEventListener('click', () => startQuiz(button.dataset.grade));
});

nextBtn.addEventListener('click', () => {
  current++;
  current < quiz.length ? showQuestion() : showResult();
});

document.querySelector('#retry-btn').addEventListener('click', () => {
  resultScreen.classList.add('hidden');
  startScreen.classList.remove('hidden');
});
