/* QueueSetu bilingual UI: English / हिन्दी */
(function () {
  const KEY = 'queuesetu-language';

  const dict = {
    'Home': 'होम',
    'Raise a Request': 'अनुरोध दर्ज करें',
    'Track': 'ट्रैक करें',
    'Prices': 'मंडी भाव',
    'Crowd': 'भीड़ की स्थिति',
    'History': 'इतिहास',
    'Help': 'सहायता',
    'Weather': 'मौसम',
    'Schemes': 'योजनाएं',
    'Advisory': 'फसल सलाह',
    'Documents': 'दस्तावेज',
    'Log out': 'लॉग आउट',
    'Your details': 'आपकी जानकारी',
    'Verify OTP': 'OTP सत्यापित करें',
    'Send OTP': 'OTP भेजें',
    'Verify & continue': 'सत्यापित करें और आगे बढ़ें',
    'Sending…': 'भेजा जा रहा है…',
    'Verifying…': 'सत्यापित किया जा रहा है…',
    '+ Raise a new request': '+ नया अनुरोध दर्ज करें',
    'Book now →': 'अभी बुक करें →',
    'View status →': 'स्थिति देखें →',
    'See rates →': 'भाव देखें →',
    'Check crowd →': 'भीड़ देखें →',
    'View history →': 'इतिहास देखें →',
    'Get help →': 'सहायता लें →',
    'Check forecast →': 'पूर्वानुमान देखें →',
    'Explore schemes →': 'योजनाएं देखें →',
    'View advice →': 'सलाह देखें →',
    'View checklist →': 'चेकलिस्ट देखें →',
    'Official portal →': 'आधिकारिक पोर्टल →',
    'Raise a Request': 'अनुरोध दर्ज करें',
    'Select →': 'चुनें →',
    'View / print token slip →': 'टोकन पर्ची देखें / प्रिंट करें →',
    'Track this request →': 'इस अनुरोध को ट्रैक करें →',
    'Raise a Request': 'अनुरोध दर्ज करें',
    'Print slip': 'पर्ची प्रिंट करें',
    'English': 'English',
    'हिन्दी': 'हिन्दी',
    'Home — QueueSetu':'होम — QueueSetu',
    'Raise a Request — QueueSetu':'अनुरोध दर्ज करें — QueueSetu',
    'Track a Request — QueueSetu':'अनुरोध ट्रैक करें — QueueSetu',
    'Market Prices — QueueSetu':'मंडी भाव — QueueSetu',
    'Crowd Status — QueueSetu':'भीड़ की स्थिति — QueueSetu',
    'Weather — QueueSetu':'मौसम — QueueSetu',
    'Schemes — QueueSetu':'योजनाएं — QueueSetu',
    'Documents — QueueSetu':'दस्तावेज — QueueSetu',
    'History — QueueSetu':'इतिहास — QueueSetu',
    'Crop Advisory — QueueSetu':'फसल सलाह — QueueSetu',
    'Help Center — QueueSetu':'सहायता केंद्र — QueueSetu',
    'QueueSetu — No more waiting in line at the mandi':'QueueSetu — मंडी की कतार में अब इंतजार नहीं',
    'FOR FARMERS, BY DESIGN':'किसानों के लिए, किसानों को ध्यान में रखकर',
    'Your slot at the mandi, booked before you leave home.':'घर से निकलने से पहले ही मंडी में अपना स्लॉट बुक करें।',
    'centres live in this pilot':'इस पायलट में सक्रिय केंद्र',
    'average wait time saved':'बचाया गया औसत प्रतीक्षा समय',
    'is all it takes to log in':'लॉग इन के लिए इतना ही काफी है',
    'Wheat season, Kanpur belt — the pilot region for QueueSetu.':'गेहूं का मौसम, कानपुर क्षेत्र — QueueSetu का पायलट क्षेत्र।',
    'What QueueSetu actually does':'QueueSetu वास्तव में क्या करता है',
    'Four problems, one login. Everything below is available the moment you sign in.':'चार समस्याएं, एक लॉग इन। साइन इन करते ही नीचे दी गई सभी सुविधाएं उपलब्ध हैं।',
    'Book a slot':'स्लॉट बुक करें','Pick your procurement centre and a time that works — get a queue position instantly.':'अपना खरीद केंद्र और सुविधाजनक समय चुनें — कतार में स्थान तुरंत पाएं।',
    'Track it live':'लाइव ट्रैक करें','See how many farmers are ahead of you and roughly when to arrive.':'देखें कि आपसे कितने किसान आगे हैं और लगभग कब पहुंचना है।',
    'Check mandi prices':'मंडी भाव देखें','Today\'s rates for your crop before you decide where and when to sell.':'कहां और कब बेचना है, तय करने से पहले अपनी फसल के आज के भाव देखें।',
    'See the crowd':'भीड़ देखें','Compare how busy each centre is right now, before you commit to one.':'किसी केंद्र को चुनने से पहले देखें कि अभी वहां कितनी भीड़ है।',
    'Log in to QueueSetu':'QueueSetu में लॉग इन करें','New here? Just fill this in once — it also creates your account.':'पहली बार आए हैं? इसे एक बार भरें, आपका खाता भी बन जाएगा।',
    'Full name':'पूरा नाम','Mobile number':'मोबाइल नंबर','Send OTP':'OTP भेजें','We\'ll text a 6-digit code to verify this number is yours.':'इस नंबर को सत्यापित करने के लिए हम 6 अंकों का कोड भेजेंगे।','Enter the code':'कोड दर्ज करें','Sent to':'भेजा गया','One-time code':'एक बार का कोड','Verify & continue':'सत्यापित करें और आगे बढ़ें',
    'Select a centre first to see available slots.':'उपलब्ध स्लॉट देखने के लिए पहले एक केंद्र चुनें।',
    'No completed procurements yet — once you finish your first slot, it\'ll show up here.':'अभी कोई खरीद पूरी नहीं हुई है। पहला स्लॉट पूरा करने के बाद वह यहां दिखाई देगा।'

  };

  function translateText(text) {
    const t = (text || '').trim();
    if (dict[t]) return dict[t];
    let m = t.match(/^Confirm slot at (.+)$/);
    if (m) return 'स्लॉट की पुष्टि करें: ' + m[1];
    m = t.match(/^Book (.+) instead$/);
    if (m) return 'इसके बजाय ' + m[1] + ' बुक करें';
    return null;
  }

  function isAction(el) {
    return el.matches('button, .btn, .nav-links a, .js-logout, .tile-meta');
  }

  function remember(el) {
    if (!el.dataset.i18nEn) {
      const current = el.textContent.trim();
      if (translateText(current) || current === 'English' || current === 'हिन्दी') {
        el.dataset.i18nEn = current;
      }
    }
  }

  function apply(lang) {
    localStorage.setItem(KEY, lang);
    document.documentElement.lang = lang === 'hi' ? 'hi' : 'en';

    // Translate normal page copy, not only buttons. This makes every page/slide bilingual.
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      const parent = node.parentElement;
      if (!parent || ['SCRIPT','STYLE','NOSCRIPT'].includes(parent.tagName)) return;
      const raw = node.nodeValue;
      const trimmed = raw.trim();
      if (!trimmed) return;
      if (!node.__qsEnglish) node.__qsEnglish = trimmed;
      const hi = translateText(node.__qsEnglish);
      if (lang === 'hi' && hi) node.nodeValue = raw.replace(trimmed, hi);
      if (lang === 'en') node.nodeValue = raw.replace(trimmed, node.__qsEnglish);
    });

    document.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(el => {
      if (!el.dataset.qsPlaceholderEn) el.dataset.qsPlaceholderEn = el.getAttribute('placeholder');
      const en = el.dataset.qsPlaceholderEn;
      const ph = {'10-digit mobile number':'10 अंकों का मोबाइल नंबर','e.g. Ram Prakash Yadav':'जैसे: राम प्रकाश यादव'}[en] || translateText(en);
      if (lang === 'hi' && ph) el.setAttribute('placeholder', ph);
      if (lang === 'en') el.setAttribute('placeholder', en);
    });

    document.querySelectorAll('[data-lang-en][data-lang-hi]').forEach(el => {
      el.textContent = lang === 'hi' ? el.dataset.langHi : el.dataset.langEn;
    });

    const titleEn = document.documentElement.dataset.qsTitleEn || document.title;
    if (!document.documentElement.dataset.qsTitleEn) document.documentElement.dataset.qsTitleEn = titleEn;
    const titleHi = translateText(titleEn);
    if (lang === 'hi' && titleHi) document.title = titleHi;
    if (lang === 'en') document.title = titleEn;

    document.querySelectorAll('[data-lang-toggle]').forEach(btn => {
      btn.setAttribute('aria-pressed', btn.dataset.langToggle === lang ? 'true' : 'false');
    });
  }

  function setup() {
    const saved = localStorage.getItem(KEY) || 'en';

    // Add a compact language chooser to every page.
    const topbar = document.querySelector('.topbar-inner');
    if (topbar && !document.getElementById('languageSwitcher')) {
      const wrap = document.createElement('div');
      wrap.id = 'languageSwitcher';
      wrap.className = 'language-switcher';
      wrap.innerHTML = `
        <button type="button" data-lang-toggle="en" aria-label="English language">English</button>
        <button type="button" data-lang-toggle="hi" aria-label="Hindi language">हिन्दी</button>
      `;
      topbar.appendChild(wrap);
      wrap.querySelectorAll('[data-lang-toggle]').forEach(btn => {
        btn.addEventListener('click', () => apply(btn.dataset.langToggle));
      });
    }

    // Watch dynamic content such as booking/OTP buttons.
    let timer = null;
    const observer = new MutationObserver(() => {
      clearTimeout(timer);
      timer = setTimeout(() => apply(localStorage.getItem(KEY) || 'en'), 0);
    });
    observer.observe(document.body, { childList: true, subtree: true });

    apply(saved);
  }

  window.qsSetLanguage = apply;
  window.qsTranslate = translateText;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
  } else {
    setup();
  }
})();
