/**
 * Blossom & Glow - نظام بلوسوم آند جلو للعافية والروتين الصحي اليومي
 * المنطق البرمجي، إدارة الحالة، المؤقتات التفاعلية، ومقاطع الفيديو التوضيحية
 */

(function () {
  'use strict';

  // ==========================================================================
  // 1. البيانات الافتراضية وثوابت التخزين
  // ==========================================================================
  const STORAGE_KEY = 'blossom_wellness_arabic_v2';

  const DEFAULT_AFFIRMATIONS = [
    { text: "عاملي جسدكِ بحب ورقة وصبر. أنتِ تزهرين وتتألقين في كل لحظة جديدة.", author: "همسة الإشراق اليومية" },
    { text: "تنفسي السلام، واطردي التوتر مع كل زفير. عمودكِ الفقري يحملكِ طوال الحياة، فاعتني به بلطف.", author: "حكمة صحة الظهر" },
    { text: "غذي جسدكِ كما لو كان أثمن وأجمل حديقة على وجه الأرض.", author: "الحياة الواعية" },
    { text: "الاستمرارية الهادئة واللطيفة تتفوق دائماً على السعي المرهق للكمال. كوني رفيقة بنفسكِ اليوم.", author: "رسالة حب الذات" },
    { text: "خلايا مرتشفة للماء، كتفان مسترخيان، وروح هادئة. أنتِ تشعين نوراً وجمالاً من الداخل.", author: "زهرة الصباح" },
    { text: "إطالة هادئة ومريحة هذا الصباح هي بمثابة عناق دافئ لنفسكِ في المستقبل.", author: "تناغم العافية" },
    { text: "كل رشفة ماء واعية وكل لقمة مغذية هي فعل حب وتقدير عميق لجسدكِ وجمالكِ.", author: "إشراقة يومية" }
  ];

  const DEFAULT_STRETCHES = [
    {
      id: 'water-wake',
      order: 1,
      timeCue: '7:00 ص',
      nameAr: 'الاستيقاظ وشرب الماء',
      nameEn: 'Wake Up & Hydrate',
      durationSec: 60,
      instructions: 'اجلسي براحة على حافة سريركِ أو سجادة مريحة. ارتجفي كوباً طويلاً من الماء بدرجة حرارة الغرفة بوعي لإيقاظ جهازكِ الهضمي وإعادة ترطيب الديسكات وفقرات العمود الفقري.',
      svgType: 'water-glass',
      youtubeId: 'y876007V8gY',
      videoTips: [
        'اشربي الماء وأنتِ في وضع الجلوس المستقيم لراحة معدتكِ.',
        'خذي نفساً عميقاً مع كل رشفة واشعري بالحيوية تدب في جسدكِ.',
        'درجة حرارة الغرفة هي الأفضل والألطف على أمعائكِ صباحاً.'
      ],
      completed: false
    },
    {
      id: 'warmup',
      order: 2,
      timeCue: '7:10 ص',
      nameAr: 'الإحماء اللطيف للرقبة والكتفين',
      nameEn: 'Gentle Warm-Up',
      durationSec: 180,
      instructions: 'قفي أو اجلسي باستقامة مع استرخاء الكتفين. دوري كتفيكِ للخلف ببطء 10 مرات ثم للأمام. ميلي برأسكِ برقة نحو اليمين واليسار لتحرير تيبس فقرات الرقبة الناتج عن النوم.',
      svgType: 'warmup-pose',
      youtubeId: 'xK1Yff_y7Q8',
      videoTips: [
        'تجنبي الحركات الدائرية الكاملة السريعة للرقبة لتجنب الضغط على الفقرات.',
        'حافظي على استرخاء عضلات وجهكِ والفكين أثناء الدوران.',
        'تنفسي بسلاسة واشعري بحرارة الدم تتدفق في أعلى ظهركِ.'
      ],
      completed: false
    },
    {
      id: 'cat-cow',
      order: 3,
      timeCue: '7:13 ص',
      nameAr: 'تمدد القطة والبقرة',
      nameEn: 'Cat-Cow Stretch',
      durationSec: 120,
      instructions: 'على يديكِ وركبتيكِ في وضعية الطاولة، خذي شهيقاً عميقاً وقوسي ظهركِ برفق لأسفل مع رفع الصدر والنظر للأعلى. ثم أخرجي الزفير وقوسي عمودكِ الفقري للأعلى مثل القطة مع خفض رأسكِ نحو صدركِ.',
      svgType: 'cat-cow-pose',
      youtubeId: '0Iuy5gT4Llg',
      videoTips: [
        'اجعلي معصميكِ مباشرة تحت الكتفين وركبتيكِ تحت الوركين.',
        'دعي الحركة تتدفق بسلاسة وانسجام تام مع إيقاع تنفسكِ.',
        'هذا التمرين يعيد المرونة والسيولة لكل فقرة من فقرات العمود الفقري.'
      ],
      completed: false
    },
    {
      id: 'child-pose',
      order: 4,
      timeCue: '7:15 ص',
      nameAr: 'وضعية الطفل المريحة (بالاسانا)',
      nameEn: "Child's Pose",
      durationSec: 120,
      instructions: 'اركعي على البساط، واجمعي إبهامي قدميكِ معاً وافتحي ركبتيكِ قليلاً. أرجعي حوضكِ للخلف فوق كعبيكِ ومدي ذراعيكِ للأمام على الأرض. أريحي جبهتكِ على البساط وتنفسي بعمق في أسفل ظهركِ.',
      svgType: 'child-pose',
      youtubeId: '2MJGg-dUKh0',
      videoTips: [
        'إذا شعرتِ بضغط على الركبتين، ضعي وسادة ناعمة بين فخذيكِ وساقيكِ.',
        'تخيلي أن كل زفير يذيب أي توتر أو إجهاد متراكم في أسفل ظهركِ.',
        'وضعية مثالية لتهدئة الجهاز العصبي واستعادة السكينة.'
      ],
      completed: false
    },
    {
      id: 'side-stretch',
      order: 5,
      timeCue: '7:17 ص',
      nameAr: 'إطالة الجانب والقفص الصدري واقفاً',
      nameEn: 'Standing Side Stretch',
      durationSec: 120,
      instructions: 'قفي باستقامة، ارفعي ذراعكِ اليمنى للأعلى وميلي بلطف نحو اليسار لفتح عضلات القفص الصدري والخصر والظهر الجانبي. استمري لمدة دقيقة بهدوء، ثم كرري على الجانب الآخر.',
      svgType: 'side-stretch-pose',
      youtubeId: 'qQ7RzJ55X74',
      videoTips: [
        'حافظي على استقامة الحوض للأمام وتجنبي الالتفاف أو الميل للأمام.',
        'مدي ذراعكِ كأنكِ تلامسين نجمة في السماء لتمديد العمود الفقري.',
        'تساعد هذه الإطالة على تحسين سعة التنفس وتخفيف ضغط الجلوس الطويل.'
      ],
      completed: false
    },
    {
      id: 'hamstring',
      order: 6,
      timeCue: '7:19 ص',
      nameAr: 'إطالة أوتار الركبة وخلفية الساق',
      nameEn: 'Gentle Hamstring Stretch',
      durationSec: 120,
      instructions: 'مدي إحدى ساقيكِ للأمام مع وضع الكعب على الأرض وتوجيه أصابع القدم للأعلى. انحني برقة من مفصل الورك مع الحفاظ على استقامة ظهركِ حتى تشعري بإطالة مريحة خلف الفخذ دون ارتداد.',
      svgType: 'hamstring-pose',
      youtubeId: '3FvK4a0k_Q8',
      videoTips: [
        'حافظي على ثني طفيف جداً في الركبة لحماية المفصل من الشد الزائد.',
        'لا تحني ظهركِ، فالانحناء يجب أن يكون من الحوض فقط.',
        'مرونة أوتار الركبة تخفف مباشرة الحمل والضغط الواقع على أسفل الظهر.'
      ],
      completed: false
    },
    {
      id: 'shoulder-back',
      order: 7,
      timeCue: '7:21 ص',
      nameAr: 'إطالة الكتفين وأعلى الظهر',
      nameEn: 'Shoulder & Upper Back Stretch',
      durationSec: 120,
      instructions: 'شابكي أصابع يديكِ أمام صدركِ، وادفعي راحتي يديكِ للأمام برفق مع تدوير خفيف لأعلى الظهر لفتح المسافة بين لوحي الكتفين وتخفيف الإجهاد المكتبي.',
      svgType: 'shoulder-pose',
      youtubeId: 'yQg3k3P0-qg',
      videoTips: [
        'اخفضي كتفيكِ بعيداً عن أذنيكِ وركزي على التنفس بين لوحي الكتف.',
        'يمكنكِ خفض ذقنكِ برقة نحو صدركِ لمضاعفة الإحساس بالراحة في العنق.',
        'حركة ذهبية لمن تستخدم الهاتف أو الحاسوب لفترات طويلة.'
      ],
      completed: false
    },
    {
      id: 'relaxation',
      order: 8,
      timeCue: '7:23 ص',
      nameAr: 'الاسترخاء والتنفس العميق لصفاء الذهن',
      nameEn: 'Relaxation & Deep Breathing',
      durationSec: 120,
      instructions: 'اجلسي باستقامة وأغمضي عينيكِ. ضعي يدكِ اليمنى على قلبكِ واليسرى على بطنكِ. استنشقي الهواء ببطء لـ 4 عدات، احبسيه لعدتين، ثم أخرجيه بهدوء لـ 4 عدات، واغمري قلبكِ بالامتنان.',
      svgType: 'breathe-pose',
      youtubeId: '1Dv-ldGLnIY',
      videoTips: [
        'دعي بطنكِ يرتفع مع الشهيق وينخفض بنعومة مع الزفير.',
        'كرري في سركِ: "أنا بصحة، أنا بسلام، وجسدي يتعافى ويزدهر".',
        'اختتمي روتينكِ بابتسامة دافئة وامتنان لعضلاتكِ وجسدكِ الرائع.'
      ],
      completed: false
    }
  ];

  const DEFAULT_MEALS = {
    breakfast: {
      name: 'وعاء توت الأساي والشيا الصباحي المغذي',
      time: '08:00',
      category: 'فطور حيوي ونشط',
      image: 'assets/images/breakfast.jpg',
      items: ['قاعدة سموذي التوت البري والوردي', 'شرائح فراولة طازجة وتوت أزرق وموز', 'بذور الشيا وحبوب القنب الطبيعية', 'كوب ماء دافئ بأوراق النعناع والليمون'],
      notes: 'استمتعي بتناول الفطور بهدوء بجوار نافذة الصباح المشمسة ودون النظر في شاشات الهاتف.',
      completed: false
    },
    lunch: {
      name: 'وعاء الكينوا والأفوكادو المتوسطي الملون',
      time: '14:00',
      category: 'غداء طازج ومغذي',
      image: 'assets/images/lunch.jpg',
      items: ['حبوب الكينوا الخفيفة ثلاثية الألوان', 'شرائح أفوكادو ناضجة مع بذور السمسم', 'جبن حلومي مشوي مع حبوب الإدامامي', 'شرائط الخيار المقرمشة وطماطم كرزية', 'صلصة الطحينة بالليمون وزيت الزيتون البكر'],
      notes: 'وجبة متكاملة مليئة بمضادات الأكسدة والدهون الصحية التي تمنح بشرتكِ نضارة وإشراقاً.',
      completed: false
    },
    dinner: {
      name: 'سلمون مخبوز بالأعشاب مع الهليون والأرز البري',
      time: '20:00',
      category: 'عشاء خفيف ومريح',
      image: 'assets/images/dinner.jpg',
      items: ['فيليه سلمون طازج مشوي بالأعشاب العطرية', 'أعواد هليون مشوية ومقرمشة', 'مزيج الأرز البري الدافئ مع شرائح لوز محمص', 'كوب شاي البابونج واللافندر الهادئ'],
      notes: 'عشاء خفيف وسهل الهضم يهيئ عضلات الظهر وجهازكِ العصبي لنوم عميق ومريح.',
      completed: false
    }
  };

  const DEFAULT_HABITS = [
    { id: 'stretch', name: 'إطالة الصباح للظهر (15 دقيقة)', icon: '🧘‍♀️', weekHistory: [true, true, true, false, false, false, false], completedToday: false },
    { id: 'water', name: 'شرب 2,000 مل ماء نقي', icon: '💧', weekHistory: [true, true, true, false, false, false, false], completedToday: false },
    { id: 'breakfast', name: 'وجبة فطور متوازنة وواعية', icon: '🍓', weekHistory: [true, true, false, false, false, false, false], completedToday: false },
    { id: 'lunch', name: 'غداء صحي ومغذي', icon: '🥗', weekHistory: [true, false, true, false, false, false, false], completedToday: false },
    { id: 'dinner', name: 'عشاء خفيف ومريح للهضم', icon: '🍽️', weekHistory: [true, true, true, false, false, false, false], completedToday: false },
    { id: 'sleep', name: 'الاسترخاء والنوم الهادئ بحلول 10:30 م', icon: '🌙', weekHistory: [false, true, true, false, false, false, false], completedToday: false },
    { id: 'skincare', name: 'روتين العناية بالبشرة المسائي', icon: '✨', weekHistory: [true, true, true, false, false, false, false], completedToday: false },
    { id: 'journal', name: '5 دقائق كتابة امتنان وتأمل', icon: '✍️', weekHistory: [true, true, false, false, false, false, false], completedToday: false }
  ];

  const DEFAULT_BADGES = [
    { id: 'morning_blossom', name: 'زهرة الصباح', icon: '🌸', desc: 'إكمال روتين إطالات الصباح اللطيف للظهر', unlocked: true, condition: 'إكمال روتين الإطالة الصباحي' },
    { id: 'hydration_fairy', name: 'جنية الترطيب', icon: '💧', desc: 'الوصول للهدف اليومي بشرب 2,000 مل ماء', unlocked: false, condition: 'تحقيق هدف الماء الكامل' },
    { id: 'glow_fuel', name: 'وقود الإشراق', icon: '🍓', desc: 'تسجيل والاستمتاع بالوجبات الثلاث الصحية الواعية', unlocked: false, condition: 'إتمام الوجبات الثلاث' },
    { id: 'consistency_queen', name: 'ملكة الالتزام', icon: '👑', desc: 'المحافظة على التتابع المستمر لمدة 3 أيام', unlocked: true, condition: 'تتابع 3 أيام متتالية' },
    { id: 'radiant_star', name: 'النجمة المتألقة', icon: '✨', desc: 'المحافظة على التتابع المستمر لمدة 7 أيام متتالية', unlocked: false, condition: 'تتابع 7 أيام متتالية' },
    { id: 'zen_master', name: 'إلهة مرونة الظهر', icon: '🧘‍♀️', desc: 'إتمام 5 جلسات تمدد وإطالة للعمود الفقري', unlocked: true, condition: 'إكمال 5 جلسات إطالة' },
    { id: 'self_love', name: 'بطلة حب الذات', icon: '💖', desc: 'تحقيق نسبة 100% في التناغم اليومي لجميع المهام', unlocked: false, condition: '100% إنجاز يومي' }
  ];

  const DEFAULT_CUSTOM_ACTIVITIES = [
    { id: 'tea-time', time: '16:30', name: 'استراحة شاي الورد والتنفس الهادئ', category: 'عناية بالذات', notes: 'الابتعاد عن الشاشات والتمتع بدفء الكوب', completed: false }
  ];

  // ==========================================================================
  // 2. محرك الصوت الكريستالي (Web Audio API)
  // ==========================================================================
  class SoundEngine {
    constructor() {
      this.ctx = null;
      this.enabled = true;
    }

    init() {
      if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioCtx();
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    playCrystalChime() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const freqs = [523.25, 659.25, 783.99, 1046.50]; // نغمات C5, E5, G5, C6

      freqs.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);

        gain.gain.setValueAtTime(0.001, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.15, now + idx * 0.06 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.06 + 1.2);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 1.3);
      });
    }

    playMeditationBell() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(432, now); // تردد 432Hz الهادئ والمريح

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.25, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 3.0);
    }

    playTick() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);

      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.1);
    }

    playCelebrationFanfare() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const notes = [
        { f: 523.25, t: 0.0 },
        { f: 659.25, t: 0.15 },
        { f: 783.99, t: 0.3 },
        { f: 1046.50, t: 0.45 },
        { f: 1318.51, t: 0.65 }
      ];

      notes.forEach(n => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(n.f, now + n.t);

        gain.gain.setValueAtTime(0.001, now + n.t);
        gain.gain.exponentialRampToValueAtTime(0.18, now + n.t + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + n.t + 1.4);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + n.t);
        osc.stop(now + n.t + 1.5);
      });
    }
  }

  const soundEngine = new SoundEngine();

  // ==========================================================================
  // 3. محرك تساقط بتلات الزهور والاحتفال (HTML5 Canvas)
  // ==========================================================================
  class PetalCanvas {
    constructor(canvasId) {
      this.canvas = document.getElementById(canvasId);
      if (!this.canvas) return;
      this.ctx = this.canvas.getContext('2d');
      this.petals = [];
      this.confetti = [];
      this.enabled = true;
      this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      this.resize();
      window.addEventListener('resize', () => this.resize());
      this.initPetals(25);
      this.animate();
    }

    resize() {
      if (!this.canvas) return;
      this.width = this.canvas.width = window.innerWidth;
      this.height = this.canvas.height = window.innerHeight;
    }

    initPetals(count) {
      this.petals = [];
      if (this.isReducedMotion) return;
      for (let i = 0; i < count; i++) {
        this.petals.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          r: Math.random() * 8 + 6,
          dx: (Math.random() - 0.5) * 1.2 - 0.4,
          dy: Math.random() * 1.2 + 0.6,
          angle: Math.random() * Math.PI * 2,
          angularSpeed: (Math.random() - 0.5) * 0.02,
          opacity: Math.random() * 0.45 + 0.25,
          color: Math.random() > 0.4 ? 'rgba(248, 200, 220,' : 'rgba(239, 166, 200,'
        });
      }
    }

    burstConfetti(originX, originY) {
      const colors = ['#EFA6C8', '#F8C8DC', '#E6D9F2', '#FFD166', '#67B99A', '#9B72CF'];
      const x = originX || this.width / 2;
      const y = originY || this.height * 0.4;

      for (let i = 0; i < 90; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 10 + 4;
        this.confetti.push({
          x: x,
          y: y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 3,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 8 + 4,
          life: 1.0,
          decay: Math.random() * 0.015 + 0.012,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 15
        });
      }
    }

    animate() {
      requestAnimationFrame(() => this.animate());
      if (!this.canvas || !this.ctx) return;
      this.ctx.clearRect(0, 0, this.width, this.height);

      if (this.enabled && !this.isReducedMotion) {
        for (let p of this.petals) {
          p.x += p.dx;
          p.y += p.dy;
          p.angle += p.angularSpeed;

          if (p.y > this.height + 20) {
            p.y = -20;
            p.x = Math.random() * this.width;
          }
          if (p.x < -20) p.x = this.width + 20;
          if (p.x > this.width + 20) p.x = -20;

          this.ctx.save();
          this.ctx.translate(p.x, p.y);
          this.ctx.rotate(p.angle);
          this.ctx.fillStyle = `${p.color} ${p.opacity})`;
          this.ctx.beginPath();
          this.ctx.ellipse(0, 0, p.r * 1.3, p.r * 0.8, 0, 0, Math.PI * 2);
          this.ctx.fill();
          this.ctx.restore();
        }
      }

      for (let i = this.confetti.length - 1; i >= 0; i--) {
        const c = this.confetti[i];
        c.x += c.vx;
        c.y += c.vy;
        c.vy += 0.25;
        c.vx *= 0.98;
        c.rotation += c.rotationSpeed;
        c.life -= c.decay;

        if (c.life <= 0) {
          this.confetti.splice(i, 1);
          continue;
        }

        this.ctx.save();
        this.ctx.translate(c.x, c.y);
        this.ctx.rotate((c.rotation * Math.PI) / 180);
        this.ctx.globalAlpha = Math.max(0, c.life);
        this.ctx.fillStyle = c.color;
        this.ctx.fillRect(-c.size / 2, -c.size / 2, c.size, c.size * 0.6);
        this.ctx.restore();
      }
    }
  }

  // ==========================================================================
  // 4. الفئة الرئيسية للتطبيق (BlossomApp)
  // ==========================================================================
  class BlossomApp {
    constructor() {
      this.state = this.loadState();
      this.petalCanvas = new PetalCanvas('petal-canvas');
      this.currentTab = 'dashboard';
      this.selectedMealDay = new Date().getDay();
      this.quoteIndex = 0;
      
      // Workout Player State
      this.playerActive = false;
      this.playerExerciseIndex = 0;
      this.playerTimerInterval = null;
      this.playerRemainingSeconds = 0;
      this.playerIsPaused = false;
      this.playerViewMode = 'pose'; // 'pose' or 'video'
      
      this.initDOM();
      this.applyTheme(this.state.settings.theme);
      this.renderAll();
      this.startClockAndUpcomingTimer();
      this.scheduleNotificationChecks();
    }

    // ------------------------------------------------------------------------
    // حفظ واسترجاع الحالة
    // ------------------------------------------------------------------------
    loadState() {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          const todayStr = new Date().toDateString();
          if (parsed.lastSavedDate !== todayStr) {
            parsed.lastSavedDate = todayStr;
            parsed.stretches.forEach(s => s.completed = false);
            parsed.meals.breakfast.completed = false;
            parsed.meals.lunch.completed = false;
            parsed.meals.dinner.completed = false;
            parsed.water.current = 0;
            parsed.habits.forEach(h => h.completedToday = false);
            parsed.customActivities.forEach(a => a.completed = false);
          }
          return parsed;
        }
      } catch (e) {
        console.warn('استرجاع بيانات المتصفح، سيتم استخدام البيانات الافتراضية', e);
      }

      return {
        lastSavedDate: new Date().toDateString(),
        settings: {
          name: 'صوفيا',
          wakeupTime: '07:00',
          stretchTime: '07:10',
          breakfastTime: '08:00',
          lunchTime: '14:00',
          dinnerTime: '20:00',
          waterGoal: 2000,
          theme: 'pink',
          soundEnabled: true,
          petalsEnabled: true,
          browserNotifs: false
        },
        stretches: JSON.parse(JSON.stringify(DEFAULT_STRETCHES)),
        meals: JSON.parse(JSON.stringify(DEFAULT_MEALS)),
        water: { current: 1250, goal: 2000 },
        habits: JSON.parse(JSON.stringify(DEFAULT_HABITS)),
        badges: JSON.parse(JSON.stringify(DEFAULT_BADGES)),
        customActivities: JSON.parse(JSON.stringify(DEFAULT_CUSTOM_ACTIVITIES)),
        streak: { current: 3, best: 7 }
      };
    }

    saveState() {
      try {
        this.state.lastSavedDate = new Date().toDateString();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
      } catch (e) {
        console.error('فشل حفظ البيانات في الذاكرة المحلية', e);
      }
    }

    // ------------------------------------------------------------------------
    // تهيئة عناصر DOM والأحداث التفاعلية
    // ------------------------------------------------------------------------
    initDOM() {
      // 1. التنقل بين الأقسام
      const allNavButtons = document.querySelectorAll('[data-tab]');
      allNavButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          const tab = btn.getAttribute('data-tab');
          this.switchTab(tab);
        });
      });

      // 2. زر تبديل الصوت
      const topbarSoundBtn = document.getElementById('btn-sound-toggle');
      if (topbarSoundBtn) {
        topbarSoundBtn.addEventListener('click', () => this.toggleSound());
      }

      // 3. التبديل السريع للمظهر
      const themeQuickBtn = document.getElementById('btn-theme-quick');
      if (themeQuickBtn) {
        themeQuickBtn.addEventListener('click', () => {
          const themes = ['pink', 'lavender', 'rose'];
          const curIndex = themes.indexOf(this.state.settings.theme);
          const nextTheme = themes[(curIndex + 1) % themes.length];
          this.applyTheme(nextTheme);
          const names = { pink: 'الوردي الناعم', lavender: 'حلم اللافندر', rose: 'توهج الورد' };
          this.showToast('تم تحديث المظهر', `تم التبديل إلى ستايل ${names[nextTheme]}! 🌸`);
        });
      }

      // 4. تجديد الاقتباس الصباحي
      const quoteRefreshBtn = document.getElementById('btn-quote-refresh');
      if (quoteRefreshBtn) {
        quoteRefreshBtn.addEventListener('click', () => this.refreshQuote());
      }

      // 5. أزرار الواجهة الترحيبية
      const heroWorkoutBtn = document.getElementById('hero-start-workout-btn');
      if (heroWorkoutBtn) {
        heroWorkoutBtn.addEventListener('click', () => this.openWorkoutPlayer(0));
      }
      const heroMealsBtn = document.getElementById('hero-view-meals-btn');
      if (heroMealsBtn) {
        heroMealsBtn.addEventListener('click', () => this.switchTab('meals'));
      }

      // 6. رشفة الماء السريعة
      const sidebarQuickSip = document.getElementById('sidebar-quick-sip-btn');
      if (sidebarQuickSip) {
        sidebarQuickSip.addEventListener('click', () => this.addWater(250));
      }

      // 7. النقر على الزهرة التفاعلية
      const flowerMascot = document.getElementById('flower-mascot');
      if (flowerMascot) {
        flowerMascot.addEventListener('click', () => this.triggerMascotWink());
      }

      // 8. زر المحطة القادمة
      const upcomingActionBtn = document.getElementById('upcoming-action-btn');
      if (upcomingActionBtn) {
        upcomingActionBtn.addEventListener('click', () => this.handleUpcomingAction());
      }

      // 9. رابط العادات
      const linkToHabits = document.getElementById('link-to-habits');
      if (linkToHabits) {
        linkToHabits.addEventListener('click', (e) => {
          e.preventDefault();
          this.switchTab('habits');
        });
      }

      // 10. فلاتر الجدول والتدفق
      const timelineFilterButtons = document.querySelectorAll('.timeline-filter-buttons .filter-pill');
      timelineFilterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          timelineFilterButtons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          this.renderTimeline(btn.getAttribute('data-filter'));
        });
      });

      // 11. أزرار الإطالة الصباحية
      const launchWorkoutBtn = document.getElementById('btn-launch-workout');
      if (launchWorkoutBtn) {
        launchWorkoutBtn.addEventListener('click', () => this.openWorkoutPlayer(0));
      }
      const customizeStretchesBtn = document.getElementById('btn-customize-stretches');
      if (customizeStretchesBtn) {
        customizeStretchesBtn.addEventListener('click', () => this.openCustomizeStretchesModal());
      }

      // 12. أزرار مشغل التمرين الموجه
      const closePlayerBtn = document.getElementById('btn-close-player');
      if (closePlayerBtn) {
        closePlayerBtn.addEventListener('click', () => this.closeWorkoutPlayer());
      }
      const playerPlayPause = document.getElementById('btn-player-playpause');
      if (playerPlayPause) {
        playerPlayPause.addEventListener('click', () => this.togglePlayerPlayPause());
      }
      const playerNext = document.getElementById('btn-player-next');
      if (playerNext) {
        playerNext.addEventListener('click', () => this.nextExercise());
      }
      const playerPrev = document.getElementById('btn-player-prev');
      if (playerPrev) {
        playerPrev.addEventListener('click', () => this.prevExercise());
      }
      const playerSkip = document.getElementById('btn-player-skip');
      if (playerSkip) {
        playerSkip.addEventListener('click', () => this.nextExercise());
      }
      const playerMarkDone = document.getElementById('btn-player-mark-done');
      if (playerMarkDone) {
        playerMarkDone.addEventListener('click', () => this.completeFullRoutine());
      }

      // أزرار تبديل نمط العرض داخل المشغل (فيديو توضيحي / رسم توضيحي مع تنفس)
      const tabModePose = document.getElementById('tab-mode-pose');
      const tabModeVideo = document.getElementById('tab-mode-video');
      if (tabModePose && tabModeVideo) {
        tabModePose.addEventListener('click', () => this.setPlayerViewMode('pose'));
        tabModeVideo.addEventListener('click', () => this.setPlayerViewMode('video'));
      }

      // 13. نافذة الفيديو المنفصلة
      const closeDemoVideo = document.getElementById('btn-close-demo-video');
      if (closeDemoVideo) {
        closeDemoVideo.addEventListener('click', () => this.closeModal('modal-exercise-video'));
      }
      const btnStartFromVideo = document.getElementById('btn-start-from-video');
      if (btnStartFromVideo) {
        btnStartFromVideo.addEventListener('click', () => {
          this.closeModal('modal-exercise-video');
          this.openWorkoutPlayer(this.activeVideoDemoIndex || 0);
        });
      }

      // 14. أزرار الترطيب وشرب الماء
      const btnAddGlass = document.getElementById('btn-add-glass');
      if (btnAddGlass) btnAddGlass.addEventListener('click', () => this.addWater(250));
      const btnAddBottle = document.getElementById('btn-add-bottle');
      if (btnAddBottle) btnAddBottle.addEventListener('click', () => this.addWater(500));
      const btnSubWater = document.getElementById('btn-sub-water');
      if (btnSubWater) btnSubWater.addEventListener('click', () => this.addWater(-250));
      const btnEditWaterGoal = document.getElementById('btn-edit-water-goal');
      if (btnEditWaterGoal) {
        btnEditWaterGoal.addEventListener('click', () => {
          const newGoal = prompt('حددي هدفكِ اليومي من الماء بالملليلتر (مثال: 2000، 2500):', this.state.water.goal);
          if (newGoal && !isNaN(newGoal) && newGoal > 500) {
            this.state.water.goal = parseInt(newGoal, 10);
            this.state.settings.waterGoal = parseInt(newGoal, 10);
            this.saveState();
            this.renderHydration();
            this.showToast('تم تحديث الهدف', `الهدف الجديد لشرب الماء: ${this.state.water.goal} مل 💧`);
          }
        });
      }

      // 15. أيام الأسبوع للوجبات
      const dayChips = document.querySelectorAll('#meal-day-picker .day-chip');
      dayChips.forEach(chip => {
        chip.addEventListener('click', () => {
          dayChips.forEach(c => c.classList.remove('active'));
          chip.classList.add('active');
          this.selectedMealDay = parseInt(chip.getAttribute('data-day'), 10);
          this.renderMeals();
        });
      });

      // 16. نافذة تعديل الوجبة
      const closeEditMeal = document.getElementById('btn-close-edit-meal');
      if (closeEditMeal) closeEditMeal.addEventListener('click', () => this.closeModal('modal-edit-meal'));
      const cancelEditMeal = document.getElementById('btn-cancel-meal');
      if (cancelEditMeal) cancelEditMeal.addEventListener('click', () => this.closeModal('modal-edit-meal'));
      const formEditMeal = document.getElementById('form-edit-meal');
      if (formEditMeal) {
        formEditMeal.addEventListener('submit', (e) => {
          e.preventDefault();
          this.saveEditedMeal();
        });
      }

      // 17. تبديل عرض الجدول الزمني
      const btnViewDaily = document.getElementById('btn-view-daily');
      const btnViewWeekly = document.getElementById('btn-view-weekly');
      const scheduleDailyView = document.getElementById('schedule-daily-view');
      const scheduleWeeklyView = document.getElementById('schedule-weekly-view');

      if (btnViewDaily && btnViewWeekly) {
        btnViewDaily.addEventListener('click', () => {
          btnViewDaily.classList.add('active');
          btnViewWeekly.classList.remove('active');
          scheduleDailyView.classList.remove('hidden');
          scheduleWeeklyView.classList.add('hidden');
        });
        btnViewWeekly.addEventListener('click', () => {
          btnViewWeekly.classList.add('active');
          btnViewDaily.classList.remove('active');
          scheduleWeeklyView.classList.remove('hidden');
          scheduleDailyView.classList.add('hidden');
          this.renderWeeklySchedule();
        });
      }

      const btnAddActivity = document.getElementById('btn-add-custom-activity');
      if (btnAddActivity) {
        btnAddActivity.addEventListener('click', () => this.openActivityModal());
      }
      const closeActivityModal = document.getElementById('btn-close-activity-modal');
      if (closeActivityModal) closeActivityModal.addEventListener('click', () => this.closeModal('modal-activity'));
      const cancelActivity = document.getElementById('btn-cancel-activity');
      if (cancelActivity) cancelActivity.addEventListener('click', () => this.closeModal('modal-activity'));
      const formActivity = document.getElementById('form-activity');
      if (formActivity) {
        formActivity.addEventListener('submit', (e) => {
          e.preventDefault();
          this.saveCustomActivity();
        });
      }

      // 18. تخصيص مدد الإطالات
      const closeCustomize = document.getElementById('btn-close-customize-modal');
      if (closeCustomize) closeCustomize.addEventListener('click', () => this.closeModal('modal-customize-stretches'));
      const saveCustomStretches = document.getElementById('btn-save-custom-stretches');
      if (saveCustomStretches) saveCustomStretches.addEventListener('click', () => this.saveCustomizedStretches());
      const resetCustomStretches = document.getElementById('btn-reset-stretch-durations');
      if (resetCustomStretches) resetCustomStretches.addEventListener('click', () => this.resetCustomizedStretches());

      // 19. إضافة عادة جديدة
      const btnAddCustomHabit = document.getElementById('btn-add-custom-habit');
      if (btnAddCustomHabit) {
        btnAddCustomHabit.addEventListener('click', () => {
          const habitName = prompt('اكتبي العادة الصحية الإيجابية الجديدة: (مثال: قراءة 10 دقائق، المشي في الهواء الطلق)');
          if (habitName && habitName.trim()) {
            this.state.habits.push({
              id: 'custom-' + Date.now(),
              name: habitName.trim(),
              icon: '✨',
              weekHistory: [false, false, false, false, false, false, false],
              completedToday: false
            });
            this.saveState();
            this.renderHabits();
            this.showToast('تمت إضافة العادة', `أضيفت "${habitName}" إلى روتينكِ اليومي! 🌸`);
          }
        });
      }

      // 20. نافذة الاحتفال
      const closeCelebrationBtn = document.getElementById('btn-celebration-close');
      if (closeCelebrationBtn) {
        closeCelebrationBtn.addEventListener('click', () => this.closeModal('modal-celebration'));
      }

      // 21. تبديل السمة في الإعدادات
      const themeRadios = document.querySelectorAll('input[name="app-theme"]');
      themeRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
          if (e.target.checked) this.applyTheme(e.target.value);
        });
      });

      const btnSaveSettings = document.getElementById('btn-save-settings');
      if (btnSaveSettings) {
        btnSaveSettings.addEventListener('click', () => this.saveSettingsFromForm());
      }

      const btnTestNotification = document.getElementById('btn-test-notification');
      if (btnTestNotification) {
        btnTestNotification.addEventListener('click', () => {
          soundEngine.playCrystalChime();
          this.showToast('تذكير الإطالة 🌸', 'حان وقت إيقاظ العمود الفقري وتمديد الظهر بكل رقة!');
        });
      }

      const btnRequestBrowserNotif = document.getElementById('btn-request-browser-notif');
      if (btnRequestBrowserNotif) {
        btnRequestBrowserNotif.addEventListener('click', () => this.requestBrowserNotificationPermission());
      }

      const btnResetToday = document.getElementById('btn-reset-today');
      if (btnResetToday) {
        btnResetToday.addEventListener('click', () => {
          if (confirm("هل ترغبين بإعادة تعيين إنجاز مهام اليوم؟ (سجل العادات الأسبوعي سيبقى محفوظاً بأمان)")) {
            this.state.stretches.forEach(s => s.completed = false);
            this.state.meals.breakfast.completed = false;
            this.state.meals.lunch.completed = false;
            this.state.meals.dinner.completed = false;
            this.state.water.current = 0;
            this.state.habits.forEach(h => h.completedToday = false);
            this.saveState();
            this.renderAll();
            this.showToast('تمت إعادة التعيين', "تم تجديد سجل اليوم بنجاح! 🌸");
          }
        });
      }

      const btnRestoreDefaults = document.getElementById('btn-restore-defaults');
      if (btnRestoreDefaults) {
        btnRestoreDefaults.addEventListener('click', () => {
          if (confirm("استعادة جميع المواعيد والتمارين والوجبات الافتراضية؟")) {
            localStorage.removeItem(STORAGE_KEY);
            this.state = this.loadState();
            this.renderAll();
            this.showToast('تمت استعادة الخطة الافتراضية', 'تمت تهيئة التطبيق بأجمل الإعدادات! ✨');
          }
        });
      }
    }

    // ------------------------------------------------------------------------
    // التبديل بين الأقسام
    // ------------------------------------------------------------------------
    switchTab(tabId) {
      this.currentTab = tabId;

      document.querySelectorAll('.sidebar-nav .nav-item').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
      });

      document.querySelectorAll('.mobile-bottom-nav .mobile-nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
      });

      document.querySelectorAll('.tab-pane').forEach(pane => {
        pane.classList.toggle('active', pane.id === `pane-${tabId}`);
      });

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // ------------------------------------------------------------------------
    // تطبيق السمة والصوت
    // ------------------------------------------------------------------------
    applyTheme(themeName) {
      this.state.settings.theme = themeName;
      document.documentElement.setAttribute('data-theme', themeName);

      const radio = document.querySelector(`input[name="app-theme"][value="${themeName}"]`);
      if (radio) radio.checked = true;

      this.saveState();
    }

    toggleSound() {
      this.state.settings.soundEnabled = !this.state.settings.soundEnabled;
      soundEngine.enabled = this.state.settings.soundEnabled;

      const soundIconOn = document.getElementById('sound-icon-on');
      const soundIconOff = document.getElementById('sound-icon-off');
      const settingSoundToggle = document.getElementById('setting-sound-toggle');

      if (this.state.settings.soundEnabled) {
        if (soundIconOn) soundIconOn.classList.remove('hidden');
        if (soundIconOff) soundIconOff.classList.add('hidden');
        if (settingSoundToggle) settingSoundToggle.checked = true;
        soundEngine.playCrystalChime();
        this.showToast('تم تفعيل الصوت', 'ستعمل النغمات الكريستالية الهادئة عند إنجاز المهام. 🔔');
      } else {
        if (soundIconOn) soundIconOn.classList.add('hidden');
        if (soundIconOff) soundIconOff.classList.remove('hidden');
        if (settingSoundToggle) settingSoundToggle.checked = false;
        this.showToast('تم كتم الصوت', 'تم إيقاف النغمات الصوتية.');
      }

      this.saveState();
    }

    // ------------------------------------------------------------------------
    // التحديث والعرض الشامل
    // ------------------------------------------------------------------------
    renderAll() {
      this.renderHeader();
      this.renderHeroAndGreeting();
      this.renderProgressAndMascot();
      this.renderUpcomingActivity();
      this.renderQuickHabits();
      this.renderTimeline('all');
      this.renderStretchesList();
      this.renderHydration();
      this.renderMeals();
      this.renderScheduleTimeline();
      this.renderHabits();
      this.renderBadges();
      this.populateSettingsForm();
    }

    renderHeader() {
      const headerDate = document.getElementById('header-date');
      if (headerDate) {
        const now = new Date();
        const days = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
        const months = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
        headerDate.textContent = `${days[now.getDay()]}، ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
      }

      const sidebarUserName = document.getElementById('sidebar-user-name');
      if (sidebarUserName) {
        sidebarUserName.textContent = this.state.settings.name || 'صوفيا';
      }

      const topbarStreakNum = document.getElementById('topbar-streak-num');
      if (topbarStreakNum) {
        topbarStreakNum.textContent = `${this.state.streak.current} أيام`;
      }

      const sidebarStreakChip = document.getElementById('sidebar-streak-chip');
      if (sidebarStreakChip) {
        sidebarStreakChip.textContent = `🔥 ${this.state.streak.current}`;
      }
    }

    renderHeroAndGreeting() {
      const now = new Date();
      const hour = now.getHours();
      let greeting = 'صباح الخير';
      let pillText = 'واحتكِ الصباحية الدافئة';

      if (hour >= 12 && hour < 17) {
        greeting = 'مساء الخير والسعادة';
        pillText = 'إشراقة بعد الظهيرة المنعشة';
      } else if (hour >= 17) {
        greeting = 'مساء الهدوء والسكينة';
        pillText = 'واحة المساء المريحة';
      }

      const heroGreeting = document.getElementById('hero-greeting');
      if (heroGreeting) {
        heroGreeting.textContent = `${greeting} يا ${this.state.settings.name}! 🌸`;
      }

      const heroPill = document.getElementById('hero-greeting-pill');
      if (heroPill) heroPill.textContent = pillText;

      const quoteText = document.getElementById('quote-text');
      const quoteAuthor = document.getElementById('quote-author');
      if (quoteText && quoteAuthor) {
        const item = DEFAULT_AFFIRMATIONS[this.quoteIndex % DEFAULT_AFFIRMATIONS.length];
        quoteText.textContent = `"${item.text}"`;
        quoteAuthor.textContent = `— ${item.author}`;
      }
    }

    refreshQuote() {
      this.quoteIndex = (this.quoteIndex + 1) % DEFAULT_AFFIRMATIONS.length;
      const quoteText = document.getElementById('quote-text');
      const quoteAuthor = document.getElementById('quote-author');
      if (quoteText && quoteAuthor) {
        const item = DEFAULT_AFFIRMATIONS[this.quoteIndex];
        quoteText.style.opacity = '0';
        setTimeout(() => {
          quoteText.textContent = `"${item.text}"`;
          quoteAuthor.textContent = `— ${item.author}`;
          quoteText.style.opacity = '1';
        }, 150);
      }
      soundEngine.playCrystalChime();
    }

    // ------------------------------------------------------------------------
    // حساب نسبة الإنجاز والزهرة التفاعلية
    // ------------------------------------------------------------------------
    calculateProgress() {
      let totalTasks = 8;
      let completedCount = 0;

      const anyStretchDone = this.state.stretches.some(s => s.completed);
      if (anyStretchDone) completedCount++;

      if (this.state.water.current >= this.state.water.goal * 0.5) completedCount++;
      if (this.state.water.current >= this.state.water.goal) completedCount++;

      if (this.state.meals.breakfast.completed) completedCount++;
      if (this.state.meals.lunch.completed) completedCount++;
      if (this.state.meals.dinner.completed) completedCount++;

      const completedHabits = this.state.habits.filter(h => h.completedToday).length;
      if (completedHabits >= 1) completedCount++;
      if (completedHabits >= 3) completedCount++;

      const percent = Math.min(100, Math.round((completedCount / totalTasks) * 100));
      return { completedCount, totalTasks, percent };
    }

    renderProgressAndMascot() {
      const { completedCount, totalTasks, percent } = this.calculateProgress();

      const ratioBadge = document.getElementById('completion-ratio-badge');
      if (ratioBadge) ratioBadge.textContent = `${completedCount} من ${totalTasks} منجز`;

      const navBadge = document.getElementById('badge-tasks-count');
      if (navBadge) navBadge.textContent = `${completedCount}/${totalTasks}`;

      const percentLarge = document.getElementById('dashboard-progress-percent');
      if (percentLarge) percentLarge.textContent = `${percent}%`;

      const circle = document.getElementById('dashboard-progress-circle');
      if (circle) {
        const circumference = 2 * Math.PI * 68;
        const offset = circumference - (percent / 100) * circumference;
        circle.style.strokeDashoffset = offset;
      }

      const stageText = document.getElementById('mascot-stage-text');
      const progressStatus = document.getElementById('dashboard-progress-status');
      const speechBubble = document.getElementById('mascot-speech');
      const petalsGroup = document.getElementById('flower-petals');

      let stageLabel = 'المرحلة: برعم رقيق 🌱';
      let statusDesc = 'ابدئي يومكِ بأنفاس هادئة.';
      let speech = `أهلاً بكِ يا ${this.state.settings.name}! 🌸`;
      let petalScale = 0.55;

      if (percent >= 100) {
        stageLabel = 'المرحلة: إزهار كامل ومشع! 🌸✨';
        statusDesc = 'رائعة للغاية! حققتِ تناغماً تاماً!';
        speech = '100% تناغم وإشراق تام! 💖';
        petalScale = 1.25;
      } else if (percent >= 75) {
        stageLabel = 'المرحلة: بتلات متفتحة 🌺';
        statusDesc = 'قريبة جداً من القمة، مشعة كالشمس!';
        speech = 'انظري إلى تألقكِ المبهر اليوم! ✨';
        petalScale = 1.05;
      } else if (percent >= 40) {
        stageLabel = 'المرحلة: نبات في نمو 🌿';
        statusDesc = 'تنمين قوة وأنوثة مع كل خطوة.';
        speech = 'تزدادين رقة ومرونة كل يوم!';
        petalScale = 0.85;
      }

      if (stageText) stageText.textContent = stageLabel;
      if (progressStatus) progressStatus.textContent = statusDesc;
      if (speechBubble) speechBubble.textContent = speech;
      if (petalsGroup) {
        petalsGroup.style.transform = `scale(${petalScale})`;
      }
    }

    triggerMascotWink() {
      const mascotEyes = document.getElementById('mascot-eyes');
      const speech = document.getElementById('mascot-speech');
      soundEngine.playCrystalChime();

      if (mascotEyes) {
        mascotEyes.innerHTML = `
          <path d="M 39 46 Q 42 42 45 46" fill="none" stroke="#65465C" stroke-width="2.5" stroke-linecap="round" />
          <circle cx="58" cy="46" r="3.2" fill="#65465C" />
          <circle cx="59" cy="44.8" r="1" fill="#FFFFFF" />
        `;
        setTimeout(() => {
          mascotEyes.innerHTML = `
            <circle cx="42" cy="46" r="3.2" fill="#65465C" />
            <circle cx="58" cy="46" r="3.2" fill="#65465C" />
            <circle cx="43" cy="44.8" r="1" fill="#FFFFFF" />
            <circle cx="59" cy="44.8" r="1" fill="#FFFFFF" />
          `;
        }, 800);
      }

      if (speech) {
        const sweetMessages = [
          'أنتِ تبدعين بكل روعة يا جميلة! 🌸',
          'ظهر مرن وذهن هادئ ✨',
          'اشربي رشفة ماء منعشة الآن 💧',
          'فخورة باستمراريتكِ اللطيفة 💖',
          'التألق والجمال يليقان بكِ دائماً!'
        ];
        speech.textContent = sweetMessages[Math.floor(Math.random() * sweetMessages.length)];
        speech.classList.add('show-bubble');
        setTimeout(() => speech.classList.remove('show-bubble'), 3000);
      }

      this.petalCanvas.burstConfetti();
    }

    // ------------------------------------------------------------------------
    // العداد التنازلي والمحطة القادمة
    // ------------------------------------------------------------------------
    startClockAndUpcomingTimer() {
      setInterval(() => {
        this.renderUpcomingActivity();
      }, 1000);
    }

    renderUpcomingActivity() {
      const now = new Date();
      const currentMinutes = now.getHours() * 60 + now.getMinutes();

      const events = [
        { time: this.state.settings.wakeupTime, title: 'الاستيقاظ وشرب الماء', desc: 'كوب ماء دافئ نقي لإيقاظ الفقرات', icon: '💧', tab: 'stretches' },
        { time: this.state.settings.stretchTime, title: 'إطالات الصباح للظهر', desc: '15 دقيقة إطالة لطيفة للعمود الفقري', icon: '🧘‍♀️', tab: 'stretches', action: 'player' },
        { time: this.state.settings.breakfastTime, title: 'فطور الصباح المغذي', desc: this.state.meals.breakfast.name, icon: '🍓', tab: 'meals' },
        { time: this.state.settings.lunchTime, title: 'غداء التوازن الحيوي', desc: this.state.meals.lunch.name, icon: '🥗', tab: 'meals' },
        { time: '16:30', title: 'استراحة شاي الورد والتنفس', desc: 'ترطيب عميق و5 أنفاس بطيئة', icon: '🫖', tab: 'dashboard' },
        { time: this.state.settings.dinnerTime, title: 'عشاء الهدوء الخفيف', desc: this.state.meals.dinner.name, icon: '🍽️', tab: 'meals' },
        { time: '22:00', title: 'الاسترخاء المسائي قبل النوم', desc: 'نوم هادئ لتعافي عضلات الظهر', icon: '🌙', tab: 'habits' }
      ];

      events.forEach(ev => {
        const [h, m] = ev.time.split(':').map(Number);
        ev.minutes = h * 60 + m;
      });

      events.sort((a, b) => a.minutes - b.minutes);

      let nextEvent = events.find(ev => ev.minutes > currentMinutes);
      let isTomorrow = false;
      if (!nextEvent) {
        nextEvent = events[0];
        isTomorrow = true;
      }

      const upTitle = document.getElementById('upcoming-title');
      const upDesc = document.getElementById('upcoming-desc');
      const upTime = document.getElementById('upcoming-time-tag');
      const upIcon = document.getElementById('upcoming-icon');
      const upCountdown = document.getElementById('upcoming-countdown');
      const upBtn = document.getElementById('upcoming-action-btn');

      if (upTitle) upTitle.textContent = nextEvent.title;
      if (upDesc) upDesc.textContent = nextEvent.desc;
      if (upTime) upTime.textContent = this.formatTime12h(nextEvent.time);
      if (upIcon) upIcon.textContent = nextEvent.icon;

      let diffMinutes = nextEvent.minutes - currentMinutes;
      if (isTomorrow) diffMinutes += 24 * 60;
      let totalSeconds = diffMinutes * 60 - now.getSeconds();
      if (totalSeconds < 0) totalSeconds = 0;

      const hrs = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
      const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
      const secs = String(totalSeconds % 60).padStart(2, '0');

      if (upCountdown) {
        upCountdown.textContent = `يبدأ خلال ${hrs}:${mins}:${secs}`;
      }

      if (upBtn) {
        upBtn.onclick = () => {
          if (nextEvent.action === 'player') {
            this.openWorkoutPlayer(0);
          } else {
            this.switchTab(nextEvent.tab);
          }
        };
      }
    }

    handleUpcomingAction() {
      this.switchTab('stretches');
    }

    formatTime12h(time24) {
      if (!time24) return '';
      const [h, m] = time24.split(':').map(Number);
      const ampm = h >= 12 ? 'م' : 'ص';
      const h12 = h % 12 || 12;
      return `${h12}:${String(m).padStart(2, '0')} ${ampm}`;
    }

    // ------------------------------------------------------------------------
    // العادات السريعة بالرئيسية
    // ------------------------------------------------------------------------
    renderQuickHabits() {
      const checkStretch = document.getElementById('check-quick-stretch');
      const checkWater = document.getElementById('check-quick-water');
      const checkBreakfast = document.getElementById('check-quick-breakfast');
      const checkSleep = document.getElementById('check-quick-sleep');

      if (checkStretch) {
        checkStretch.checked = this.state.stretches.every(s => s.completed);
        checkStretch.onchange = () => {
          const val = checkStretch.checked;
          this.state.stretches.forEach(s => s.completed = val);
          this.onTaskStateChanged('تم تحديث إطالات الصباح!');
        };
      }

      if (checkWater) {
        checkWater.checked = this.state.water.current >= this.state.water.goal;
        checkWater.onchange = () => {
          this.state.water.current = checkWater.checked ? this.state.water.goal : 0;
          this.onTaskStateChanged('تم تحديث شرب الماء!');
        };
      }

      if (checkBreakfast) {
        checkBreakfast.checked = this.state.meals.breakfast.completed;
        checkBreakfast.onchange = () => {
          this.state.meals.breakfast.completed = checkBreakfast.checked;
          this.onTaskStateChanged('تم تسجيل وجبة الفطور!');
        };
      }

      if (checkSleep) {
        const sleepHabit = this.state.habits.find(h => h.id === 'sleep');
        checkSleep.checked = sleepHabit ? sleepHabit.completedToday : false;
        checkSleep.onchange = () => {
          if (sleepHabit) sleepHabit.completedToday = checkSleep.checked;
          this.onTaskStateChanged('تم تسجيل موعد النوم الهادئ!');
        };
      }
    }

    // ------------------------------------------------------------------------
    // جدول وتدفق اليوم
    // ------------------------------------------------------------------------
    renderTimeline(filter = 'all') {
      const container = document.getElementById('dashboard-timeline-list');
      if (!container) return;

      let items = [
        { id: 'water-wake', type: 'stretch', time: this.state.settings.wakeupTime, title: 'الاستيقاظ وشرب الماء', desc: 'كوب ماء نقي لترطيب ديسكات العمود الفقري', icon: '💧', completed: this.state.stretches[0].completed },
        { id: 'stretch-15', type: 'stretch', time: this.state.settings.stretchTime, title: 'روتين إطالة الصباح للظهر (15 دقيقة)', desc: 'مرونة مهدئة لعضلات الظهر والكتفين وأوتار الركبة', icon: '🧘‍♀️', completed: this.state.stretches.slice(1).every(s => s.completed) },
        { id: 'breakfast', type: 'meals', time: this.state.settings.breakfastTime, title: 'فطور التوت الصباحي المغذي', desc: this.state.meals.breakfast.name, icon: '🍓', completed: this.state.meals.breakfast.completed },
        { id: 'lunch', type: 'meals', time: this.state.settings.lunchTime, title: 'غداء التوازن الحيوي', desc: this.state.meals.lunch.name, icon: '🥗', completed: this.state.meals.lunch.completed },
        { id: 'tea', type: 'stretch', time: '16:30', title: 'استراحة شاي الورد والتنفس الهادئ', desc: 'إطالة ناعمة للكتفين و5 أنفاس عميقة', icon: '🫖', completed: false },
        { id: 'dinner', type: 'meals', time: this.state.settings.dinnerTime, title: 'عشاء الهدوء الخفيف', desc: this.state.meals.dinner.name, icon: '🍽️', completed: this.state.meals.dinner.completed },
        { id: 'sleep', type: 'stretch', time: '22:00', title: 'الاسترخاء المسائي قبل النوم', desc: 'نوم عميق ومريح لتعافي العمود الفقري', icon: '🌙', completed: false }
      ];

      if (filter === 'stretch') items = items.filter(i => i.type === 'stretch');
      if (filter === 'meals') items = items.filter(i => i.type === 'meals');

      container.innerHTML = items.map(item => `
        <div class="timeline-item ${item.completed ? 'completed' : ''}" data-item-id="${item.id}">
          <span class="timeline-time-badge">${this.formatTime12h(item.time)}</span>
          <div class="timeline-icon-wrap">${item.icon}</div>
          <div class="timeline-info">
            <h4 class="item-title">${item.title}</h4>
            <p class="item-desc">${item.desc}</p>
          </div>
          <label class="mini-habit-item timeline-action-check">
            <input type="checkbox" ${item.completed ? 'checked' : ''} data-timeline-id="${item.id}">
            <span class="custom-checkbox"></span>
          </label>
        </div>
      `).join('');

      container.querySelectorAll('input[data-timeline-id]').forEach(cb => {
        cb.addEventListener('change', (e) => {
          const id = e.target.getAttribute('data-timeline-id');
          const isChecked = e.target.checked;

          if (id === 'water-wake') {
            this.state.stretches[0].completed = isChecked;
          } else if (id === 'stretch-15') {
            this.state.stretches.forEach(s => s.completed = isChecked);
          } else if (id === 'breakfast') {
            this.state.meals.breakfast.completed = isChecked;
          } else if (id === 'lunch') {
            this.state.meals.lunch.completed = isChecked;
          } else if (id === 'dinner') {
            this.state.meals.dinner.completed = isChecked;
          }

          this.onTaskStateChanged('تم تحديث جدول اليوم! 🌸');
        });
      });
    }

    onTaskStateChanged(msg) {
      soundEngine.playCrystalChime();
      this.saveState();
      this.renderProgressAndMascot();
      this.renderQuickHabits();
      this.renderHydration();
      this.renderHabits();
      this.checkBadgeUnlocks();
      if (msg) this.showToast('تم التحديث', msg);
    }

    // ------------------------------------------------------------------------
    // قسم إطالات الصباح والفيديوهات التوضيحية
    // ------------------------------------------------------------------------
    renderStretchesList() {
      const container = document.getElementById('stretches-list-grid');
      const countLabel = document.getElementById('stretch-exercises-count');
      if (!container) return;

      if (countLabel) countLabel.textContent = `${this.state.stretches.length} خطوات مريحة`;

      container.innerHTML = this.state.stretches.map((ex, index) => {
        const mins = Math.floor(ex.durationSec / 60);
        const secs = ex.durationSec % 60;
        const durationDisplay = mins > 0 ? `${mins} ${mins === 1 ? 'دقيقة' : mins === 2 ? 'دقيقتان' : 'دقائق'}${secs > 0 ? ` و${secs} ثانية` : ''}` : `${secs} ثانية`;

        return `
          <div class="exercise-item-card glass-card ${ex.completed ? 'completed' : ''}">
            <div class="exercise-card-top">
              <span class="exercise-number-badge">${index + 1}</span>
              <span class="exercise-duration-pill">⏱️ ${durationDisplay}</span>
            </div>

            <h3 class="exercise-name-ar">${ex.nameAr}</h3>
            <span class="exercise-name-en">${ex.nameEn}</span>

            <!-- Video / Demonstration Graphic Box with Clickable Play -->
            <div class="exercise-demo-banner" data-watch-video="${index}" title="شاهدي الفيديو التوضيحي">
              ${this.generatePoseSVG(ex.svgType)}
              <div class="demo-banner-overlay">
                <span class="btn-video-play-badge">
                  <span>🎬 شاهد الفيديو التوضيحي</span>
                </span>
              </div>
            </div>

            <p class="exercise-instructions-list">${ex.instructions}</p>

            <div class="exercise-card-footer">
              <span class="exercise-time-cue">${ex.timeCue}</span>
              <div class="exercise-card-actions">
                <button class="btn btn-sm btn-secondary" data-watch-video="${index}" title="فيديو توضيحي">
                  🎬 فيديو
                </button>
                <button class="btn btn-sm ${ex.completed ? 'btn-secondary' : 'btn-primary'}" data-start-exercise="${index}">
                  ${ex.completed ? '✔ مكتمل' : '◀ ابدئي'}
                </button>
              </div>
            </div>
          </div>
        `;
      }).join('');

      container.querySelectorAll('[data-start-exercise]').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.getAttribute('data-start-exercise'), 10);
          this.openWorkoutPlayer(idx);
        });
      });

      container.querySelectorAll('[data-watch-video]').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.getAttribute('data-watch-video'), 10);
          this.openExerciseVideoModal(idx);
        });
      });
    }

    generatePoseSVG(type) {
      switch (type) {
        case 'water-glass':
          return `
            <svg viewBox="0 0 100 80" width="80" height="70">
              <path d="M 35 15 L 65 15 L 60 70 L 40 70 Z" fill="rgba(153, 213, 232, 0.4)" stroke="#71BCE2" stroke-width="2.5" stroke-linejoin="round" />
              <path d="M 38 32 L 62 32 L 59 66 L 41 66 Z" fill="rgba(113, 188, 226, 0.6)" />
              <path d="M 50 18 Q 55 24 50 28" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" fill="none" />
              <circle cx="50" cy="50" r="3" fill="#FFFFFF" opacity="0.8" />
            </svg>
          `;
        case 'warmup-pose':
          return `
            <svg viewBox="0 0 100 80" width="80" height="70">
              <circle cx="50" cy="18" r="7" fill="#EFA6C8" />
              <line x1="50" y1="25" x2="50" y2="52" stroke="#65465C" stroke-width="3" stroke-linecap="round" />
              <path d="M 28 35 Q 50 28 72 35" fill="none" stroke="#65465C" stroke-width="3" stroke-linecap="round" />
              <line x1="50" y1="52" x2="42" y2="74" stroke="#65465C" stroke-width="3" stroke-linecap="round" />
              <line x1="50" y1="52" x2="58" y2="74" stroke="#65465C" stroke-width="3" stroke-linecap="round" />
              <circle cx="50" cy="30" r="22" fill="none" stroke="#EFA6C8" stroke-dasharray="3 3" opacity="0.6" />
            </svg>
          `;
        case 'cat-cow-pose':
          return `
            <svg viewBox="0 0 100 80" width="90" height="70">
              <circle cx="75" cy="32" r="7" fill="#EFA6C8" />
              <path d="M 75 39 C 60 52 35 52 25 42" fill="none" stroke="#65465C" stroke-width="3.5" stroke-linecap="round" />
              <line x1="70" y1="42" x2="70" y2="68" stroke="#65465C" stroke-width="3" stroke-linecap="round" />
              <line x1="28" y1="44" x2="28" y2="68" stroke="#65465C" stroke-width="3" stroke-linecap="round" />
              <line x1="28" y1="68" x2="16" y2="68" stroke="#65465C" stroke-width="3" stroke-linecap="round" />
            </svg>
          `;
        case 'child-pose':
          return `
            <svg viewBox="0 0 100 80" width="90" height="70">
              <circle cx="68" cy="50" r="7" fill="#EFA6C8" />
              <path d="M 28 58 Q 38 42 58 48 Q 65 52 70 56" fill="none" stroke="#65465C" stroke-width="3.5" stroke-linecap="round" />
              <line x1="68" y1="53" x2="88" y2="62" stroke="#65465C" stroke-width="3" stroke-linecap="round" />
              <line x1="20" y1="65" x2="90" y2="65" stroke="#EFA6C8" stroke-width="2" stroke-linecap="round" />
            </svg>
          `;
        case 'side-stretch-pose':
          return `
            <svg viewBox="0 0 100 80" width="80" height="70">
              <circle cx="56" cy="18" r="7" fill="#EFA6C8" />
              <path d="M 54 25 Q 46 40 48 55" fill="none" stroke="#65465C" stroke-width="3.5" stroke-linecap="round" />
              <path d="M 48 26 Q 30 18 36 8" fill="none" stroke="#EFA6C8" stroke-width="3" stroke-linecap="round" />
              <line x1="48" y1="55" x2="42" y2="76" stroke="#65465C" stroke-width="3" stroke-linecap="round" />
              <line x1="48" y1="55" x2="56" y2="76" stroke="#65465C" stroke-width="3" stroke-linecap="round" />
            </svg>
          `;
        case 'hamstring-pose':
          return `
            <svg viewBox="0 0 100 80" width="90" height="70">
              <circle cx="65" cy="28" r="7" fill="#EFA6C8" />
              <path d="M 62 34 L 48 52" stroke="#65465C" stroke-width="3.5" stroke-linecap="round" />
              <line x1="48" y1="52" x2="22" y2="68" stroke="#65465C" stroke-width="3.5" stroke-linecap="round" />
              <line x1="48" y1="52" x2="52" y2="68" stroke="#65465C" stroke-width="3.5" stroke-linecap="round" />
              <line x1="62" y1="34" x2="40" y2="48" stroke="#65465C" stroke-width="2.5" stroke-linecap="round" />
            </svg>
          `;
        case 'shoulder-pose':
          return `
            <svg viewBox="0 0 100 80" width="80" height="70">
              <circle cx="50" cy="18" r="7" fill="#EFA6C8" />
              <line x1="50" y1="25" x2="50" y2="52" stroke="#65465C" stroke-width="3" stroke-linecap="round" />
              <path d="M 32 32 C 40 44 60 44 68 32" fill="none" stroke="#EFA6C8" stroke-width="3" stroke-linecap="round" />
              <line x1="50" y1="52" x2="43" y2="74" stroke="#65465C" stroke-width="3" stroke-linecap="round" />
              <line x1="50" y1="52" x2="57" y2="74" stroke="#65465C" stroke-width="3" stroke-linecap="round" />
            </svg>
          `;
        case 'breathe-pose':
        default:
          return `
            <svg viewBox="0 0 100 80" width="80" height="70">
              <circle cx="50" cy="22" r="7" fill="#EFA6C8" />
              <path d="M 50 29 L 50 56" stroke="#65465C" stroke-width="3.5" stroke-linecap="round" />
              <path d="M 32 66 L 46 56 L 54 56 L 68 66" fill="none" stroke="#65465C" stroke-width="3" stroke-linecap="round" />
              <path d="M 38 40 Q 50 44 62 40" fill="none" stroke="#EFA6C8" stroke-width="2.5" stroke-linecap="round" />
              <circle cx="50" cy="38" r="3" fill="#EFA6C8" />
            </svg>
          `;
      }
    }

    // ------------------------------------------------------------------------
    // نافذة الفيديو التوضيحي المستقلة
    // ------------------------------------------------------------------------
    openExerciseVideoModal(index) {
      this.activeVideoDemoIndex = index;
      const ex = this.state.stretches[index];
      if (!ex) return;

      const title = document.getElementById('demo-video-title');
      const sub = document.getElementById('demo-video-subtitle');
      const iframe = document.getElementById('standalone-video-iframe');
      const tipsList = document.getElementById('demo-video-tips');

      if (title) title.textContent = `فيديو: ${ex.nameAr}`;
      if (sub) sub.textContent = `${ex.nameEn} • المدة المقترحة: ${Math.floor(ex.durationSec / 60)} دقيقة`;

      if (iframe) {
        // استخدام رابط التضمين الآمن من يوتيوب بدون كوكيز
        iframe.src = `https://www.youtube-nocookie.com/embed/${ex.youtubeId}?autoplay=1&rel=0&modestbranding=1`;
      }

      if (tipsList && ex.videoTips) {
        tipsList.innerHTML = ex.videoTips.map(tip => `<li>${tip}</li>`).join('');
      }

      const modal = document.getElementById('modal-exercise-video');
      if (modal) modal.classList.remove('hidden');

      soundEngine.playCrystalChime();
    }

    // ------------------------------------------------------------------------
    // مشغل التمارين الموجه (المؤقت مع خيار الفيديو الداخلي)
    // ------------------------------------------------------------------------
    openWorkoutPlayer(index = 0) {
      this.playerActive = true;
      this.playerExerciseIndex = Math.max(0, Math.min(this.state.stretches.length - 1, index));
      const ex = this.state.stretches[this.playerExerciseIndex];
      this.playerRemainingSeconds = ex.durationSec;
      this.playerIsPaused = false;
      this.playerViewMode = 'pose';

      const modal = document.getElementById('modal-workout-player');
      if (modal) modal.classList.remove('hidden');

      this.setPlayerViewMode('pose');
      this.renderPlayerContent();
      this.startPlayerTimer();
      soundEngine.playMeditationBell();
    }

    closeWorkoutPlayer() {
      this.playerActive = false;
      clearInterval(this.playerTimerInterval);

      // إيقاف تشغيل الفيديو عند إغلاق المشغل
      const iframe = document.getElementById('player-video-iframe');
      if (iframe) iframe.src = '';

      const modal = document.getElementById('modal-workout-player');
      if (modal) modal.classList.add('hidden');
    }

    setPlayerViewMode(mode) {
      this.playerViewMode = mode;
      const tabPose = document.getElementById('tab-mode-pose');
      const tabVideo = document.getElementById('tab-mode-video');
      const stagePose = document.getElementById('player-stage-pose');
      const stageVideo = document.getElementById('player-stage-video');
      const iframe = document.getElementById('player-video-iframe');
      const ex = this.state.stretches[this.playerExerciseIndex];

      if (mode === 'pose') {
        if (tabPose) tabPose.classList.add('active');
        if (tabVideo) tabVideo.classList.remove('active');
        if (stagePose) stagePose.classList.remove('hidden');
        if (stageVideo) stageVideo.classList.add('hidden');
        if (iframe) iframe.src = '';
      } else {
        if (tabPose) tabPose.classList.remove('active');
        if (tabVideo) tabVideo.classList.add('active');
        if (stagePose) stagePose.classList.add('hidden');
        if (stageVideo) stageVideo.classList.remove('hidden');
        if (iframe && ex) {
          iframe.src = `https://www.youtube-nocookie.com/embed/${ex.youtubeId}?autoplay=1&rel=0&modestbranding=1`;
        }
      }
    }

    renderPlayerContent() {
      const ex = this.state.stretches[this.playerExerciseIndex];
      if (!ex) return;

      const stepIndicator = document.getElementById('player-step-indicator');
      const titleAr = document.getElementById('player-title-ar');
      const titleEn = document.getElementById('player-title-en');
      const instruction = document.getElementById('player-instruction');
      const poseGraphic = document.getElementById('player-pose-graphic');
      const timerDisplay = document.getElementById('player-timer-display');

      if (stepIndicator) stepIndicator.textContent = `التمرين ${this.playerExerciseIndex + 1} من ${this.state.stretches.length}`;
      if (titleAr) titleAr.textContent = ex.nameAr;
      if (titleEn) titleEn.textContent = ex.nameEn;
      if (instruction) instruction.textContent = ex.instructions;
      if (poseGraphic) poseGraphic.innerHTML = this.generatePoseSVG(ex.svgType);
      if (timerDisplay) this.updatePlayerTimerDisplay();

      // تحديث الفيديو إذا كان المستخدم يشاهد الفيديو داخل المشغل
      if (this.playerViewMode === 'video') {
        const iframe = document.getElementById('player-video-iframe');
        if (iframe) {
          iframe.src = `https://www.youtube-nocookie.com/embed/${ex.youtubeId}?autoplay=1&rel=0&modestbranding=1`;
        }
      }

      const playIcon = document.getElementById('player-play-icon');
      const pauseIcon = document.getElementById('player-pause-icon');
      if (playIcon && pauseIcon) {
        if (this.playerIsPaused) {
          playIcon.classList.remove('hidden');
          pauseIcon.classList.add('hidden');
        } else {
          playIcon.classList.add('hidden');
          pauseIcon.classList.remove('hidden');
        }
      }
    }

    startPlayerTimer() {
      clearInterval(this.playerTimerInterval);
      this.playerTimerInterval = setInterval(() => {
        if (!this.playerIsPaused && this.playerRemainingSeconds > 0) {
          this.playerRemainingSeconds--;
          this.updatePlayerTimerDisplay();

          if (this.playerRemainingSeconds <= 3 && this.playerRemainingSeconds > 0) {
            soundEngine.playTick();
          }

          if (this.playerRemainingSeconds <= 0) {
            this.handleExerciseCompleted();
          }
        }
      }, 1000);
    }

    updatePlayerTimerDisplay() {
      const timerDisplay = document.getElementById('player-timer-display');
      const circle = document.getElementById('player-timer-circle');
      const ex = this.state.stretches[this.playerExerciseIndex];

      const mins = Math.floor(this.playerRemainingSeconds / 60);
      const secs = this.playerRemainingSeconds % 60;
      const formatted = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

      if (timerDisplay) timerDisplay.textContent = formatted;

      if (circle && ex) {
        const circumference = 2 * Math.PI * 80;
        const ratio = this.playerRemainingSeconds / ex.durationSec;
        circle.style.strokeDashoffset = (1 - ratio) * circumference;
      }
    }

    togglePlayerPlayPause() {
      this.playerIsPaused = !this.playerIsPaused;
      this.renderPlayerContent();
    }

    nextExercise() {
      if (this.playerExerciseIndex < this.state.stretches.length - 1) {
        this.openWorkoutPlayer(this.playerExerciseIndex + 1);
      } else {
        this.completeFullRoutine();
      }
    }

    prevExercise() {
      if (this.playerExerciseIndex > 0) {
        this.openWorkoutPlayer(this.playerExerciseIndex - 1);
      }
    }

    handleExerciseCompleted() {
      soundEngine.playCrystalChime();
      this.state.stretches[this.playerExerciseIndex].completed = true;
      this.saveState();
      this.renderStretchesList();
      this.renderProgressAndMascot();

      if (this.playerExerciseIndex < this.state.stretches.length - 1) {
        this.showToast('أحسنتِ الخطوة! 🌸', `رائعة! ننتقل إلى: ${this.state.stretches[this.playerExerciseIndex + 1].nameAr}`);
        this.nextExercise();
      } else {
        this.completeFullRoutine();
      }
    }

    completeFullRoutine() {
      this.closeWorkoutPlayer();
      this.state.stretches.forEach(s => s.completed = true);
      this.saveState();
      this.renderAll();

      soundEngine.playCelebrationFanfare();
      this.petalCanvas.burstConfetti();

      const modal = document.getElementById('modal-celebration');
      if (modal) modal.classList.remove('hidden');

      this.checkBadgeUnlocks();
    }

    // ------------------------------------------------------------------------
    // تخصيص أوقات التمارين
    // ------------------------------------------------------------------------
    openCustomizeStretchesModal() {
      const container = document.getElementById('customize-stretch-items');
      if (!container) return;

      container.innerHTML = this.state.stretches.map((s, idx) => `
        <div class="customize-row" style="display:flex; justify-content:space-between; align-items:center; padding:10px 0; border-bottom:1px solid rgba(239,166,200,0.3);">
          <div>
            <strong>${idx + 1}. ${s.nameAr}</strong>
            <p style="font-size:0.8rem; color:var(--c-accent);">${s.nameEn}</p>
          </div>
          <div style="display:flex; align-items:center; gap:8px;">
            <input type="number" id="custom-dur-${s.id}" min="15" max="600" step="15" value="${s.durationSec}" style="width:70px; padding:6px; border-radius:6px; border:1px solid var(--glass-border); text-align:center;">
            <span style="font-size:0.8rem;">ثانية</span>
          </div>
        </div>
      `).join('');

      const modal = document.getElementById('modal-customize-stretches');
      if (modal) modal.classList.remove('hidden');
    }

    saveCustomizedStretches() {
      this.state.stretches.forEach(s => {
        const inp = document.getElementById(`custom-dur-${s.id}`);
        if (inp && !isNaN(inp.value) && inp.value >= 15) {
          s.durationSec = parseInt(inp.value, 10);
        }
      });
      this.saveState();
      this.renderStretchesList();
      this.closeModal('modal-customize-stretches');
      this.showToast('تم حفظ التعديلات', 'تم تحديث أوقات تمارين الصباح بنجاح! 🌸');
    }

    resetCustomizedStretches() {
      this.state.stretches = JSON.parse(JSON.stringify(DEFAULT_STRETCHES));
      this.saveState();
      this.openCustomizeStretchesModal();
      this.renderStretchesList();
      this.showToast('تمت استعادة الأوقات', 'تمت استعادة مدد التمارين الافتراضية.');
    }

    // ------------------------------------------------------------------------
    // مخطط الوجبات وشرب الماء
    // ------------------------------------------------------------------------
    renderHydration() {
      const current = this.state.water.current;
      const goal = this.state.water.goal;
      const percent = Math.min(100, Math.round((current / goal) * 100));

      const curText = document.getElementById('water-current-text');
      const goalText = document.getElementById('water-goal-text');
      const waterFill = document.getElementById('main-water-fill');
      const sideWaterCount = document.getElementById('sidebar-water-count');
      const sideWaterBar = document.getElementById('sidebar-water-bar');

      if (curText) curText.textContent = current;
      if (goalText) goalText.textContent = goal;
      if (waterFill) waterFill.style.height = `${percent}%`;
      if (sideWaterCount) sideWaterCount.textContent = `${current} / ${goal} مل`;
      if (sideWaterBar) sideWaterBar.style.width = `${percent}%`;

      const cupsContainer = document.getElementById('water-cups-container');
      if (cupsContainer) {
        const totalGlasses = 8;
        const filledGlasses = Math.floor(current / (goal / totalGlasses));
        let html = '';

        for (let i = 0; i < totalGlasses; i++) {
          const isFilled = i < filledGlasses;
          html += `
            <button class="water-glass-btn ${isFilled ? 'filled' : ''}" data-glass-idx="${i}" title="${(i + 1) * 250} مل">
              💧
            </button>
          `;
        }
        cupsContainer.innerHTML = html;

        cupsContainer.querySelectorAll('[data-glass-idx]').forEach(btn => {
          btn.addEventListener('click', () => {
            const idx = parseInt(btn.getAttribute('data-glass-idx'), 10);
            this.state.water.current = (idx + 1) * (goal / totalGlasses);
            this.onTaskStateChanged('تم تحديث شرب الماء! 💧');
          });
        });
      }
    }

    addWater(amount) {
      this.state.water.current = Math.max(0, this.state.water.current + amount);
      if (this.state.water.current >= this.state.water.goal) {
        soundEngine.playCrystalChime();
        this.petalCanvas.burstConfetti();
        this.showToast('حققتِ هدف شرب الماء اليومي! 💧', 'خلاياكِ تنتعش وبشرتكِ تتألق حيوية ونضارة!');
      }
      this.onTaskStateChanged();
    }

    renderMeals() {
      const container = document.getElementById('meals-cards-container');
      if (!container) return;

      const mealKeys = ['breakfast', 'lunch', 'dinner'];
      const mealLabels = {
        breakfast: { title: 'الفطور', badge: 'طاقة الصباح 🍳' },
        lunch: { title: 'الغداء', badge: 'حيوية الظهيرة 🥗' },
        dinner: { title: 'العشاء', badge: 'هدوء المساء 🍽️' }
      };

      container.innerHTML = mealKeys.map(key => {
        const meal = this.state.meals[key];
        const info = mealLabels[key];

        return `
          <div class="meal-card glass-card ${meal.completed ? 'completed' : ''}" id="card-meal-${key}">
            <div class="meal-image-wrap">
              <img src="${meal.image}" alt="${meal.name}" class="meal-photo" onerror="this.src='assets/images/hero.jpg'">
              <span class="meal-type-badge">${info.badge}</span>
              <span class="meal-time-tag">⏱️ ${this.formatTime12h(meal.time)}</span>
            </div>

            <div class="meal-card-body">
              <div class="meal-title-row">
                <h3 class="meal-name">${meal.name}</h3>
                <span class="meal-category-tag">${meal.category}</span>
              </div>

              <div class="meal-items-title">المقترحات والمكونات المغذية:</div>
              <div class="meal-chips-wrap">
                ${meal.items.map(item => `<span class="meal-chip">${item}</span>`).join('')}
              </div>

              <p class="meal-notes">${meal.notes || 'وجبة مغذية، مرنة، ولطيفة على جهازكِ الهضمي.'}</p>

              <div class="meal-card-footer">
                <label class="meal-eaten-label">
                  <input type="checkbox" id="check-meal-${key}" ${meal.completed ? 'checked' : ''}>
                  <span class="custom-checkbox"></span>
                  <span>${meal.completed ? 'تم تناولها بنعومة ولذة ✨' : 'تسجيل تناول الوجبة'}</span>
                </label>

                <button class="btn btn-sm btn-secondary" data-edit-meal="${key}">
                  ✏️ تعديل الوجبة
                </button>
              </div>
            </div>
          </div>
        `;
      }).join('');

      mealKeys.forEach(key => {
        const cb = document.getElementById(`check-meal-${key}`);
        if (cb) {
          cb.addEventListener('change', () => {
            this.state.meals[key].completed = cb.checked;
            this.onTaskStateChanged(`تم تسجيل وجبة ${mealLabels[key].title} بنجاح! 🍓`);
          });
        }
      });

      container.querySelectorAll('[data-edit-meal]').forEach(btn => {
        btn.addEventListener('click', () => {
          const key = btn.getAttribute('data-edit-meal');
          this.openEditMealModal(key);
        });
      });
    }

    openEditMealModal(mealKey) {
      const meal = this.state.meals[mealKey];
      if (!meal) return;

      const titles = { breakfast: 'وجبة الفطور', lunch: 'وجبة الغداء', dinner: 'وجبة العشاء' };
      document.getElementById('edit-meal-id').value = mealKey;
      document.getElementById('edit-meal-title').textContent = `تعديل ${titles[mealKey] || 'الوجبة'}`;
      document.getElementById('edit-meal-name').value = meal.name;
      document.getElementById('edit-meal-time').value = meal.time;
      document.getElementById('edit-meal-category').value = meal.category;
      document.getElementById('edit-meal-items').value = meal.items.join('، ');
      document.getElementById('edit-meal-notes').value = meal.notes || '';

      const modal = document.getElementById('modal-edit-meal');
      if (modal) modal.classList.remove('hidden');
    }

    saveEditedMeal() {
      const mealKey = document.getElementById('edit-meal-id').value;
      if (!this.state.meals[mealKey]) return;

      this.state.meals[mealKey].name = document.getElementById('edit-meal-name').value.trim();
      this.state.meals[mealKey].time = document.getElementById('edit-meal-time').value;
      this.state.meals[mealKey].category = document.getElementById('edit-meal-category').value;
      this.state.meals[mealKey].items = document.getElementById('edit-meal-items').value
        .split(/[،,]/)
        .map(i => i.trim())
        .filter(Boolean);
      this.state.meals[mealKey].notes = document.getElementById('edit-meal-notes').value.trim();

      this.saveState();
      this.renderMeals();
      this.closeModal('modal-edit-meal');
      this.showToast('تم حفظ الوجبة', `تم تحديث خطة الوجبة بنجاح! 🍓`);
    }

    // ------------------------------------------------------------------------
    // الجدول والتقويم الأسبوعي
    // ------------------------------------------------------------------------
    renderScheduleTimeline() {
      const container = document.getElementById('full-schedule-timeline');
      if (!container) return;

      const scheduleEvents = [
        { id: 'ev-wake', time: this.state.settings.wakeupTime, title: 'الاستيقاظ وشرب الماء', sub: 'كوب ماء نقي لترطيب فقرات الظهر وإنعاش الجسم', done: this.state.stretches[0].completed },
        { id: 'ev-stretch', time: this.state.settings.stretchTime, title: 'روتين إطالة الظهر والعضلات', sub: '15 دقيقة إطالة لطيفة ومريحة لمرونة العمود الفقري', done: this.state.stretches.slice(1).every(s => s.completed) },
        { id: 'ev-breakfast', time: this.state.settings.breakfastTime, title: 'فطور الصباح المغذي', sub: this.state.meals.breakfast.name, done: this.state.meals.breakfast.completed },
        { id: 'ev-water-mid', time: '11:00', title: 'استراحة ترطيب الضحى', sub: 'شرب 250 مل ماء وتدوير الكتفين بلطف', done: false },
        { id: 'ev-lunch', time: this.state.settings.lunchTime, title: 'غداء التوازن الحيوي', sub: this.state.meals.lunch.name, done: this.state.meals.lunch.completed },
        { id: 'ev-tea', time: '16:30', title: 'استراحة شاي الورد والتنفس', sub: '5 أنفاس بطيئة وعميقة لاستعادة صفاء الذهن', done: false },
        { id: 'ev-dinner', time: this.state.settings.dinnerTime, title: 'عشاء الهدوء الخفيف', sub: this.state.meals.dinner.name, done: this.state.meals.dinner.completed },
        { id: 'ev-winddown', time: '21:30', title: 'عناية البشرة والقراءة الهادئة', sub: 'تهدئة الإضاءة والاستعداد لنوم مريح', done: false },
        { id: 'ev-sleep', time: '22:30', title: 'موعد النوم الهادئ', sub: 'النوم العميق يسمح لعضلات الظهر بالتجدد والشفاء', done: false }
      ];

      this.state.customActivities.forEach(ca => {
        scheduleEvents.push({
          id: ca.id,
          time: ca.time,
          title: ca.name,
          sub: ca.notes || ca.category,
          done: ca.completed
        });
      });

      scheduleEvents.sort((a, b) => {
        const [ah, am] = a.time.split(':').map(Number);
        const [bh, bm] = b.time.split(':').map(Number);
        return (ah * 60 + am) - (bh * 60 + bm);
      });

      container.innerHTML = scheduleEvents.map(ev => `
        <div class="sched-slot">
          <span class="sched-time">${this.formatTime12h(ev.time)}</span>
          <span class="sched-dot"></span>
          <div class="sched-card ${ev.done ? 'done' : ''}">
            <div>
              <h4 class="sched-item-title">${ev.title}</h4>
              <p class="sched-item-sub">${ev.sub}</p>
            </div>
            <label class="mini-habit-item">
              <input type="checkbox" ${ev.done ? 'checked' : ''} data-sched-id="${ev.id}">
              <span class="custom-checkbox"></span>
            </label>
          </div>
        </div>
      `).join('');

      container.querySelectorAll('[data-sched-id]').forEach(cb => {
        cb.addEventListener('change', (e) => {
          const id = e.target.getAttribute('data-sched-id');
          const isDone = e.target.checked;

          const ca = this.state.customActivities.find(a => a.id === id);
          if (ca) ca.completed = isDone;

          if (id === 'ev-breakfast') this.state.meals.breakfast.completed = isDone;
          if (id === 'ev-lunch') this.state.meals.lunch.completed = isDone;
          if (id === 'ev-dinner') this.state.meals.dinner.completed = isDone;

          this.onTaskStateChanged('تم تحديث الجدول الزمني! 🌸');
        });
      });
    }

    renderWeeklySchedule() {
      const container = document.getElementById('weekly-matrix-grid');
      if (!container) return;

      const days = ['الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت', 'الأحد'];
      container.innerHTML = days.map((dayName, idx) => `
        <div class="weekly-col">
          <div class="weekly-col-header">
            <span class="weekly-day-name">${dayName}</span>
            <div class="weekly-day-num">${idx + 1}</div>
          </div>
          <div class="weekly-tasks-list">
            <div class="weekly-task-pill ${idx < 4 ? 'completed' : ''}">🧘‍♀️ 7:10 ص إطالة الظهر</div>
            <div class="weekly-task-pill ${idx < 4 ? 'completed' : ''}">💧 2000 مل ماء نقي</div>
            <div class="weekly-task-pill ${idx < 3 ? 'completed' : ''}">🍳 8:00 ص فطور صحي</div>
            <div class="weekly-task-pill ${idx < 3 ? 'completed' : ''}">🥗 2:00 م غداء متوازن</div>
            <div class="weekly-task-pill ${idx < 3 ? 'completed' : ''}">🍽️ 8:00 م عشاء خفيف</div>
            <div class="weekly-task-pill">🌙 10:30 م نوم هادئ</div>
          </div>
        </div>
      `).join('');
    }

    openActivityModal() {
      document.getElementById('activity-id').value = '';
      document.getElementById('activity-name').value = '';
      document.getElementById('activity-time').value = '16:00';
      document.getElementById('activity-notes').value = '';
      const modal = document.getElementById('modal-activity');
      if (modal) modal.classList.remove('hidden');
    }

    saveCustomActivity() {
      const name = document.getElementById('activity-name').value.trim();
      const time = document.getElementById('activity-time').value;
      const category = document.getElementById('activity-category').value;
      const notes = document.getElementById('activity-notes').value.trim();

      if (!name) return;

      this.state.customActivities.push({
        id: 'act-' + Date.now(),
        name,
        time,
        category,
        notes,
        completed: false
      });

      this.saveState();
      this.renderScheduleTimeline();
      this.closeModal('modal-activity');
      this.showToast('تمت إضافة النشاط', `أضيف "${name}" إلى جدولكِ! 📅`);
    }

    // ------------------------------------------------------------------------
    // متتبع العادات ونظام الأوسمة
    // ------------------------------------------------------------------------
    renderHabits() {
      const tbody = document.getElementById('habits-table-body');
      const streakCounter = document.getElementById('habits-streak-counter');

      if (streakCounter) streakCounter.textContent = this.state.streak.current;
      if (!tbody) return;

      tbody.innerHTML = this.state.habits.map((habit, habitIdx) => {
        const completedDays = habit.weekHistory.filter(Boolean).length;
        const rate = Math.round((completedDays / 7) * 100);

        let dotsHtml = '';
        for (let d = 0; d < 7; d++) {
          const isDone = habit.weekHistory[d];
          dotsHtml += `
            <td>
              <button class="habit-dot-btn ${isDone ? 'completed' : ''}" data-habit-idx="${habitIdx}" data-day-idx="${d}" title="اليوم ${d + 1}">
                ${isDone ? '✔' : ''}
              </button>
            </td>
          `;
        }

        return `
          <tr>
            <td>
              <span style="margin-left: 6px;">${habit.icon}</span>
              ${habit.name}
            </td>
            ${dotsHtml}
            <td>
              <span class="habit-rate-pill">${rate}%</span>
            </td>
          </tr>
        `;
      }).join('');

      tbody.querySelectorAll('.habit-dot-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const hIdx = parseInt(btn.getAttribute('data-habit-idx'), 10);
          const dIdx = parseInt(btn.getAttribute('data-day-idx'), 10);

          this.state.habits[hIdx].weekHistory[dIdx] = !this.state.habits[hIdx].weekHistory[dIdx];
          soundEngine.playCrystalChime();
          this.saveState();
          this.renderHabits();
          this.checkBadgeUnlocks();
        });
      });
    }

    renderBadges() {
      const container = document.getElementById('badges-container');
      const countLabel = document.getElementById('badges-unlocked-count');
      if (!container) return;

      const unlockedCount = this.state.badges.filter(b => b.unlocked).length;
      if (countLabel) countLabel.textContent = `${unlockedCount} من ${this.state.badges.length} مفتوحة`;

      container.innerHTML = this.state.badges.map(badge => `
        <div class="badge-card ${badge.unlocked ? 'unlocked' : 'locked'}">
          <div class="badge-icon-frame">${badge.icon}</div>
          <h4 class="badge-name">${badge.name}</h4>
          <p class="badge-desc">${badge.desc}</p>
          <span class="badge-status-pill">${badge.unlocked ? '✔ وسام مفتوح' : 'مغلق حالياً'}</span>
        </div>
      `).join('');
    }

    checkBadgeUnlocks() {
      let newlyUnlocked = false;

      this.state.badges.forEach(badge => {
        if (!badge.unlocked) {
          if (badge.id === 'morning_blossom' && this.state.stretches.every(s => s.completed)) {
            badge.unlocked = true;
            newlyUnlocked = badge;
          } else if (badge.id === 'hydration_fairy' && this.state.water.current >= this.state.water.goal) {
            badge.unlocked = true;
            newlyUnlocked = badge;
          } else if (badge.id === 'glow_fuel' && this.state.meals.breakfast.completed && this.state.meals.lunch.completed && this.state.meals.dinner.completed) {
            badge.unlocked = true;
            newlyUnlocked = badge;
          } else if (badge.id === 'self_love' && this.calculateProgress().percent >= 100) {
            badge.unlocked = true;
            newlyUnlocked = badge;
          }
        }
      });

      if (newlyUnlocked) {
        soundEngine.playCelebrationFanfare();
        this.petalCanvas.burstConfetti();
        this.showToast('🏅 وسام جديد مفتوح!', `مبارك يا جميلة! تم فتح وسام "${newlyUnlocked.name}"! ✨`);
        this.renderBadges();
      }
    }

    // ------------------------------------------------------------------------
    // الإعدادات والتخصيص
    // ------------------------------------------------------------------------
    populateSettingsForm() {
      const s = this.state.settings;
      const nameInput = document.getElementById('setting-name');
      const wakeInput = document.getElementById('setting-wakeup-time');
      const stretchInput = document.getElementById('setting-stretch-time');
      const breakInput = document.getElementById('setting-breakfast-time');
      const lunchInput = document.getElementById('setting-lunch-time');
      const dinnerInput = document.getElementById('setting-dinner-time');
      const waterInput = document.getElementById('setting-water-goal');
      const notifToggle = document.getElementById('setting-notifications-toggle');
      const soundToggle = document.getElementById('setting-sound-toggle');
      const petalsToggle = document.getElementById('setting-petals-toggle');

      if (nameInput) nameInput.value = s.name;
      if (wakeInput) wakeInput.value = s.wakeupTime;
      if (stretchInput) stretchInput.value = s.stretchTime;
      if (breakInput) breakInput.value = s.breakfastTime;
      if (lunchInput) lunchInput.value = s.lunchTime;
      if (dinnerInput) dinnerInput.value = s.dinnerTime;
      if (waterInput) waterInput.value = s.waterGoal;
      if (notifToggle) notifToggle.checked = s.browserNotifs;
      if (soundToggle) soundToggle.checked = s.soundEnabled;
      if (petalsToggle) petalsToggle.checked = s.petalsEnabled;
    }

    saveSettingsFromForm() {
      const s = this.state.settings;
      s.name = document.getElementById('setting-name').value.trim() || 'صوفيا';
      s.wakeupTime = document.getElementById('setting-wakeup-time').value;
      s.stretchTime = document.getElementById('setting-stretch-time').value;
      s.breakfastTime = document.getElementById('setting-breakfast-time').value;
      s.lunchTime = document.getElementById('setting-lunch-time').value;
      s.dinnerTime = document.getElementById('setting-dinner-time').value;
      s.waterGoal = parseInt(document.getElementById('setting-water-goal').value, 10) || 2000;
      this.state.water.goal = s.waterGoal;

      s.browserNotifs = document.getElementById('setting-notifications-toggle').checked;
      s.soundEnabled = document.getElementById('setting-sound-toggle').checked;
      soundEngine.enabled = s.soundEnabled;

      s.petalsEnabled = document.getElementById('setting-petals-toggle').checked;
      this.petalCanvas.enabled = s.petalsEnabled;

      this.saveState();
      this.renderAll();
      soundEngine.playCrystalChime();
      this.showToast('تم حفظ الإعدادات', 'تم تحديث جدولكِ ولمساتكِ الشخصية بنجاح! 🌸');
    }

    // ------------------------------------------------------------------------
    // التنبيهات والإشعارات
    // ------------------------------------------------------------------------
    scheduleNotificationChecks() {
      setInterval(() => {
        const now = new Date();
        const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

        if (timeStr === this.state.settings.stretchTime) {
          this.triggerAlert('وقت إطالات الصباح 🧘‍♀️', 'حان وقت 15 دقيقة إطالة لطيفة لمرونة الظهر والعمود الفقري!');
        } else if (timeStr === this.state.settings.breakfastTime) {
          this.triggerAlert('موعد وجبة الفطور 🍓', 'استمتعي بوجبة فطور لذيذة ومغذية ليوم مشرق!');
        } else if (timeStr === this.state.settings.lunchTime) {
          this.triggerAlert('موعد وجبة الغداء 🥗', 'استراحة واعية للاستمتاع بوعاء الغداء الصحي المتوازن.');
        } else if (timeStr === this.state.settings.dinnerTime) {
          this.triggerAlert('موعد وجبة العشاء 🍽️', 'وقت وجبة عشاء دافئة وخفيفة تهيئكِ لنوم هادئ.');
        }
      }, 60000);
    }

    triggerAlert(title, message) {
      soundEngine.playCrystalChime();
      this.showToast(title, message);

      if (this.state.settings.browserNotifs && 'Notification' in window && Notification.permission === 'granted') {
        try {
          new Notification(title, {
            body: message,
            icon: 'assets/images/hero.jpg'
          });
        } catch (e) {
          console.warn('خطأ في إرسال إشعار المتصفح', e);
        }
      }
    }

    requestBrowserNotificationPermission() {
      if (!('Notification' in window)) {
        alert('متصفحكِ لا يدعم إشعارات سطح المكتب.');
        return;
      }

      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          this.state.settings.browserNotifs = true;
          this.saveState();
          this.showToast('تم تفعيل الإشعارات! 🔔', 'ستصلكِ تذكيرات لطيفة أثناء فتح التطبيق.');
        } else {
          this.showToast('تم رفض الإذن', 'لم يتم تفعيل إشعارات المتصفح.');
        }
      });
    }

    showToast(title, message) {
      const container = document.getElementById('toast-container');
      if (!container) return;

      const toast = document.createElement('div');
      toast.className = 'toast-item';
      toast.innerHTML = `
        <span class="toast-icon">🌸</span>
        <div class="toast-content">
          <strong>${title}</strong>
          <p>${message}</p>
        </div>
      `;

      container.appendChild(toast);

      setTimeout(() => {
        toast.classList.add('leaving');
        setTimeout(() => toast.remove(), 400);
      }, 4200);
    }

    closeModal(modalId) {
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.add('hidden');
        // تفريغ أي فيديو لتجنب استمرار الصوت في الخلفية
        const iframes = modal.querySelectorAll('iframe');
        iframes.forEach(f => f.src = '');
      }
    }
  }

  window.addEventListener('DOMContentLoaded', () => {
    window.blossomApp = new BlossomApp();
  });

})();
