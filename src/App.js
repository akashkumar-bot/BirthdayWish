import { useEffect, useMemo, useRef, useState } from "react";
import heroImage from "./assets/birthday-hero.png";
import floralCluster from "./assets/floral-cluster.png";
import birthdaySurpriseVideo from "./assets/birthday-surprise.mp4";

const wish = {
  herName: "Shanu",
  fromName: "Akash",
  shortLine: "Class ki ek bahut acchi dost ke liye, ek chhoti si birthday wish dil se.",
  reasons: [
    "Tum simple hoke bhi bahut special lagti ho. 🌸✨",
    "You carry kindness so effortlessly that even your words leave a little happiness behind. 🤍🌷",
    "Some girls are beautiful by face, but you're beautiful by face and by heart. Your sweetness makes you truly unforgettable. 💖🦋🌸",
    "Tum ek aise year deserve karti ho jisme dreams bhi complete hon aur smile bhi constant rahe. 🌠😊💫"
  ],
  finalMessage: [
    "💌🧿 HAPPY BIRTHDAY TO THE SWEETEST, MOST BEAUTIFUL 💟🫶SOUL! 💖✨",
    "Many many happy returns of the day! 🥳🎁 Today is all about celebrating you—your smile 😊, your kindness 💕, your strength 💪, and the happiness you bring into the lives of everyone around you. 🌍💫",
    "I truly hope this birthday marks the beginning of a year filled with endless joy 😄, good health 🌿, peace 🕊️, success 🏆, and countless unforgettable memories 📸. May every dream you've been quietly wishing for come true one by one. 🌠",
    "You are someone who makes the world a little brighter just by being yourself. ☀️ Your smile has the power to make difficult days feel lighter 😊, and your caring nature is something that's truly rare. 💝 Never stop being the wonderful person you are, because that's what makes you so special. 💎",
    "May God always bless you with happiness 😊, protect you from every sorrow 🤲, guide you through every challenge 🌈, and fill your life with love ❤️, laughter 😂, and beautiful surprises 🎁 every single day. May your heart always stay peaceful 💗, your mind stay positive 🌼, and your journey be filled with exciting opportunities 🚀.",
    "I hope this year brings you new adventures ✈️, meaningful friendships 🤝, incredible achievements 🏅, and moments that make you smile for years to come. Keep believing in yourself because you're capable of achieving amazing things. 🌟",
    "Thank you for being such an amazing person. 💐 Your presence makes a difference, and I hope you always remember how appreciated and valued you are. 🤍",
    "Happy Birthday, Shanu! 🥳🎂💖"
  ]
};

const pages = [
  { id: "hello", label: "Welcome", icon: "✦", path: "/" },
  { id: "reasons", label: "For You", icon: "♡", path: "/reasons" },
  { id: "wish", label: "The Note", icon: "✉", path: "/birthday-note" },
  { id: "surprise", label: "Surprise", icon: "♕", path: "/surprise" }
];

const heartField = Array.from({ length: 44 }, (_, index) => ({
  id: index,
  left: `${(index * 17) % 100}%`,
  size: [
    "12px",
    "16px",
    "20px",
    "24px",
    "30px",
    "36px",
    "44px",
    "54px",
    "66px",
    "78px"
  ][index % 10],
  delay: `${(index % 12) * -1.35}s`,
  duration: `${9 + (index % 9)}s`,
  drift: `${index % 2 === 0 ? 28 + (index % 5) * 8 : -28 - (index % 5) * 8}px`,
  color: ["#ed6a7d", "#ff8b66", "#1a9a96", "#f8c85c", "#ff7f9a", "#6d78c7"][
    index % 6
  ]
}));

const birthdayMelody = [
  ["G4", 0.3], ["G4", 0.15], ["A4", 0.45], ["G4", 0.45], ["C5", 0.45], ["B4", 0.9],
  ["G4", 0.3], ["G4", 0.15], ["A4", 0.45], ["G4", 0.45], ["D5", 0.45], ["C5", 0.9],
  ["G4", 0.3], ["G4", 0.15], ["G5", 0.45], ["E5", 0.45], ["C5", 0.45], ["B4", 0.45], ["A4", 0.9],
  ["F5", 0.3], ["F5", 0.15], ["E5", 0.45], ["C5", 0.45], ["D5", 0.45], ["C5", 1.1]
];

const noteFrequencies = {
  G4: 392, A4: 440, B4: 493.88, C5: 523.25,
  D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99
};

function playBirthdaySong() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return null;

  const audioContext = new AudioContext();
  const masterGain = audioContext.createGain();
  masterGain.gain.setValueAtTime(0.16, audioContext.currentTime);
  masterGain.connect(audioContext.destination);

  let startTime = audioContext.currentTime + 0.08;
  birthdayMelody.forEach(([note, duration]) => {
    const oscillator = audioContext.createOscillator();
    const noteGain = audioContext.createGain();
    oscillator.type = "triangle";
    oscillator.frequency.setValueAtTime(noteFrequencies[note], startTime);
    noteGain.gain.setValueAtTime(0, startTime);
    noteGain.gain.linearRampToValueAtTime(0.8, startTime + 0.035);
    noteGain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
    oscillator.connect(noteGain);
    noteGain.connect(masterGain);
    oscillator.start(startTime);
    oscillator.stop(startTime + duration);
    startTime += duration + 0.055;
  });

  const duration = (startTime - audioContext.currentTime + 0.35) * 1000;
  return {
    duration,
    stop: () => {
      if (audioContext.state !== "closed") audioContext.close();
    }
  };
}

function getPageFromPath() {
  const currentPath = window.location.pathname;
  const index = pages.findIndex((item) => item.path === currentPath);
  return index === -1 ? 0 : index;
}

function App() {
  const [page, setPage] = useState(getPageFromPath);
  const [openedGift, setOpenedGift] = useState(false);
  const activePage = pages[page];

  const floatingNotes = useMemo(
    () => ["Happy", "Smile", "Cake", "Wish", "Magic", "Joy"],
    []
  );

  useEffect(() => {
    const syncPageWithUrl = () => setPage(getPageFromPath());
    window.addEventListener("popstate", syncPageWithUrl);
    return () => window.removeEventListener("popstate", syncPageWithUrl);
  }, []);

  const goToPage = (nextIndex) => {
    const safeIndex = Math.min(Math.max(nextIndex, 0), pages.length - 1);
    const nextPath = pages[safeIndex].path;

    if (window.location.pathname !== nextPath) {
      window.history.pushState({}, "", nextPath);
    }

    setPage(safeIndex);
  };

  const nextPage = () => {
    goToPage(page + 1);
  };

  const previousPage = () => {
    goToPage(page - 1);
  };

  return (
    <main className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <FloatingHearts />

      <header className="top-bar">
        <div className="brand-mark" aria-label="Birthday wish for Shanu">
          <span className="brand-monogram">S</span>
          <span className="brand-copy"><small>A birthday story for</small><strong>Shanu</strong></span>
        </div>
        <nav className="page-tabs" aria-label="Wish pages">
          {pages.map((item, index) => (
            <button
              className={index === page ? "tab active" : "tab"}
              key={item.id}
              onClick={() => goToPage(index)}
              type="button"
            >
              <span>{item.icon}</span>
              <small>{String(index + 1).padStart(2, "0")}</small>
              {item.label}
            </button>
          ))}
        </nav>
      </header>

      <section className={`page-screen page-${activePage.id}`} aria-live="polite">
        <FlowerFrame />
        <PageBouquets />
        {activePage.id === "hello" && (
          <IntroPage floatingNotes={floatingNotes} onNext={nextPage} />
        )}
        {activePage.id === "reasons" && <ReasonsPage />}
        {activePage.id === "wish" && <WishPage />}
        {activePage.id === "surprise" && (
          <SurprisePage opened={openedGift} onOpen={() => setOpenedGift(true)} />
        )}
      </section>

      <footer className="controls">
        <button onClick={previousPage} disabled={page === 0} type="button">
          <span aria-hidden="true">←</span> Back
        </button>
        <div className="progress-wrap">
          <span className="progress-label">{String(page + 1).padStart(2, "0")} / {String(pages.length).padStart(2, "0")}</span>
          <div className="progress" aria-label={`Page ${page + 1} of ${pages.length}`}>
          {pages.map((item, index) => (
            <span className={index <= page ? "dot done" : "dot"} key={item.id} />
          ))}
          </div>
        </div>
        <button onClick={nextPage} disabled={page === pages.length - 1} type="button">
          Next <span aria-hidden="true">→</span>
        </button>
      </footer>
    </main>
  );
}

function PageBouquets() {
  return (
    <div className="page-bouquets" aria-hidden="true">
      <img className="page-bouquet page-bouquet-one" src={floralCluster} alt="" />
      <img className="page-bouquet page-bouquet-two" src={floralCluster} alt="" />
      <img className="page-bouquet page-bouquet-three" src={floralCluster} alt="" />
    </div>
  );
}

function FlowerFrame() {
  return (
    <div className="flower-frame" aria-hidden="true">
      {Array.from({ length: 22 }, (_, index) => (
        <span
          className="frame-flower"
          key={index}
          style={{
            "--flower-index": index,
            "--flower-color": [
              "#ed6a7d",
              "#ff8b66",
              "#f8c85c",
              "#1a9a96",
              "#ff7f9a",
              "#6d78c7"
            ][index % 6]
          }}
        />
      ))}
      <span className="corner-flower corner-one" />
      <span className="corner-flower corner-two" />
      <span className="corner-flower corner-three" />
      <span className="corner-flower corner-four" />
    </div>
  );
}

function FloatingHearts() {
  return (
    <div className="floating-hearts" aria-hidden="true">
      {heartField.map((heart) => (
        <span
          key={heart.id}
          style={{
            "--heart-left": heart.left,
            "--heart-size": heart.size,
            "--heart-delay": heart.delay,
            "--heart-duration": heart.duration,
            "--heart-drift": heart.drift,
            "--heart-color": heart.color
          }}
        >
          ♥
        </span>
      ))}
    </div>
  );
}

function IntroPage({ floatingNotes, onNext }) {
  return (
    <div className="page-content intro-page">
      <div className="hero-date" aria-label="Birthday date: 28 July 2026">
        <time dateTime="2026-07-28">
          <strong>28</strong>
          <span>July</span>
          <small>2026</small>
        </time>
      </div>

      <section className="hero-panel" aria-label="Birthday artwork">
        <img
          className="outside-floral outside-floral-hero"
          src={floralCluster}
          alt=""
          aria-hidden="true"
        />
        <span className="flower-vine vine-top" />
        <span className="flower-vine vine-left" />
        <span className="flower-vine vine-bottom" />
        <img
          className="hero-art"
          src={heroImage}
          alt="Birthday celebration with cake and balloons"
        />
      </section>

      <section className="intro-copy">
        <div className="birthday-seal" aria-hidden="true">
          <span>Happy</span>
          <strong>Birthday</strong>
          <span>✦ Sanu ✦</span>
        </div>
        <span className="flower-vine vine-top" />
        <span className="flower-vine vine-right" />
        <span className="flower-vine vine-bottom" />
        <h2>Hey {wish.herName}, tumhari zindagi ka har pal aaj jitna khoobsurat ho.</h2>
        <p className="lead">{wish.shortLine}</p>
        <div className="mini-highlights">
          <span>Warm wishes</span>
          <span>Sweet memories</span>
          <span>Little surprise</span>
        </div>
        <button className="primary-action" onClick={onNext} type="button">
          Start the surprise
        </button>
      </section>

      <div className="note-cloud" aria-label="Birthday mood words">
        {floatingNotes.map((note, index) => (
          <span style={{ "--delay": `${index * 0.45}s` }} key={note}>
            {note}
          </span>
        ))}
      </div>
    </div>
  );
}

function ReasonsPage() {
  return (
    <div className="page-content">
      <DecorativeFlorals variant="reasons" />
      <div className="page-heading">
        <p className="eyebrow">Why you</p>
        <h2>Reasons your birthday deserves extra sparkle.</h2>
      </div>
      <div className="reason-grid">
        {wish.reasons.map((reason, index) => (
          <article className="reason-card" key={reason}>
            <div className="reason-number">0{index + 1}</div>
            <div className="heart" aria-label="Liked">♥</div>
            <p>{reason}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function WishPage() {
  return (
    <div className="page-content wish-card-wrap">
      <article className="wish-card">
        <img className="wish-card-flower wish-card-flower-top" src={floralCluster} alt="" aria-hidden="true" />
        <img className="wish-card-flower wish-card-flower-bottom" src={floralCluster} alt="" aria-hidden="true" />
        <header className="wish-card-header">
          <span className="wish-envelope" aria-hidden="true">💌</span>
          <div>
            <p className="eyebrow">A little note for you</p>
            <h2>Hey {wish.herName},</h2>
          </div>
        </header>

        <div className="wish-message">
          {wish.finalMessage.map((paragraph, index) => (
            <p
              className={index === 0 ? "wish-opening" : index === wish.finalMessage.length - 1 ? "wish-closing" : ""}
              key={paragraph}
            >
              {paragraph}
            </p>
          ))}
        </div>

        <footer className="wish-signature">
          <span>With lots of warm wishes</span>
          <strong>{wish.fromName} 💝</strong>
        </footer>
      </article>
    </div>
  );
}

function SurprisePage({ opened, onOpen }) {
  const videoRef = useRef(null);
  const musicTimerRef = useRef(null);
  const stopMusicRef = useRef(null);
  const [showVideoCover, setShowVideoCover] = useState(false);

  useEffect(() => {
    if (opened && videoRef.current) {
      const video = videoRef.current;
      video.currentTime = 0;
      video.playbackRate = 0.65;
      video.defaultPlaybackRate = 0.65;
      video.muted = false;
      video.volume = 1;
      video.play().catch(() => {
        // The autoplay attribute provides the browser fallback.
      });

      const normalSpeedTimer = window.setTimeout(() => {
        video.playbackRate = 1;
        video.defaultPlaybackRate = 1;
      }, 10000);

      return () => window.clearTimeout(normalSpeedTimer);
    }
  }, [opened]);

  useEffect(() => () => {
    window.clearTimeout(musicTimerRef.current);
    stopMusicRef.current?.();
  }, []);

  const startMusicLoop = () => {
    const song = playBirthdaySong();
    if (!song) return;
    stopMusicRef.current = song.stop;
    musicTimerRef.current = window.setTimeout(startMusicLoop, song.duration);
  };

  const openSurprise = () => {
    if (!opened) startMusicLoop();
    onOpen();
  };

  return (
    <div className="page-content surprise-page">
      <DecorativeFlorals variant="surprise" />
      {!opened && (
        <div className="surprise-closed">
          <p className="eyebrow">One last magical moment</p>
          <h2>A little surprise is waiting for you.</h2>
          <p className="surprise-hint">Close your eyes, make a wish, and tap the gift. ✨</p>
          <div className="gift-stage">
            <span className="gift-spark gift-spark-one">✦</span>
            <span className="gift-spark gift-spark-two">♥</span>
            <span className="gift-spark gift-spark-three">✦</span>
            <button
              className="gift-box"
              onClick={openSurprise}
              type="button"
              aria-label="Open birthday surprise"
            >
              <span className="gift-lid" />
              <span className="gift-body" />
            </button>
          </div>
        </div>
      )}
      {opened && (
        <div className="final-reveal">
          <header className="reveal-heading">
            <span className="reveal-badge">Happy Birthday</span>
            <h2>Happy Birthday, Shanu! 🎂</h2>
          </header>
          <div className={`avatar-video-wrap${showVideoCover ? " cover-visible" : ""}`}>
            <span className="video-corner video-corner-left" aria-hidden="true">✦</span>
            <span className="video-corner video-corner-right" aria-hidden="true">♥</span>
            <video
              autoPlay
              className="avatar-video"
              controlsList="nodownload noplaybackrate nofullscreen"
              disablePictureInPicture
              loop
              onTimeUpdate={(event) => {
                const video = event.currentTarget;
                const shouldShow = video.currentTime >= 2.1
                  && (!video.duration || video.currentTime < video.duration - 0);
                setShowVideoCover(shouldShow);
              }}
              playsInline
              preload="auto"
              ref={videoRef}
              src={birthdaySurpriseVideo}
            />
          </div>
          <div className="reveal-message">
            <p>May this year bring you the courage to chase every dream quietly living in your heart.</p>
            <h3>Keep smiling, keep blushing, Shanu. 💖</h3>
            <span className="reveal-signature">With warm wishes — Akash</span>
          </div>
        </div>
      )}
    </div>
  );
}

function DecorativeFlorals({ variant }) {
  return (
    <div className={`content-florals content-florals-${variant}`} aria-hidden="true">
      <img className="content-floral content-floral-primary" src={floralCluster} alt="" />
      <img className="content-floral content-floral-secondary" src={floralCluster} alt="" />
    </div>
  );
}

export default App;
