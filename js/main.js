// GSAP と ScrollTrigger の登録
gsap.registerPlugin(ScrollTrigger);

// 1. ポットうさぎが常にゆらゆらと上下に浮遊し続ける演出（スクロール誘導の仕掛け）
gsap.to(".intro-bunny", {
  y: -15,             // 上下に15px幅で動かす
  duration: 2.5,      // 往復に2.5秒かけるゆったりとしたテンポ
  repeat: -1,         // 無限ループ
  yoyo: true,         // 行って戻るを繰り返す
  ease: "sine.inOut"  // 水面に浮いているようななめらかなイージング
});

// 2. イントロテキストのふんわりフェードイン演出（スクロールに連動）
gsap.to(".intro-content", {
  scrollTrigger: {
    trigger: ".intro-section",
    start: "top 70%",
    toggleActions: "play none none none"
  },
  opacity: 1,
  y: 0,
  duration: 2.0,
  ease: "power1.out" // ← 初速がマイルドになり、全体がゆっくり見えます
});
// 時計ウサギのゆらゆらアニメーション（左側）
gsap.to(".story-bunny", {
  y: -15,             // 上下に15px浮遊
  duration: 2.5,      // 往復2.5秒
  repeat: -1,         // 無限ループ
  yoyo: true,         // 往復動作
  ease: "sine.inOut"  // スムーズな波形イージング
});
// 感想セクション読了時に、お花をフェードインさせる演出
gsap.to(".review-flower-fade", {
  scrollTrigger: {
    trigger: ".review-grid",
    start: "bottom 70%", // レビューカード群の底面が画面80%の位置に来たら発動
    toggleActions: "play none none none"
  },
  opacity: 1,
  y: -20,             // 少しだけ上に昇るような柔らかい動き
  duration: 2.0,      /* ゆっくり優しく浮き上がらせる */
  ease: "power2.out"
});
document.addEventListener("DOMContentLoaded", () => {
  const ticketWrap = document.getElementById("invitation-ticket");
  const ticketBtn = document.getElementById("ticket-btn");
  const typedTextEl = document.getElementById("typed-text");
  const enterLink = document.getElementById("enter-link");

  const message = "物書きオンナへの\nインビテーションが届きました。";
  let isOpened = false;
  let typeInterval = null;

  // 1. チケットをクリックしたとき（開く動作）
  ticketBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (isOpened) return;
    isOpened = true;

    // チケットを右へスライド（出過ぎないように調整した x の数値）
    gsap.to(ticketWrap, {
      x: 380, // ← お好みのスライド量に調整してください
      duration: 0.5,
      ease: "power3.out",
      onComplete: () => {
        // スライドし終わったら、チケット上に文字をタイピングしていく
        let charIndex = 0;
        typedTextEl.textContent = "";

        typeInterval = setInterval(() => {
          if (charIndex < message.length) {
            if (message.charAt(charIndex) === "\n") {
              typedTextEl.innerHTML += "<br>";
            } else {
              typedTextEl.textContent += message.charAt(charIndex);
            }
            charIndex++;
          } else {
            clearInterval(typeInterval);
            // 最後にリンクをフワッと出す
            gsap.to(enterLink, {
              opacity: 1,
              duration: 0.6,
              ease: "power2.out"
            });
          }
        }, 65);
      }
    });
  });

  // 2. 画面の別の場所がクリックされたとき（閉じる動作）
  document.addEventListener("click", (e) => {
    if (isOpened && !ticketWrap.contains(e.target)) {
      if (typeInterval) clearInterval(typeInterval);

      // チケットを元の隠れた位置に戻す
      gsap.to(ticketWrap, {
        x: 0,
        duration: 0.4,
        ease: "power3.inOut",
        onComplete: () => {
          typedTextEl.textContent = "";
          gsap.set(enterLink, { opacity: 0 });
          isOpened = false;
        }
      });
    }
  });
});
// GSAPとScrollTriggerの有効化（もし他の場所でScrollTriggerを使っていなければそのままでOKです）
gsap.registerPlugin(ScrollTrigger);

// ==========================================
// 裏側オープニング：1秒後に画像が消えて文字が浮かび上がる演出
// ==========================================
document.addEventListener("DOMContentLoaded", function() {
  // GSAPのタイムラインを作成
  const tl = gsap.timeline({
    delay: 1.0 // ページを開いてから「1秒」待機
  });

  // 1秒経ったら、ファーストビューの画像をゆっくり消す
  tl.to(".hero-ura", {
    opacity: 0,
    duration: 1.8,
    ease: "power2.out",
    onComplete: function() {
      // 完全に見えなくなったらレイアウトの当たり判定を消す
      document.querySelector(".hero-ura").style.pointerEvents = "none";
    }
  })
  // 同じ位置にあらかじめ重ねてある文字をふわっと浮かび上がらせる
  .to(".intro-uracontent", {
    opacity: 1,
    y: 0,
    duration: 1.8,
    ease: "power2.out"
  }, "-=0.6"); // 画像が消え切る少し前から文字を出し始める
});