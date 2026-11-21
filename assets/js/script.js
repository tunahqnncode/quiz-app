const sorular = {
  HTML: [
    {
      soru: "Which HTML element is used for the largest heading?",
      siklar: ["<h6>", "<head>", "<h1>", "<header>"],
      dogru: 2
    },
    {
      soru: "Which attribute specifies an image alternative text?",
      siklar: ["title", "alt", "src", "desc"],
      dogru: 1
    },
    {
      soru: "Which tag creates a numbered list?",
      siklar: ["<ul>", "<li>", "<dl>", "<ol>"],
      dogru: 3
    }
  ],
  CSS: [
    {
      soru: "Which property changes text color in CSS?",
      siklar: ["font-color", "text-style", "color", "fg-color"],
      dogru: 2
    },
    {
      soru: "Which layout mode arranges items in a single row or column easily?",
      siklar: ["flex", "table", "float", "inline"],
      dogru: 0
    },
    {
      soru: "Which unit is relative to the root html font size?",
      siklar: ["em", "rem", "vh", "px"],
      dogru: 1
    }
  ],
  JavaScript: [
    {
      soru: "Which keyword declares a block-scoped variable that can be reassigned?",
      siklar: ["const", "var", "let", "static"],
      dogru: 2
    },
    {
      soru: "What does JSON.stringify() do?",
      siklar: [
        "Parses JSON string into an object",
        "Converts a value into a JSON string",
        "Validates a JSON schema",
        "Removes empty keys from an object"
      ],
      dogru: 1
    },
    {
      soru: "Which method adds an element to the end of an array?",
      siklar: ["push()", "pop()", "shift()", "slice()"],
      dogru: 0
    }
  ],
  Accessibility: [
    {
      soru: "Why is semantic HTML helpful for screen readers?",
      siklar: [
        "It makes CSS load faster",
        "It gives clear structure and roles to elements",
        "It replaces alt text",
        "It disables keyboard navigation"
      ],
      dogru: 1
    },
    {
      soru: "What should happen when a user navigates with the Tab key?",
      siklar: [
        "Focus indicator should remain visible",
        "Focus should jump to the footer",
        "Form inputs should reset",
        "Images should hide"
      ],
      dogru: 0
    },
    {
      soru: "Why does color contrast matter?",
      siklar: [
        "It reduces image file size",
        "It makes text readable for low-vision users",
        "It speeds up JavaScript loops",
        "It centers flexbox items"
      ],
      dogru: 1
    }
  ]
};

const harfler = ["A", "B", "C", "D"];

const temaSec = document.getElementById("tema-sec");
const girisEkrani = document.getElementById("giris-ekrani");
const soruEkrani = document.getElementById("soru-ekrani");
const sonucEkrani = document.getElementById("sonuc-ekrani");

const seciliKonuAlani = document.getElementById("secili-konu");
const konuRozet = document.getElementById("konu-rozet");
const konuAd = document.getElementById("konu-ad");

const konuButonlari = document.querySelectorAll(".konu-btn");
const soruSira = document.getElementById("soru-sira");
const soruMetni = document.getElementById("soru-metni");
const ilerlemeDolgu = document.getElementById("ilerleme-dolgu");
const siklarAlani = document.getElementById("siklar");
const gonderBtn = document.getElementById("gonder-btn");
const uyari = document.getElementById("uyari");

const sonucRozet = document.getElementById("sonuc-rozet");
const sonucAd = document.getElementById("sonuc-ad");
const puanSayi = document.getElementById("puan-sayi");
const puanToplam = document.getElementById("puan-toplam");
const tekrarBtn = document.getElementById("tekrar-btn");

let aktifKonu = "";
let aktifSorular = [];
let soruIndex = 0;
let puan = 0;
let secilenSik = null;
let kontrolEdildi = false;

temaSec.addEventListener("change", function () {
  document.body.classList.toggle("dark", temaSec.checked);
});

konuButonlari.forEach(function (btn) {
  btn.addEventListener("click", function () {
    aktifKonu = btn.dataset.konu;
    aktifSorular = sorular[aktifKonu];
    soruIndex = 0;
    puan = 0;

    girisEkrani.hidden = true;
    sonucEkrani.hidden = true;
    soruEkrani.hidden = false;

    seciliKonuAlani.hidden = false;
    konuRozet.textContent = aktifKonu.slice(0, 3).toUpperCase();
    konuAd.textContent = aktifKonu;

    soruYukle();
  });
});

function soruYukle() {
  const oAnki = aktifSorular[soruIndex];
  secilenSik = null;
  kontrolEdildi = false;
  uyari.textContent = "";
  gonderBtn.textContent = "Submit Answer";

  soruSira.textContent = `Question ${soruIndex + 1} of ${aktifSorular.length}`;
  soruMetni.textContent = oAnki.soru;
  ilerlemeDolgu.style.width = `${((soruIndex + 1) / aktifSorular.length) * 100}%`;

  siklarAlani.innerHTML = "";

  oAnki.siklar.forEach(function (metin, i) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "kart-btn";

    const harfSpan = document.createElement("span");
    harfSpan.className = "sik-harf";
    harfSpan.textContent = harfler[i];

    const yaziSpan = document.createElement("span");
    yaziSpan.textContent = metin;

    btn.appendChild(harfSpan);
    btn.appendChild(yaziSpan);

    btn.addEventListener("click", function () {
      if (kontrolEdildi) return;
      secilenSik = i;
      uyari.textContent = "";

      const tumSiklar = siklarAlani.querySelectorAll(".kart-btn");
      tumSiklar.forEach(function (item, idx) {
        item.classList.toggle("secili", idx === i);
      });
    });

    siklarAlani.appendChild(btn);
  });
}

gonderBtn.addEventListener("click", function () {
  if (!kontrolEdildi) {
    if (secilenSik === null) {
      uyari.textContent = "Please select an answer";
      return;
    }

    kontrolEdildi = true;
    const dogruIndex = aktifSorular[soruIndex].dogru;
    const tumSiklar = siklarAlani.querySelectorAll(".kart-btn");

    tumSiklar.forEach(function (item, i) {
      item.disabled = true;
      item.classList.remove("secili");
      if (i === dogruIndex) {
        item.classList.add("dogru");
      }
      if (i === secilenSik && secilenSik !== dogruIndex) {
        item.classList.add("yanlis");
      }
    });

    if (secilenSik === dogruIndex) {
      puan++;
    }

    gonderBtn.textContent = soruIndex === aktifSorular.length - 1 ? "See Result" : "Next Question";
    return;
  }

  soruIndex++;
  if (soruIndex < aktifSorular.length) {
    soruYukle();
  } else {
    sonucAc();
  }
});

function sonucAc() {
  soruEkrani.hidden = true;
  sonucEkrani.hidden = false;

  sonucRozet.textContent = aktifKonu.slice(0, 3).toUpperCase();
  sonucAd.textContent = aktifKonu;
  puanSayi.textContent = puan;
  puanToplam.textContent = `out of ${aktifSorular.length}`;
}

tekrarBtn.addEventListener("click", function () {
  sonucEkrani.hidden = true;
  soruEkrani.hidden = true;
  seciliKonuAlani.hidden = true;
  girisEkrani.hidden = false;

  aktifKonu = "";
  aktifSorular = [];
  soruIndex = 0;
  puan = 0;
  secilenSik = null;
  kontrolEdildi = false;
});