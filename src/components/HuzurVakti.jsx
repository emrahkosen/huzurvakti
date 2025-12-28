import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  BookOpen, Heart, ChevronLeft, ChevronRight, 
  Sun, RotateCw, Search, ArrowLeft, 
  X, Library, Play, Pause, 
  Moon, CheckCircle2, 
  Compass, Book, Home, Trash2,
  RotateCcw, ScrollText, Share2,
  Bell, BellOff, Volume2, Edit, Plus, Save, MapPin,
  Loader2, Grid, List, Settings, Speaker, Vibrate,
  MoreHorizontal, Smartphone, Check
} from 'lucide-react';
import HADISLER from '../data/Hadis';

// --- DATA: TÜM İLLER (81 İL) ---
const CITIES = [
  { name: "Adana", lat: 37.0000, lng: 35.3213 }, { name: "Adıyaman", lat: 37.7648, lng: 38.2786 },
  { name: "Afyonkarahisar", lat: 38.7507, lng: 30.5567 }, { name: "Ağrı", lat: 39.7191, lng: 43.0503 },
  { name: "Aksaray", lat: 38.3687, lng: 34.0370 }, { name: "Amasya", lat: 40.6501, lng: 35.8360 },
  { name: "Ankara", lat: 39.9334, lng: 32.8597 }, { name: "Antalya", lat: 36.8969, lng: 30.7133 },
  { name: "Ardahan", lat: 41.1105, lng: 42.7022 }, { name: "Artvin", lat: 41.1828, lng: 41.8183 },
  { name: "Aydın", lat: 37.8560, lng: 27.8416 }, { name: "Balıkesir", lat: 39.6484, lng: 27.8826 },
  { name: "Bartın", lat: 41.6344, lng: 32.3375 }, { name: "Batman", lat: 37.8812, lng: 41.1291 },
  { name: "Bayburt", lat: 40.2552, lng: 40.2249 }, { name: "Bilecik", lat: 40.1451, lng: 29.9799 },
  { name: "Bingöl", lat: 38.8854, lng: 40.4983 }, { name: "Bitlis", lat: 38.4006, lng: 42.1095 },
  { name: "Bolu", lat: 40.7350, lng: 31.6061 }, { name: "Burdur", lat: 37.7204, lng: 30.2908 },
  { name: "Bursa", lat: 40.1885, lng: 29.0610 }, { name: "Çanakkale", lat: 40.1553, lng: 26.4142 },
  { name: "Çankırı", lat: 40.6013, lng: 33.6134 }, { name: "Çorum", lat: 40.5506, lng: 34.9556 },
  { name: "Denizli", lat: 37.7765, lng: 29.0864 }, { name: "Diyarbakır", lat: 37.9144, lng: 40.2306 },
  { name: "Düzce", lat: 40.8438, lng: 31.1565 }, { name: "Edirne", lat: 41.6768, lng: 26.5603 },
  { name: "Elazığ", lat: 38.6810, lng: 39.2264 }, { name: "Erzincan", lat: 39.7500, lng: 39.5000 },
  { name: "Erzurum", lat: 39.9000, lng: 41.2700 }, { name: "Eskişehir", lat: 39.7767, lng: 30.5206 },
  { name: "Gaziantep", lat: 37.0662, lng: 37.3833 }, { name: "Giresun", lat: 40.9128, lng: 38.3895 },
  { name: "Gümüşhane", lat: 40.4600, lng: 39.4700 }, { name: "Hakkari", lat: 37.5833, lng: 43.7333 },
  { name: "Hatay", lat: 36.4018, lng: 36.3498 }, { name: "Iğdır", lat: 39.9167, lng: 44.0333 },
  { name: "Isparta", lat: 37.7648, lng: 30.5566 }, { name: "İstanbul", lat: 41.0082, lng: 28.9784 },
  { name: "İzmir", lat: 38.4192, lng: 27.1287 }, { name: "Kahramanmaraş", lat: 37.5858, lng: 36.9371 },
  { name: "Karabük", lat: 41.2061, lng: 32.6204 }, { name: "Karaman", lat: 37.1759, lng: 33.2287 },
  { name: "Kars", lat: 40.6167, lng: 43.1000 }, { name: "Kastamonu", lat: 41.3887, lng: 33.7827 },
  { name: "Kayseri", lat: 38.7312, lng: 35.4787 }, { name: "Kilis", lat: 36.7184, lng: 37.1212 },
  { name: "Kırıkkale", lat: 39.8468, lng: 33.5153 }, { name: "Kırklareli", lat: 41.7333, lng: 27.2167 },
  { name: "Kırşehir", lat: 39.1425, lng: 34.1709 }, { name: "Kocaeli", lat: 40.8533, lng: 29.8815 },
  { name: "Konya", lat: 37.8667, lng: 32.4833 }, { name: "Kütahya", lat: 39.4167, lng: 29.9833 },
  { name: "Malatya", lat: 38.3552, lng: 38.3095 }, { name: "Manisa", lat: 38.6191, lng: 27.4289 },
  { name: "Mardin", lat: 37.3212, lng: 40.7245 }, { name: "Mersin", lat: 36.8000, lng: 34.6333 },
  { name: "Muğla", lat: 37.2153, lng: 28.3636 }, { name: "Muş", lat: 38.9462, lng: 41.7539 },
  { name: "Nevşehir", lat: 38.6939, lng: 34.6857 }, { name: "Niğde", lat: 37.9667, lng: 34.6833 },
  { name: "Ordu", lat: 40.9839, lng: 37.8764 }, { name: "Osmaniye", lat: 37.0742, lng: 36.2472 },
  { name: "Rize", lat: 41.0201, lng: 40.5234 }, { name: "Sakarya", lat: 40.7569, lng: 30.3783 },
  { name: "Samsun", lat: 41.2928, lng: 36.3313 }, { name: "Siirt", lat: 37.9333, lng: 41.9500 },
  { name: "Sinop", lat: 42.0231, lng: 35.1531 }, { name: "Sivas", lat: 39.7477, lng: 37.0179 },
  { name: "Şanlıurfa", lat: 37.1591, lng: 38.7969 }, { name: "Şırnak", lat: 37.5164, lng: 42.4611 },
  { name: "Tekirdağ", lat: 40.9833, lng: 27.5167 }, { name: "Tokat", lat: 40.3167, lng: 36.5500 },
  { name: "Trabzon", lat: 41.0015, lng: 39.7178 }, { name: "Tunceli", lat: 39.1079, lng: 39.5401 },
  { name: "Uşak", lat: 38.6823, lng: 29.4082 }, { name: "Van", lat: 38.4891, lng: 43.4089 },
  { name: "Yalova", lat: 40.6500, lng: 29.2667 }, { name: "Yozgat", lat: 39.8181, lng: 34.8147 },
  { name: "Zonguldak", lat: 41.4564, lng: 31.7987 }
];

// --- DATA: ESMA-ÜL HÜSNA ---
const ESMA_UL_HUSNA = [
  { id: 'e1', arabic: 'الله', name: 'Allah', meaning: 'Eşi ve benzeri olmayan, bütün noksan sıfatlardan münezzeh tek ilah.', target: 66 },
  { id: 'e2', arabic: 'الرَّحْمَن', name: 'Er-Rahmân', meaning: 'Dünyada bütün mahlûkata merhamet eden.', target: 298 },
  { id: 'e3', arabic: 'الرَّحِيم', name: 'Er-Rahîm', meaning: 'Ahirette sadece müminlere merhamet eden.', target: 258 },
  { id: 'e4', arabic: 'الْمَلِك', name: 'El-Melik', meaning: 'Mülkün sahibi.', target: 90 },
  { id: 'e5', arabic: 'الْقُدُّوس', name: 'El-Kuddûs', meaning: 'Her noksanlıktan uzak.', target: 170 },
  { id: 'e6', arabic: 'السَّلام', name: 'Es-Selâm', meaning: 'Her türlü tehlikeden selamete çıkaran.', target: 131 },
  { id: 'e7', arabic: 'الْمُؤْمِن', name: 'El-Mü’min', meaning: 'Güven veren, emin kılan.', target: 137 },
  { id: 'e8', arabic: 'الْمُهَيْمِن', name: 'El-Müheymin', meaning: 'Her şeyi görüp gözeten.', target: 145 },
  { id: 'e9', arabic: 'الْعَزِيز', name: 'El-Azîz', meaning: 'İzzet sahibi, her şeye galip olan.', target: 94 },
  { id: 'e10', arabic: 'الْجَبَّار', name: 'El-Cebbâr', meaning: 'Azamet ve kudret sahibi.', target: 206 },
  { id: 'e11', arabic: 'الْمُتَكَبِّر', name: 'El-Mütekebbir', meaning: 'Büyüklükte eşi olmayan.', target: 662 },
  { id: 'e12', arabic: 'الْخَالِق', name: 'El-Hâlık', meaning: 'Yaratan.', target: 731 },
  // ... diğerleri (listenin tamamı eklenebilir ama dosya boyutu için örnekler yeterli)
];

const PRESET_TESBIHAT = [
  { id: 't1', label: "Sübhanallah", target: 33, meaning: "Allah noksan sıfatlardan münezzehtir", arabic: "سُبْحَانَ الله" },
  { id: 't2', label: "Elhamdülillah", target: 33, meaning: "Hamd Allah'a mahsustur", arabic: "الْحَمْدُ لِلَّهِ" },
  { id: 't3', label: "Allahu Ekber", target: 33, meaning: "Allah en büyüktür", arabic: "اَللّٰهُ أَكْبَر" },
  { id: 't4', label: "Lâ ilâhe illallah", target: 100, meaning: "Allah'tan başka ilah yoktur", arabic: "لَا إِلَهَ إِلَّا اللهُ" },
  { id: 't5', label: "Estağfirullah", target: 100, meaning: "Allah'tan bağışlanma dilerim", arabic: "أَسْتَغْفِرُ اللّٰهَ" },
  { id: 't6', label: "Salavat-ı Şerife", target: 100, meaning: "Hz. Muhammed'e salat ve selam olsun", arabic: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ" }
];

const HADITH_LIBRARY = HADISLER;

const SURAH_NAMES_TR = [
  "Fâtiha", "Bakara", "Âl-i İmrân", "Nisâ", "Mâide", "En'âm", "A'râf", "Enfâl", "Tevbe", "Yûnus",
  "Hûd", "Yûsuf", "Ra'd", "İbrâhîm", "Hicr", "Nahl", "İsrâ", "Kehf", "Meryem", "Tâhâ", "Enbiyâ", "Hac",
  "Mü'minûn", "Nûr", "Furkân", "Şu'arâ", "Neml", "Kasas", "Ankebût", "Rûm", "Lokmân", "Secde", "Ahzâb",
  "Sebe'", "Fâtır", "Yâsîn", "Sâffât", "Sâd", "Zümer", "Mü'min", "Fussilet", "Şûrâ", "Zuhruf", "Duhân",
  "Câsiye", "Ahkâf", "Muhammed", "Fetih", "Hucurât", "Kâf", "Zâriyât", "Tûr", "Necm", "Kamer", "Rahmân",
  "Vâkıa", "Hadîd", "Mücâdele", "Haşr", "Mümtehine", "Saf", "Cuma", "Münâfikûn", "Teğâbûn", "Talâk",
  "Tahrîm", "Mülk", "Kalem", "Hâkka", "Meâric", "Nûh", "Cin", "Müzzemmil", "Müddessir", "Kıyâme", "İnsân",
  "Mürselât", "Nebe'", "Nâziât", "Abese", "Tekvîr", "İnfitâr", "Mutaffifîn", "İnşikâk", "Burûc", "Târık",
  "A'lâ", "Gâşiye", "Fecr", "Beled", "Şems", "Leyl", "Duhâ", "İnşirah", "Tîn", "Alak", "Kadir", "Beyyine",
  "Zilzâl", "Âdiyât", "Kâria", "Tekâsür", "Asr", "Hümeze", "Fîl", "Kureyş", "Mâûn", "Kevser", "Kâfirûn",
  "Nasr", "Tebbet", "İhlâs", "Felak", "Nâs"
];

const ALARM_SOUND_URL = "https://assets.mixkit.co/active_storage/sfx/933/933-preview.mp3";
const CLICK_SOUND_URL = "https://assets.mixkit.co/active_storage/sfx/2578/2578-preview.mp3"; 

export default function HuzurVakti() {
  const [activeTab, setActiveTab] = useState('home');
  const [darkMode, setDarkMode] = useState(false);
  const [showToast, setShowToast] = useState({ show: false, msg: '' });
  const [favorites, setFavorites] = useState([]);
  const [showFavModal, setShowFavModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);

  // Vakitler & Alarm & Sehir
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [nextPrayer, setNextPrayer] = useState(null);
  const [timeLeftStr, setTimeLeftStr] = useState('--:--:--');
  const [alarms, setAlarms] = useState({ Fajr: true, Sunrise: false, Dhuhr: true, Asr: true, Maghrib: true, Isha: true });
  const [isAlarmPlaying, setIsAlarmPlaying] = useState(false);
  const [lastAlarmTime, setLastAlarmTime] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [showCityModal, setShowCityModal] = useState(false);
  const [citySearch, setCitySearch] = useState('');
  const [locationLoading, setLocationLoading] = useState(false);

  // --- TESBIHAT STATE ---
  const [tesbihTab, setTesbihTab] = useState('library'); 
  const [libraryTab, setLibraryTab] = useState('presets'); 
  const [activeDhikr, setActiveDhikr] = useState(null); 
  const [dhikrCount, setDhikrCount] = useState(0);
  const [isVibrationOn, setIsVibrationOn] = useState(true);
  const [isSoundOn, setIsSoundOn] = useState(false);
  const [searchDhikr, setSearchDhikr] = useState('');
  const clickAudioRef = useRef(null);
  
  // Quran
  const [surahList, setSurahList] = useState([]);
  const [selectedSurah, setSelectedSurah] = useState(null);
  const [quranData, setQuranData] = useState([]);
  const [activeAyahIndex, setActiveAyahIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  // Hadith
  const [selectedBook, setSelectedBook] = useState(null);
  const [dailyHadith, setDailyHadith] = useState(null);

  // Compass
  const [qiblaAngle, setQiblaAngle] = useState(0);
  const [deviceHeading, setDeviceHeading] = useState(0);
  const [manualCompass, setManualCompass] = useState(false);

  // Refs
  const audioRef = useRef(null);
  const alarmAudioRef = useRef(null);
  const activeAyahRef = useRef(null);

  // --- INIT & UTILS ---
  const showNotification = (msg) => { setShowToast({ show: true, msg }); setTimeout(() => setShowToast({ show: false, msg: '' }), 2000); };
  
  const calculateQibla = (lat, lng) => {
      const mLat = 21.4225, mLng = 39.8262;
      const y = Math.sin((mLng-lng) * Math.PI/180) * Math.cos(mLat * Math.PI/180);
      const x = Math.cos(lat*Math.PI/180)*Math.sin(mLat*Math.PI/180) - Math.sin(lat*Math.PI/180)*Math.cos(mLat*Math.PI/180)*Math.cos((mLng-lng)*Math.PI/180);
      return (Math.atan2(y, x) * 180 / Math.PI + 360) % 360;
  };

  useEffect(() => {
    // Load Defaults
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') setDarkMode(true);
    const savedFavs = localStorage.getItem('favorites');
    if (savedFavs) setFavorites(JSON.parse(savedFavs));
    
    // City & Prayer
    const savedCity = localStorage.getItem('selectedCity');
    if (savedCity) {
      const city = JSON.parse(savedCity);
      setSelectedCity(city);
      fetchPrayerTimes(city.lat, city.lng);
      setQiblaAngle(calculateQibla(city.lat, city.lng));
    } else {
      getUserLocation();
    }
    
    // Sounds
    alarmAudioRef.current = new Audio(ALARM_SOUND_URL);
    alarmAudioRef.current.loop = true;
    clickAudioRef.current = new Audio(CLICK_SOUND_URL);

    // Default Dhikr Load (Free Mode)
    setActiveDhikr({ label: "Serbest Zikir", target: 99999, meaning: "İstediğiniz zikri çekebilirsiniz", arabic: "ذِكْر" });

    // Prepare Surah List
    prepareSurahList();

    // Daily Hadith
    const allHadiths = HADITH_LIBRARY.flatMap(book => book.hadiths.map(h => ({...h, source: book.title})));
    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    setDailyHadith(allHadiths[dayOfYear % allHadiths.length]);

  }, []);

  useEffect(() => {
    document.documentElement.className = darkMode ? 'dark' : 'light';
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    if (audioRef.current) {
        if (isPlaying) { audioRef.current.play().catch(e => { console.log(e); setIsPlaying(false); }); } 
        else { audioRef.current.pause(); }
    }
    if (isPlaying && activeAyahRef.current) {
        activeAyahRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [isPlaying, activeAyahIndex]);

  // Prayer Logic
  const calculateNextPrayer = useCallback((timings) => {
      const now = new Date(); const curr = now.getHours() * 60 + now.getMinutes();
      const prayers = [ {n:'İmsak',t:timings.Fajr}, {n:'Güneş',t:timings.Sunrise}, {n:'Öğle',t:timings.Dhuhr}, {n:'İkindi',t:timings.Asr}, {n:'Akşam',t:timings.Maghrib}, {n:'Yatsı',t:timings.Isha} ];
      let next = null, minDiff = 9999;
      for(let p of prayers) {
          const [h, m] = p.t.split(':').map(Number);
          const diff = (h*60+m) - curr + ((h*60+m) - curr < 0 ? 1440 : 0);
          if(diff < minDiff) { minDiff = diff; next = p; }
      }
      setNextPrayer(next);
      const rh = Math.floor(minDiff / 60), rm = minDiff % 60, rs = 59 - now.getSeconds();
      setTimeLeftStr(`${rh}:${rm<10?'0'+rm:rm}:${rs<10?'0'+rs:rs}`);
  }, []);

  const fetchPrayerTimes = useCallback(async (lat, lng) => {
      try {
        const d = new Date(); const dateStr = `${d.getDate()}-${d.getMonth()+1}-${d.getFullYear()}`;
        const res = await fetch(`https://api.aladhan.com/v1/timings/${dateStr}?latitude=${lat}&longitude=${lng}&method=13`);
        const data = await res.json();
        setPrayerTimes(data.data.timings); calculateNextPrayer(data.data.timings);
      } catch (e) {}
  }, [calculateNextPrayer]);

  const getUserLocation = useCallback(() => {
    setLocationLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
           const { latitude, longitude } = pos.coords;
           setSelectedCity({name: "Konum", lat: latitude, lng: longitude});
           localStorage.setItem('selectedCity', JSON.stringify({name: "Konum", lat: latitude, lng: longitude}));
           fetchPrayerTimes(latitude, longitude);
           setQiblaAngle(calculateQibla(latitude, longitude));
           setLocationLoading(false);
           setShowCityModal(false);
        },
        (err) => { 
            const istanbul = CITIES.find(c => c.name === "İstanbul");
            setSelectedCity(istanbul);
            fetchPrayerTimes(istanbul.lat, istanbul.lng);
            setQiblaAngle(calculateQibla(istanbul.lat, istanbul.lng));
            setLocationLoading(false);
        }
      );
    }
  }, [fetchPrayerTimes]);

  useEffect(() => {
    if(prayerTimes) {
        const t = setInterval(() => { calculateNextPrayer(prayerTimes); }, 1000);
        return () => clearInterval(t);
    }
  }, [prayerTimes, calculateNextPrayer]);

  // --- QURAN FUNCTIONS ---
  const prepareSurahList = async () => {
    try {
      const res = await fetch('https://api.alquran.cloud/v1/surah'); const data = await res.json();
      setSurahList(data.data.map((item, i) => ({ ...item, nameTR: SURAH_NAMES_TR[i] })));
    } catch { setSurahList(SURAH_NAMES_TR.map((n, i) => ({ number: i+1, nameTR: n, numberOfAyahs: 0 }))); }
  };
  
  const openSurah = async (number, nameTR) => {
      setLoading(true);
      try {
          const audioReq = fetch(`https://api.alquran.cloud/v1/surah/${number}/editions/ar.alafasy`);
          const textReq = fetch(`https://api.acikkuran.com/surah/${number}`);
          const [audioRes, textRes] = await Promise.all([audioReq, textReq]);
          const audioData = await audioRes.json(); const textData = await textRes.json();
          const verses = textData.data.verses.map((verse, index) => {
              const audioUrl = audioData.data && audioData.data[0].ayahs[index] ? audioData.data[0].ayahs[index].audio : null;
              return { number: verse.verse_number, textAr: verse.verse, textTr: verse.translation.text, textLat: verse.transcription, audio: audioUrl };
          });
          setQuranData(verses); setSelectedSurah({ number, name: nameTR }); setActiveAyahIndex(0); setIsPlaying(false); setActiveTab('read');
      } catch (err) { showNotification("Veriler alınamadı."); }
      setLoading(false);
  };

  const toggleFavorite = (item) => {
      let newFavs;
      const itemId = item.type === 'hadith' ? item.id : `ayah-${selectedSurah.number}-${item.number}`;
      const favItem = item.type === 'hadith' ? { ...item, uniqueId: itemId } : { type: 'ayah', uniqueId: itemId, textTr: item.textTr, textAr: item.textAr, textLat: item.textLat, surahName: selectedSurah.name, number: item.number };
      const exists = favorites.find(f => f.uniqueId === itemId);
      if (exists) {
          newFavs = favorites.filter(f => f.uniqueId !== itemId);
          showNotification("Çıkarıldı");
      } else {
          newFavs = [favItem, ...favorites];
          showNotification("Eklendi");
      }
      setFavorites(newFavs); localStorage.setItem('favorites', JSON.stringify(newFavs));
  };

  const isFavorite = (item) => {
      const itemId = item.type === 'hadith' ? item.id : `ayah-${selectedSurah?.number}-${item.number}`;
      return favorites.some(f => f.uniqueId === itemId);
  };

  // --- TESBIHAT FUNCTIONS ---
  
  const handleDhikrClick = () => {
      const next = dhikrCount + 1;
      setDhikrCount(next);
      
      // Feedback
      if (isVibrationOn && navigator.vibrate) navigator.vibrate(15);
      if (isSoundOn && clickAudioRef.current) {
          clickAudioRef.current.currentTime = 0;
          clickAudioRef.current.play().catch(e => {});
      }

      // Target check
      if (activeDhikr.target !== 99999 && next % activeDhikr.target === 0) {
          if (isVibrationOn && navigator.vibrate) navigator.vibrate([100, 50, 100]);
          showNotification(`${activeDhikr.label} tamamlandı!`);
      }
  };

  const startDhikr = (dhikr) => {
      setActiveDhikr(dhikr);
      setDhikrCount(0);
      setTesbihTab('counter');
  };

  const resetDhikr = () => {
      setShowResetModal(true);
  };

  const confirmReset = () => {
      setDhikrCount(0);
      setShowResetModal(false);
      showNotification("Sıfırlandı");
  };

  const calculateProgress = () => {
      if (!activeDhikr || activeDhikr.target === 99999) return 0;
      const progress = (dhikrCount % activeDhikr.target) / activeDhikr.target;
      return progress * 100; // Percentage
  };

  const getCircleOffset = (r, percent) => {
      const circ = 2 * Math.PI * r;
      return circ - (percent / 100) * circ;
  };

  // --- RENDER HELPERS ---
  
  const renderCompass = () => {
      return (
          <div className="h-[calc(100vh-8rem)] flex flex-col items-center justify-center animate-in fade-in duration-300">
               <div 
                    className="w-64 h-64 rounded-full border-4 border-slate-200 dark:border-slate-800 relative bg-white dark:bg-slate-900 shadow-2xl flex items-center justify-center transition-transform duration-200"
                    style={{ transform: `rotate(${-deviceHeading}deg)` }}
                >
                   <div className="absolute top-2 font-bold text-red-500 text-lg">K</div>
                   <div className="absolute inset-0 flex justify-center transition-transform duration-500" style={{ transform: `rotate(${qiblaAngle}deg)` }}>
                        <div className="w-1.5 h-24 bg-emerald-500 rounded-full mt-5 shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
                   </div>
                   <div className="absolute inset-0 rounded-full border border-slate-100 dark:border-slate-800 m-8"></div>
               </div>
               <div className="text-center mt-10">
                   <p className="text-5xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">{Math.round(qiblaAngle)}°</p>
                   <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Kıble Açısı</p>
               </div>
           </div>
      );
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 z-50 flex justify-between items-center px-4 max-w-md mx-auto shadow-sm">
          <div className="flex items-center gap-2">
             <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-600 to-teal-600 text-white flex items-center justify-center shadow-md">
                 <MapPin size={16}/>
             </div>
             <div className="flex flex-col leading-tight">
                 <span className="font-bold text-sm text-slate-900 dark:text-white">Huzur Vakti</span>
             </div>
          </div>
          <div className="flex items-center gap-2">
             {selectedSurah && activeTab === 'read' && (
                 <div className="hidden sm:flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/30 px-3 py-1 rounded-full">
                     <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">{selectedSurah.name} {activeAyahIndex + 1}</span>
                     <button onClick={() => setIsPlaying(!isPlaying)} className="bg-emerald-600 text-white p-1 rounded-full hover:bg-emerald-700 transition">
                        {isPlaying ? <Pause size={12}/> : <Play size={12}/>}
                     </button>
                 </div>
             )}
             <button onClick={() => setShowFavModal(true)} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition"><Heart size={20}/></button>
             <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition">{darkMode ? <Sun size={20}/> : <Moon size={20}/>}</button>
          </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-md mx-auto pt-20 pb-24 px-4 min-h-screen">
          
          {/* --- HOME TAB --- */}
          {activeTab === 'home' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  
                  {/* Compact Location Bar */}
                  <div 
                    onClick={() => setShowCityModal(true)}
                    className="flex items-center justify-between bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 rounded-xl shadow-sm cursor-pointer hover:border-emerald-500 transition mb-4"
                  >
                      <div className="flex items-center gap-3">
                          <div className="bg-emerald-100 dark:bg-emerald-900/30 p-2 rounded-full text-emerald-600">
                             <MapPin size={18} />
                          </div>
                          <div>
                             <p className="text-[10px] font-bold text-slate-400 uppercase">MEVCUT KONUM</p>
                             <p className="font-bold text-slate-800 dark:text-slate-100">{selectedCity ? selectedCity.name : "Seçiniz"}</p>
                          </div>
                      </div>
                      <ChevronRight size={18} className="text-slate-300" />
                  </div>

                  <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-6 shadow-lg flex justify-between items-center relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 blur-2xl"></div>
                      <div className="relative z-10">
                          <p className="text-xs font-bold opacity-70 mb-1 uppercase tracking-wider">Sonraki Vakit</p>
                          <h2 className="text-4xl font-bold tracking-tight">{nextPrayer?.n || '...'}</h2>
                      </div>
                      <div className="relative z-10 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-2xl border border-white/10 text-center min-w-[100px]">
                          <span className="text-2xl font-mono font-bold block">{timeLeftStr}</span>
                          <span className="text-[10px] uppercase opacity-60">Kalan Süre</span>
                      </div>
                  </div>
                  
                  {prayerTimes && (
                      <div className="grid grid-cols-3 gap-2">
                          {['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'].map((key, i) => { 
                              const names = ['İmsak', 'Güneş', 'Öğle', 'İkindi', 'Akşam', 'Yatsı'];
                              const isNext = nextPrayer?.n === names[i]; 
                              return (
                                  <div key={key} className={`bg-white dark:bg-slate-900 border rounded-xl p-3 flex flex-col items-center justify-center shadow-sm transition-all ${isNext ? 'border-emerald-500 ring-1 ring-emerald-500 bg-emerald-50 dark:bg-emerald-900/10' : 'border-slate-200 dark:border-slate-800'}`}>
                                      <p className="text-xs font-bold text-slate-500 uppercase">{names[i]}</p>
                                      <p className="font-bold text-lg my-1">{prayerTimes[key].split(' ')[0]}</p>
                                  </div>
                              )
                          })}
                      </div>
                  )}

                  {/* Daily Hadith Card */}
                  {dailyHadith && (
                      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 border-l-4 border-l-emerald-500 rounded-2xl p-4 shadow-sm">
                          <div className="flex items-center gap-2 mb-2 text-emerald-600 dark:text-emerald-400">
                              <ScrollText size={16}/>
                              <span className="text-xs font-bold uppercase">GÜNÜN HADİSİ</span>
                          </div>
                          <p className="text-lg italic font-serif leading-relaxed text-slate-700 dark:text-slate-300">"{dailyHadith.text}"</p>
                          <div className="flex justify-between items-center mt-4">
                              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded">{dailyHadith.source}</span>
                              <div className="flex gap-2">
                                  <button onClick={() => toggleFavorite({...dailyHadith, type: 'hadith'})} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition text-slate-400 hover:text-red-500">
                                      <Heart size={18} fill={isFavorite({...dailyHadith, type:'hadith'}) ? 'currentColor' : 'none'} className={isFavorite({...dailyHadith, type:'hadith'}) ? 'text-red-500' : ''}/>
                                  </button>
                                  <button onClick={() => navigator.clipboard.writeText(dailyHadith.text)} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition text-slate-400">
                                      <Share2 size={18}/>
                                  </button>
                              </div>
                          </div>
                      </div>
                  )}

                  {/* Quick Access Tesbihat */}
                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
                      <div className="flex justify-between items-center mb-3">
                          <h3 className="font-bold text-slate-700 dark:text-slate-200">Günlük Tesbihat</h3>
                          <button onClick={() => setActiveTab('tesbih')} className="text-xs font-bold text-emerald-600 dark:text-emerald-400">TÜMÜ</button>
                      </div>
                      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                          {PRESET_TESBIHAT.slice(0, 4).map(t => (
                              <button key={t.id} onClick={() => {startDhikr(t); setActiveTab('tesbih');}} className="flex-shrink-0 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl p-3 w-32 flex flex-col items-center gap-1 active:scale-95 transition">
                                  <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xs">{t.target}</div>
                                  <span className="text-xs font-bold truncate w-full text-center">{t.label}</span>
                              </button>
                          ))}
                      </div>
                  </div>
              </div>
          )}

          {/* --- TESBIHAT TAB --- */}
          {activeTab === 'tesbih' && (
              <div className="animate-in fade-in duration-300 h-[calc(100vh-8rem)] flex flex-col">
                  {/* Top Toggle Switch */}
                  <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl mb-4 shrink-0">
                      <button 
                        onClick={() => setTesbihTab('library')}
                        className={`flex-1 py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${tesbihTab === 'library' ? 'bg-white dark:bg-slate-700 shadow-sm text-emerald-600 dark:text-emerald-400' : 'text-slate-500'}`}
                      >
                          <Library size={16} /> Kütüphane
                      </button>
                      <button 
                        onClick={() => setTesbihTab('counter')}
                        className={`flex-1 py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${tesbihTab === 'counter' ? 'bg-white dark:bg-slate-700 shadow-sm text-emerald-600 dark:text-emerald-400' : 'text-slate-500'}`}
                      >
                          <Smartphone size={16} /> Zikirmatik
                      </button>
                  </div>

                  {/* LIBRARY VIEW */}
                  {tesbihTab === 'library' && (
                      <div className="flex flex-col h-full overflow-hidden">
                          {/* Search & Filter */}
                          <div className="mb-4 space-y-3 shrink-0">
                              <div className="relative">
                                  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>
                                  <input 
                                    type="text" 
                                    placeholder="Tesbih veya Esma ara..." 
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                    value={searchDhikr}
                                    onChange={(e) => setSearchDhikr(e.target.value)}
                                  />
                              </div>
                              <div className="flex gap-2">
                                  <button onClick={() => setLibraryTab('presets')} className={`px-4 py-1.5 rounded-full text-xs font-bold border transition ${libraryTab === 'presets' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-transparent border-slate-300 dark:border-slate-700 text-slate-500'}`}>Hazır Tesbihat</button>
                                  <button onClick={() => setLibraryTab('esma')} className={`px-4 py-1.5 rounded-full text-xs font-bold border transition ${libraryTab === 'esma' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-transparent border-slate-300 dark:border-slate-700 text-slate-500'}`}>Esma-ül Hüsna</button>
                              </div>
                          </div>

                          {/* Content List */}
                          <div className="overflow-y-auto flex-1 space-y-3 pb-4">
                              {/* Create New / Free Mode */}
                              <div 
                                onClick={() => startDhikr({ label: "Serbest Zikir", target: 99999, meaning: "İstediğin kadar zikir çek", arabic: "ذكر" })}
                                className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl p-4 flex items-center gap-4 cursor-pointer shadow-md active:scale-[0.98] transition"
                              >
                                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"><Plus size={24} /></div>
                                  <div>
                                      <h3 className="font-bold">Serbest Zikir Başlat</h3>
                                      <p className="text-xs opacity-90">Hedef olmadan zikir çek</p>
                                  </div>
                              </div>

                              {libraryTab === 'presets' && PRESET_TESBIHAT.filter(t => t.label.toLowerCase().includes(searchDhikr.toLowerCase())).map(t => (
                                  <div key={t.id} onClick={() => startDhikr(t)} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex justify-between items-center cursor-pointer hover:border-emerald-500 transition active:scale-[0.98]">
                                      <div className="flex-1">
                                          <div className="flex items-center gap-2 mb-1">
                                            <h4 className="font-bold text-slate-800 dark:text-slate-200">{t.label}</h4>
                                            <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-500">Hedef: {t.target}</span>
                                          </div>
                                          <p className="text-xs text-slate-500 truncate">{t.meaning}</p>
                                      </div>
                                      <ChevronRight size={18} className="text-slate-300"/>
                                  </div>
                              ))}

                              {libraryTab === 'esma' && ESMA_UL_HUSNA.filter(e => e.name.toLowerCase().includes(searchDhikr.toLowerCase()) || e.meaning.toLowerCase().includes(searchDhikr.toLowerCase())).map((esma, idx) => (
                                  <div key={esma.id} onClick={() => startDhikr(esma)} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex items-center gap-4 cursor-pointer hover:border-emerald-500 transition active:scale-[0.98]">
                                      <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center font-bold text-emerald-600 dark:text-emerald-400 text-sm">{idx+1}</div>
                                      <div className="flex-1">
                                          <div className="flex justify-between items-start">
                                              <h4 className="font-bold text-slate-800 dark:text-slate-200">{esma.name}</h4>
                                              <span className="font-serif text-lg leading-none text-slate-400 ml-2">{esma.arabic}</span>
                                          </div>
                                          <p className="text-xs text-slate-500 line-clamp-1">{esma.meaning}</p>
                                          <span className="text-[10px] text-emerald-600 dark:text-emerald-500 font-bold mt-1 block">Ebced Değeri: {esma.target}</span>
                                      </div>
                                  </div>
                              ))}
                          </div>
                      </div>
                  )}

                  {/* COUNTER VIEW */}
                  {tesbihTab === 'counter' && activeDhikr && (
                      <div className="flex flex-col h-full animate-in zoom-in-95 duration-300">
                          {/* Top Info */}
                          <div className="text-center mb-4 relative">
                              <h2 className="text-2xl font-bold text-slate-800 dark:text-white">{activeDhikr.label}</h2>
                              <p className="text-2xl font-serif text-slate-500 my-1">{activeDhikr.arabic}</p>
                              <p className="text-xs text-slate-400 px-8 truncate">{activeDhikr.meaning}</p>
                              
                              <div className="absolute top-0 right-0 flex flex-col gap-2">
                                  <button onClick={() => setIsSoundOn(!isSoundOn)} className={`p-2 rounded-full transition ${isSoundOn ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400 dark:bg-slate-800'}`}>
                                      {isSoundOn ? <Volume2 size={16}/> : <Speaker size={16} className="opacity-50"/>}
                                  </button>
                                  <button onClick={() => setIsVibrationOn(!isVibrationOn)} className={`p-2 rounded-full transition ${isVibrationOn ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400 dark:bg-slate-800'}`}>
                                      {isVibrationOn ? <Vibrate size={16}/> : <Smartphone size={16} className="opacity-50"/>}
                                  </button>
                              </div>
                          </div>

                          {/* Main Button */}
                          <div className="flex-1 flex items-center justify-center relative">
                              {/* Progress Ring SVG */}
                              {activeDhikr.target !== 99999 && (
                                  <svg className="absolute w-72 h-72 transform -rotate-90 pointer-events-none" viewBox="0 0 100 100">
                                      <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" className="text-slate-100 dark:text-slate-800" strokeWidth="6" />
                                      <circle 
                                        cx="50" cy="50" r="45" fill="none" stroke="currentColor" className="text-emerald-500 transition-all duration-300 ease-out" strokeWidth="6"
                                        strokeDasharray={2 * Math.PI * 45}
                                        strokeDashoffset={getCircleOffset(45, calculateProgress())}
                                        strokeLinecap="round"
                                      />
                                  </svg>
                              )}

                              <button 
                                onClick={handleDhikrClick}
                                className="w-60 h-60 rounded-full bg-gradient-to-b from-emerald-500 to-emerald-700 text-white shadow-[0_10px_40px_rgba(16,185,129,0.4)] border-8 border-white dark:border-slate-900 flex flex-col items-center justify-center active:scale-95 transition-transform duration-100 z-10"
                              >
                                  <span className="text-6xl font-bold font-mono tracking-tighter">{dhikrCount}</span>
                                  {activeDhikr.target !== 99999 && (
                                      <span className="text-emerald-200 text-sm font-bold mt-2">/ {activeDhikr.target}</span>
                                  )}
                                  <span className="text-[10px] uppercase tracking-widest mt-4 opacity-80">DOKUN</span>
                              </button>
                          </div>

                          {/* Bottom Controls */}
                          <div className="flex justify-center gap-6 mt-6 pb-4">
                              <button onClick={resetDhikr} className="flex flex-col items-center gap-1 text-slate-400 hover:text-red-500 transition">
                                  <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center"><RotateCcw size={18}/></div>
                                  <span className="text-[10px] font-bold">SIFIRLA</span>
                              </button>
                              <button 
                                onClick={() => {
                                   if(navigator.share) navigator.share({title: "Zikir", text: `${activeDhikr.label} zikrim: ${dhikrCount}`});
                                   else showNotification("Paylaşım desteklenmiyor");
                                }} 
                                className="flex flex-col items-center gap-1 text-slate-400 hover:text-emerald-500 transition"
                              >
                                  <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center"><Share2 size={18}/></div>
                                  <span className="text-[10px] font-bold">PAYLAŞ</span>
                              </button>
                          </div>
                      </div>
                  )}
              </div>
          )}

          {/* --- QURAN TAB --- */}
          {activeTab === 'quran' && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="sticky top-16 bg-slate-50 dark:bg-slate-950 py-2 z-10 mb-2">
                      <div className="relative">
                          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>
                          <input 
                            type="text" 
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all shadow-sm"
                            placeholder="Sure Ara..." 
                            value={searchQuery} 
                            onChange={(e) => setSearchQuery(e.target.value)} 
                          />
                      </div>
                  </div>
                  {loading ? (
                    <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                        <Loader2 size={32} className="animate-spin mb-2" />
                        <span>Yükleniyor...</span>
                    </div>
                  ) : (
                      <div className="space-y-3 pb-4">
                          {surahList.filter(s => s.nameTR.toLowerCase().includes(searchQuery.toLowerCase())).map(s => (
                              <div 
                                key={s.number} 
                                onClick={() => openSurah(s.number, s.nameTR)} 
                                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex items-center gap-4 hover:shadow-md transition cursor-pointer active:scale-[0.98]"
                              >
                                  <div className="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-lg flex items-center justify-center font-bold text-emerald-600 dark:text-emerald-400 shadow-inner">
                                    {s.number}
                                  </div>
                                  <div className="flex-1">
                                    <h3 className="font-bold text-lg">{s.nameTR}</h3>
                                    <p className="text-xs text-slate-500">{s.numberOfAyahs} Ayet</p>
                                  </div>
                                  <ChevronRight size={20} className="text-slate-300"/>
                              </div>
                          ))}
                      </div>
                  )}
              </div>
          )}

          {/* --- READ MODE --- */}
          {activeTab === 'read' && selectedSurah && (
              <div className="animate-in fade-in duration-300">
                   <div className="flex justify-between items-center mb-4 sticky top-16 bg-slate-50 dark:bg-slate-950 py-2 z-10">
                        <button onClick={() => {setActiveTab('quran'); setIsPlaying(false)}} className="flex items-center text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 px-3 py-1.5 rounded-lg transition">
                            <ArrowLeft size={18} className="mr-1"/> Geri
                        </button>
                        <h2 className="text-lg font-bold">{selectedSurah.name}</h2>
                        <div className="w-16"></div>
                   </div>
                   <div className="space-y-4 pb-4">
                        {quranData.map((ayah, idx) => (
                            <div 
                                key={idx} 
                                ref={idx === activeAyahIndex ? activeAyahRef : null} 
                                className={`bg-white dark:bg-slate-900 border rounded-2xl p-5 shadow-sm transition-all duration-300 ${idx === activeAyahIndex ? 'border-emerald-500 ring-1 ring-emerald-500' : 'border-slate-200 dark:border-slate-800'}`}
                            >
                                <div className="flex justify-between items-start mb-4 gap-4">
                                    <span className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-xs font-bold text-slate-500">{ayah.number}</span>
                                    <p className="text-2xl sm:text-3xl text-right w-full font-serif leading-loose" dir="rtl" style={{fontFamily: "'Amiri', serif"}}>{ayah.textAr}</p>
                                </div>
                                <p className="text-sm text-slate-500 italic mb-2">"{ayah.textLat}"</p>
                                <p className="text-base text-slate-800 dark:text-slate-200 leading-relaxed">{ayah.textTr}</p>
                                <div className="flex justify-end items-center gap-2 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                                    <button onClick={() => toggleFavorite(ayah)} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                                        <Heart size={18} fill={isFavorite(ayah) ? '#ef4444' : 'none'} className={isFavorite(ayah) ? 'text-red-500' : 'text-slate-400'}/>
                                    </button>
                                    <button 
                                        onClick={() => {
                                            if (activeAyahIndex === idx) {
                                                setIsPlaying(!isPlaying);
                                            } else {
                                                setActiveAyahIndex(idx);
                                                setIsPlaying(true);
                                            }
                                        }} 
                                        className={`p-2 rounded-full transition ${idx === activeAyahIndex && isPlaying ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}
                                    >
                                        {idx === activeAyahIndex && isPlaying ? <Pause size={18}/> : <Play size={18}/>}
                                    </button>
                                </div>
                            </div>
                        ))}
                   </div>
              </div>
          )}

          {/* --- HADITH TAB --- */}
          {activeTab === 'hadith' && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                  {!selectedBook ? (
                      <div className="grid grid-cols-2 gap-3">
                          {HADITH_LIBRARY.map(book => (
                              <div 
                                key={book.id} 
                                onClick={() => setSelectedBook(book)} 
                                className={`rounded-2xl p-4 cursor-pointer h-40 flex flex-col justify-between shadow-sm hover:shadow-md transition active:scale-95 ${book.color} ${book.textColor}`}
                              >
                                  <div className="bg-white/40 w-10 h-10 rounded-lg flex items-center justify-center backdrop-blur-sm">
                                      <Book size={20}/>
                                  </div>
                                  <div>
                                      <h3 className="font-bold text-lg leading-tight mb-1">{book.title}</h3>
                                      <p className="text-xs opacity-80">{book.author}</p>
                                  </div>
                              </div>
                          ))}
                      </div>
                  ) : (
                      <div>
                          <button onClick={() => setSelectedBook(null)} className="flex items-center text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 px-3 py-1.5 rounded-lg transition mb-4">
                              <ArrowLeft size={18} className="mr-1"/> Geri
                          </button>
                          <h2 className="text-2xl font-bold mb-4 px-1">{selectedBook.title}</h2>
                          <div className="space-y-4 pb-4">
                              {selectedBook.hadiths.map(h => (
                                  <div key={h.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
                                      <div className="flex justify-between items-center mb-3">
                                          <span className="text-xs font-bold bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-slate-600 dark:text-slate-400">{h.topic}</span>
                                          <button onClick={() => toggleFavorite({...h, type:'hadith'})} className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                                              <Heart size={18} fill={isFavorite({...h, type:'hadith'}) ? '#ef4444' : 'none'} className={isFavorite({...h, type:'hadith'}) ? 'text-red-500' : 'text-slate-400'}/>
                                          </button>
                                      </div>
                                      <p className="text-lg italic font-serif text-slate-800 dark:text-slate-200">"{h.text}"</p>
                                  </div>
                              ))}
                          </div>
                      </div>
                  )}
              </div>
          )}

          {/* --- QIBLA TAB --- */}
          {activeTab === 'qibla' && renderCompass()}

      </main>

      {/* MODALS */}
      {showCityModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
              <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-sm p-4 shadow-2xl flex flex-col max-h-[80vh]">
                  <div className="flex justify-between items-center mb-4 shrink-0">
                      <h3 className="font-bold">Şehir Seçin</h3>
                      <button onClick={() => setShowCityModal(false)}><X size={20}/></button>
                  </div>
                  <input type="text" placeholder="Şehir Ara..." className="w-full p-3 rounded-lg border dark:bg-slate-800 dark:border-slate-700 mb-2 shrink-0" value={citySearch} onChange={e=>setCitySearch(e.target.value)} />
                  <button onClick={getUserLocation} className="w-full p-3 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center gap-2 font-bold mb-2 shrink-0">
                     {locationLoading ? <Loader2 className="animate-spin"/> : <Compass size={18}/>} Konumumu Bul
                  </button>
                  <div className="overflow-y-auto flex-1">
                      {CITIES.filter(c=>c.name.toLowerCase().includes(citySearch.toLowerCase())).map(c => (
                          <div key={c.name} onClick={()=>{setSelectedCity(c); fetchPrayerTimes(c.lat, c.lng); setShowCityModal(false);}} className="p-3 border-b dark:border-slate-800 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition">{c.name}</div>
                      ))}
                  </div>
              </div>
          </div>
      )}

      {/* Favorites Modal */}
      {showFavModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4" onClick={(e) => {if(e.target === e.currentTarget) setShowFavModal(false)}}>
              <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-sm max-h-[80vh] flex flex-col shadow-2xl animate-in zoom-in-95 duration-200">
                   <div className="flex justify-between items-center p-4 border-b border-slate-100 dark:border-slate-800">
                       <h2 className="text-lg font-bold">Favorilerim</h2>
                       <button onClick={() => setShowFavModal(false)} className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"><X size={20}/></button>
                   </div>
                   <div className="overflow-y-auto flex-1 p-4 space-y-3">
                       {favorites.length === 0 ? (
                           <div className="text-center py-10 text-slate-400 flex flex-col items-center">
                               <Heart size={48} className="mb-2 opacity-20"/>
                               <p>Henüz favori eklenmemiş.</p>
                           </div>
                       ) : favorites.map((fav, i) => (
                           <div key={i} className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 border border-slate-100 dark:border-slate-700">
                               <div className="flex justify-between items-center mb-2">
                                   <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30 px-2 py-0.5 rounded">
                                       {fav.type === 'hadith' ? 'Hadis' : `${fav.surahName} ${fav.number}`}
                                   </span>
                                   <button onClick={() => toggleFavorite(fav)} className="text-slate-400 hover:text-red-500 transition"><Trash2 size={16}/></button>
                               </div>
                               <p className="text-sm italic text-slate-600 dark:text-slate-300 line-clamp-3">"{fav.textTr || fav.text}"</p>
                           </div>
                       ))}
                   </div>
              </div>
          </div>
      )}

      {/* Reset Confirmation Modal */}
      {showResetModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[70] flex items-center justify-center p-4">
              <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-xs p-6 shadow-2xl animate-in zoom-in-95 duration-200 text-center">
                  <h3 className="text-lg font-bold mb-2 dark:text-white">Emin misiniz?</h3>
                  <p className="text-slate-500 dark:text-slate-400 mb-6 text-sm">Zikir sayacı sıfırlanacak.</p>
                  <div className="flex gap-3">
                      <button onClick={() => setShowResetModal(false)} className="flex-1 py-2 rounded-lg border border-slate-200 dark:border-slate-700 font-bold text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition">İptal</button>
                      <button onClick={confirmReset} className="flex-1 py-2 bg-red-500 text-white rounded-lg font-bold hover:bg-red-600 transition">Sıfırla</button>
                  </div>
              </div>
          </div>
      )}

      {/* Audio Elements */}
      <audio ref={audioRef} src={quranData[activeAyahIndex]?.audio} onEnded={() => {if (activeAyahIndex < quranData.length - 1) setActiveAyahIndex(p => p + 1); else setIsPlaying(false);}} />
      <audio ref={alarmAudioRef} />

      {/* Toast */}
      {showToast.show && (
          <div className="fixed top-24 left-1/2 -translate-x-1/2 bg-slate-800 text-white px-4 py-2 rounded-full shadow-lg z-[80] flex items-center gap-2 text-sm animate-in slide-in-from-top-2">
              <CheckCircle2 size={16} className="text-emerald-400"/> {showToast.msg}
          </div>
      )}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 h-20 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex justify-around items-center z-50 max-w-md mx-auto pb-2">
          {[
              { id: 'home', icon: Home, label: 'Ana Sayfa' },
              { id: 'quran', icon: BookOpen, label: 'Kuran' },
              { id: 'hadith', icon: Book, label: 'Hadis' },
              { id: 'tesbih', icon: RotateCw, label: 'Tesbihat' },
              { id: 'qibla', icon: Compass, label: 'Kıble' },
          ].map(item => (
              <button 
                key={item.id} 
                onClick={() => setActiveTab(item.id)} 
                className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300 ${activeTab === item.id ? 'text-emerald-600 dark:text-emerald-400 -translate-y-2' : 'text-slate-400 dark:text-slate-500'}`}
              >
                  <item.icon size={24} strokeWidth={activeTab === item.id ? 2.5 : 2} />
                  <span className={`text-[10px] font-bold ${activeTab === item.id ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>{item.label}</span>
              </button>
          ))}
      </nav>
    </div>
  );
}