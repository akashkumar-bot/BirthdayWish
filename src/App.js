import { useEffect, useMemo, useState } from "react";
import heroImage from "./assets/birthday-hero.png";
import floralCluster from "./assets/floral-cluster.png";

const wish = {
  herName: "Sanu",
  fromName: "Akash",
  shortLine: "Class ki ek bahut acchi dost ke liye, ek chhoti si birthday wish dil se.",
  promise:
    "Tum hamesha aise hi khush raho, haste raho aur apni simple si smile se sabka din accha banati raho. Aane wala saal tumhare liye bahut saari success aur yaadgaar moments lekar aaye.",
  reasons: [
    "Tum simple hoke bhi bahut special lagti ho.",
    "Tumhari kindness tumhari sabse khoobsurat qualities mein se ek hai.",
    "Tum itne sweet tareeke se baat karti ho ki normal si conversation bhi acchi lagne lagti hai.",
    "Tum ek aise year deserve karti ho jisme dreams bhi complete hon aur smile bhi constant rahe."
  ],
  finalMessage:
    "Happy Birthday, Sanu! Bhagwan kare tumhara har goal poora ho, har naya din ek acchi memory laaye aur tumhe life mein woh sab mile jiske liye tum mehnat kar rahi ho."
};

const pages = [
  { id: "hello", label: "Start", path: "/" },
  { id: "reasons", label: "Reasons", path: "/reasons" },
  { id: "wish", label: "Wish", path: "/birthday-note" },
  { id: "surprise", label: "Surprise", path: "/surprise" }
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
  if (!AudioContext) return 0;

  const audioContext = new AudioContext();
  const masterGain = audioContext.createGain();
  const compressor = audioContext.createDynamicsCompressor();
  const echo = audioContext.createDelay(1);
  const echoGain = audioContext.createGain();
  masterGain.gain.setValueAtTime(0.2, audioContext.currentTime);
  compressor.threshold.setValueAtTime(-18, audioContext.currentTime);
  compressor.ratio.setValueAtTime(3, audioContext.currentTime);
  compressor.attack.setValueAtTime(0.02, audioContext.currentTime);
  compressor.release.setValueAtTime(0.28, audioContext.currentTime);
  echo.delayTime.setValueAtTime(0.24, audioContext.currentTime);
  echoGain.gain.setValueAtTime(0.2, audioContext.currentTime);
  masterGain.connect(compressor);
  masterGain.connect(echo);
  echo.connect(echoGain);
  echoGain.connect(compressor);
  compressor.connect(audioContext.destination);

  let startTime = audioContext.currentTime + 0.08;
  birthdayMelody.forEach(([note, duration]) => {
    const oscillator = audioContext.createOscillator();
    const shimmer = audioContext.createOscillator();
    const bass = audioContext.createOscillator();
    const noteGain = audioContext.createGain();
    const shimmerGain = audioContext.createGain();
    const bassGain = audioContext.createGain();
    const toneFilter = audioContext.createBiquadFilter();
    oscillator.type = "triangle";
    shimmer.type = "sine";
    bass.type = "sine";
    oscillator.frequency.setValueAtTime(noteFrequencies[note], startTime);
    shimmer.frequency.setValueAtTime(noteFrequencies[note] * 2, startTime);
    bass.frequency.setValueAtTime(noteFrequencies[note] / 2, startTime);
    toneFilter.type = "lowpass";
    toneFilter.frequency.setValueAtTime(3200, startTime);
    toneFilter.frequency.exponentialRampToValueAtTime(1100, startTime + duration);
    toneFilter.Q.setValueAtTime(0.7, startTime);
    noteGain.gain.setValueAtTime(0, startTime);
    noteGain.gain.linearRampToValueAtTime(0.85, startTime + 0.035);
    noteGain.gain.exponentialRampToValueAtTime(0.22, startTime + duration * 0.72);
    noteGain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
    shimmerGain.gain.setValueAtTime(0, startTime);
    shimmerGain.gain.linearRampToValueAtTime(0.16, startTime + 0.02);
    shimmerGain.gain.exponentialRampToValueAtTime(0.001, startTime + duration * 0.8);
    bassGain.gain.setValueAtTime(0, startTime);
    bassGain.gain.linearRampToValueAtTime(0.3, startTime + 0.06);
    bassGain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
    oscillator.connect(toneFilter);
    toneFilter.connect(noteGain);
    noteGain.connect(masterGain);
    shimmer.connect(shimmerGain);
    shimmerGain.connect(masterGain);
    bass.connect(bassGain);
    bassGain.connect(masterGain);
    oscillator.start(startTime);
    shimmer.start(startTime);
    bass.start(startTime);
    oscillator.stop(startTime + duration);
    shimmer.stop(startTime + duration);
    bass.stop(startTime + duration);
    startTime += duration + 0.055;
  });

  const songDuration = (startTime - audioContext.currentTime + 0.5) * 1000;
  window.setTimeout(() => audioContext.close(), songDuration);
  return songDuration;
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

      <nav className="page-tabs" aria-label="Wish pages">
        {pages.map((item, index) => (
          <button
            className={index === page ? "tab active" : "tab"}
            key={item.id}
            onClick={() => goToPage(index)}
            type="button"
          >
            <span>{index + 1}</span>
            {item.label}
          </button>
        ))}
      </nav>

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
          Back
        </button>
        <div className="progress" aria-label={`Page ${page + 1} of ${pages.length}`}>
          {pages.map((item, index) => (
            <span className={index <= page ? "dot done" : "dot"} key={item.id} />
          ))}
        </div>
        <button onClick={nextPage} disabled={page === pages.length - 1} type="button">
          Next
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
        <h2>Hey {wish.herName}, aaj ka din sirf tumhare naam.</h2>
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
        {wish.reasons.map((reason) => (
          <article className="reason-card" key={reason}>
            <div className="heart">♥</div>
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
      <DecorativeFlorals variant="wish" />
      <div className="wish-card">
        <p className="eyebrow">Birthday note</p>
        <h2>Dear {wish.herName},</h2>
        <p>{wish.finalMessage}</p>
        <p>{wish.promise}</p>
        <strong>- {wish.fromName}</strong>
      </div>
    </div>
  );
}

function SurprisePage({ opened, onOpen }) {
  const openSurprise = () => {
    if (!opened) {
      playBirthdaySong();
    }
    onOpen();
  };

  return (
    <div className="page-content surprise-page">
      <DecorativeFlorals variant="surprise" />
      <p className="eyebrow">One last thing</p>
      <h2>{opened ? "There it is." : "Tap the gift for a small surprise."}</h2>
      <button
        className={opened ? "gift-box open" : "gift-box"}
        onClick={openSurprise}
        type="button"
        aria-label="Open birthday surprise"
      >
        <span className="gift-lid" />
        <span className="gift-body" />
      </button>
      {opened && (
        <div className="final-reveal">
          <p>May this year bring you the courage to chase every dream quietly living in your heart.</p>
          <h3>Keep smiling, Keep Blushing, Sanu.</h3>
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
