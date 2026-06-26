import { useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowUpRight,
  Battery,
  Bookmark,
  CalendarDays,
  Home,
  Info,
  Layers3,
  Mail,
  MapPin,
  PackageCheck,
  Palette,
  Pause,
  PenTool,
  Phone,
  Play,
  ScanLine,
  Send,
  UserRound,
  Wifi,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import BlurText from './components/BlurText';
import Masonry from './components/Masonry';

const PROJECT_GALLERY_RETURN_Y_KEY = 'portfolioProjectGalleryReturnY';
const PROJECT_GALLERY_RETURN_URL_KEY = 'portfolioProjectGalleryReturnUrl';
const PROJECT_SKIP_INTRO_KEY = 'portfolioProjectSkipIntro';

const rememberProjectGalleryReturn = () => {
  if (typeof window === 'undefined') return;
  window.sessionStorage.setItem(PROJECT_GALLERY_RETURN_Y_KEY, String(window.scrollY));
  window.sessionStorage.setItem(
    PROJECT_GALLERY_RETURN_URL_KEY,
    `${window.location.pathname}${window.location.search}${window.location.hash}`,
  );
  window.sessionStorage.setItem(PROJECT_SKIP_INTRO_KEY, '1');
};

const markProjectGalleryReturn = () => {
  if (typeof window === 'undefined') return;
  window.sessionStorage.setItem(PROJECT_SKIP_INTRO_KEY, '1');
};

const profile = {
  name: '陈程',
  title: '包装设计 / 平面设计',
  location: '广州 · 白云区',
  phone: '13265996970',
  email: '1069883202@qq.com',
  school: '广东外语外贸大学公开学院',
  major: '电子商务（大专）',
  birth: '1995 - 10 - 27',
  hometown: '广东省 化州市',
  residence: '广州市 白云区 永泰',
  intro:
    '拥有 7 年资深化妆品平面设计经验，精通美妆产品包装设计、品牌视觉打造，了解化妆品包装材质及生产工艺。能够从创意构思、材质工艺、建模渲染、印刷分版到成品落地进行完整把控，也能兼顾详情页、主图、活动海报、店铺页面与展会物料等电商视觉。',
};

const stats = [
  { value: '7+', label: '7年包装/平面设计经验' },
  { value: 'N+', label: 'N个项目设计提案与落地经验' },
  { value: '6', label: '熟练使用6个设计软件及AI工具' },
];

const experiences = [
  {
    period: '2022.09 - 2026.03',
    company: '广州欧博化妆品有限公司',
    role: '包装设计 / OEM ODM 项目视觉',
    detail:
      '负责护肤品内外包装设计，输出印刷工艺分版与大货标注，跟进生产落地，参与旗下品牌新品开发、建模渲染提案及展会物料设计。',
  },
  {
    period: '2020.08 - 2021.07',
    company: '澳泰优品生物科技有限公司',
    role: '电商视觉 / 包装设计',
    detail:
      '负责护肤品、保健品与日用品店铺首页、详情页、主图设计，兼顾新品包装、日常宣传图和线下展会物料。',
  },
  {
    period: '2019.05 - 2020.03',
    company: '广州依露美化妆品有限公司',
    role: '化妆品工厂视觉设计',
    detail:
      '配合运营部门完成日常视觉设计、化妆品包装设计、产品与工厂宣传物料，并协同团队完成多类型设计工作。',
  },
];

const projects = [
  {
    tag: 'Packaging System',
    title: '护肤品包装体系',
    text: '从瓶型、外盒、材质工艺到大货文件，建立统一而可落地的产品包装视觉。',
    image: '/assets/cosmetic-packaging-board.png',
  },
  {
    tag: 'Brand Visual',
    title: '品牌视觉与新品提案',
    text: '围绕美妆行业调性进行视觉策略、版式语言、3D 渲染与提案表达。',
    image: '/assets/cosmetic-packaging-board.png',
  },
  {
    tag: 'E-commerce',
    title: '电商页面与活动视觉',
    text: '覆盖详情页、主图、店铺首页、活动海报，在商业效率与审美之间取得平衡。',
    image: '/assets/cosmetic-packaging-board.png',
  },
];

const greenTeaConcept = [
  '包装与瓶身统一采用低饱和森林绿，这是绿茶护肤品类的标志性色彩，直接关联天然植物萃取、纯净、环保的核心联想，契合绿茶成分的天然属性。',
  '绿色调的深浅层次（深绿纸盒 + 半透明墨绿瓶身），既呼应了茶叶萃取的自然过程，也营造出高级、沉稳的质感，区别于廉价护肤品的亮绿设计。',
  '搭配烫金文字，用金色的精致感中和绿色的厚重感，提升轻奢定位，同时强化品牌标识的辨识度。',
];

const greenTeaCards = [
  {
    id: 'green-tea-display',
    tag: 'Hero Display',
    title: '绿茶精华乳展示图',
    img: '/assets/green-tea/display.jpg?v=20260613-180249',
    naturalWidth: 3072,
    naturalHeight: 5504,
    galleryPath: '/green-tea-gallery',
    conceptHeading: {
      cn: '绿茶精华滋养乳液',
      en: ['Green Tea Essence', 'Skin-Nourishing  Lotion'],
    },
    concept: greenTeaConcept,
    conceptHint: '点击图片查看刀版图与细节图。',
  },
];

const greenTeaGallerySections = [
  {
    title: '刀版图',
    items: [
      { src: '/assets/green-tea/dieline-box.jpg?v=20260612-082333', label: '彩盒刀版图' },
      { src: '/assets/green-tea/dieline-bottle.jpg?v=20260613-092919', label: '玻璃瓶刀版图' },
    ],
  },
  {
    title: '细节图',
    items: [
      { src: '/assets/green-tea/detail-2.png', label: '细节图 01' },
      { src: '/assets/green-tea/detail-3.png', label: '细节图 02' },
      { src: '/assets/green-tea/detail-4.png', label: '细节图 03' },
      { src: '/assets/green-tea/detail-5.png', label: '细节图 04' },
      { src: '/assets/green-tea/detail-6.png', label: '细节图 05' },
      { src: '/assets/green-tea/detail-7.png', label: '细节图 06' },
      { src: '/assets/green-tea/detail-8.png', label: '细节图 07' },
      { src: '/assets/green-tea/detail-9.png', label: '细节图 08' },
    ],
  },
];

const greenTeaGalleryImages = greenTeaGallerySections.flatMap((section) =>
  section.items.map((item) => ({ ...item, section: section.title })),
);

const flowerDepilatoryConcept = [
  '蓝色调统一贯穿软管与外盒，形成强烈的视觉识别，在货架上能快速脱颖而出，同时营造出干净、清爽的夏日氛围，契合脱毛产品的使用场景。',
  '品牌名、产品卖点、装饰符号使用柔雾粉作为点缀，中和蓝色的冷硬感，传递女性向产品的温柔与细腻，也呼应了脱毛后肌肤“柔滑粉嫩”的状态联想。',
  '蓝 + 粉的撞色搭配，既保持了清爽干净的专业感，又兼顾了目标用户（年轻女性）的审美偏好，避免了单一色彩的单调。',
];

const flowerDepilatoryCards = [
  {
    id: 'flower-depilatory-display',
    tag: 'Hero Display',
    title: '花酿脱毛膏展示图',
    img: '/assets/flower-depilatory/display.png?v=20260613-014058',
    naturalWidth: 608,
    naturalHeight: 1087,
    galleryPath: '/flower-depilatory-gallery',
    conceptHeading: {
      cn: '净柔丝滑脱毛膏',
      en: ['Gentle And', 'Silky Hair Removal Cream'],
    },
    concept: flowerDepilatoryConcept,
    conceptHint: '点击图片查看刀版图与细节图。',
  },
];

const flowerDepilatoryGallerySections = [
  {
    title: '刀版图',
    items: [
      { src: '/assets/flower-depilatory/dieline-1.jpg?v=20260614-143638', label: '刀版图 01' },
      { src: '/assets/flower-depilatory/dieline-2.jpg?v=20260613-094308', label: '刀版图 02' },
      { src: '/assets/flower-depilatory/dieline-3.jpg?v=20260613-030042', label: '刀版图 03' },
    ],
  },
  {
    title: '细节图',
    items: [
      { src: '/assets/flower-depilatory/detail-1.png', label: '细节图 01' },
      { src: '/assets/flower-depilatory/detail-3.png?v=20260613-185724', label: '细节图 02' },
      { src: '/assets/flower-depilatory/detail-4.png', label: '细节图 03' },
      { src: '/assets/flower-depilatory/detail-5.png', label: '细节图 04' },
      { src: '/assets/flower-depilatory/detail-6.png', label: '细节图 05' },
      { src: '/assets/flower-depilatory/detail-8.png', label: '细节图 06' },
      { src: '/assets/flower-depilatory/detail-9.png', label: '细节图 07' },
    ],
  },
];

const flowerDepilatoryGalleryImages = flowerDepilatoryGallerySections.flatMap((section) =>
  section.items.map((item) => ({ ...item, section: section.title })),
);

const seaweedCleanserConcept = [
  '主体采用深邃的海军蓝，传递出专业、沉稳、可靠的护肤调性，契合英伦绅士品牌的优雅质感。',
  '向下过渡为清透的浅海蓝，既呼应了“海洋 / 海藻”的核心成分，也直观传递出清爽、洁净、补水的使用感受，让用户一眼就能联想到海洋的纯净与清凉。',
  '管身与包装盒上的手绘感波浪线条，线条的流动感体现产品的“清洁、自然、水润”的概念，强化产品的天然海洋属性。',
];

const seaweedCleanserCards = [
  {
    id: 'seaweed-cleanser-display',
    tag: 'Hero Display',
    title: '海藻净透洁面乳展示图',
    img: '/assets/seaweed-cleanser/display.png?v=20260619-043147',
    naturalWidth: 797,
    naturalHeight: 1427,
    galleryPath: '/seaweed-cleanser-gallery',
    conceptHeading: {
      cn: '海藻净透洁面乳',
      en: ['SEAWEED', 'PURIFYING CLEANSER'],
    },
    concept: seaweedCleanserConcept,
    conceptHint: '点击图片查看刀版图与细节图。',
  },
];

const seaweedCleanserGallerySections = [
  {
    title: '刀版图',
    items: [
      { src: '/assets/seaweed-cleanser/dieline-1.jpg?v=20260614-143519', label: '刀版图 01' },
      { src: '/assets/seaweed-cleanser/dieline-2.jpg?v=20260613-094751', label: '刀版图 02' },
    ],
  },
  {
    title: '细节图',
    items: [
      { src: '/assets/seaweed-cleanser/detail-10.png?v=20260613-084522', label: '细节图 01' },
      { src: '/assets/seaweed-cleanser/detail-12.png?v=20260613-084542', label: '细节图 02' },
      { src: '/assets/seaweed-cleanser/detail-13.png?v=20260613-084549', label: '细节图 03' },
      { src: '/assets/seaweed-cleanser/detail-16.png?v=20260613-084604', label: '细节图 04' },
      { src: '/assets/seaweed-cleanser/detail-18.png?v=20260613-084559', label: '细节图 05' },
      { src: '/assets/seaweed-cleanser/detail-19.png?v=20260613-184219', label: '细节图 06' },
      { src: '/assets/seaweed-cleanser/detail-20.png?v=20260613-084608', label: '细节图 07' },
    ],
  },
];

const seaweedCleanserGalleryImages = seaweedCleanserGallerySections.flatMap((section) =>
  section.items.map((item) => ({ ...item, section: section.title })),
);

const greenTeaMaskConcept = [
  '仿牛皮纸底色，还原天然原木质感，直观传递无过度化工、可回收环保对应前，是天然护肤包装经典配色，弱化工业彩妆的艳丽感。',
  '植物原色，直观关联「Green Tea 绿茶」核心成分，绿色在视觉上代表天然、修护、舒缓，强化有机植萃的产品属性；棕 + 绿的大地配色组合，取自森林草木。',
  '包装大面积手绘原木年轮纹路：模拟树木横截面纹理，强化森林、自然取材的意象，呼应品牌理念，暗示原料源自天然植物萃取；',
];

const greenTeaMaskCards = [
  {
    id: 'green-tea-mask-display',
    tag: 'Hero Display',
    title: '绿茶保湿润肤面膜展示图',
    img: '/assets/green-tea-mask/display.png?v=20260619-042956',
    naturalWidth: 879,
    naturalHeight: 1574,
    galleryPath: '/green-tea-mask-gallery',
    conceptHeading: {
      cn: '绿茶保湿润肤面膜',
      en: ['Green Tea Moisture', 'Facial Mask'],
    },
    concept: greenTeaMaskConcept,
    conceptHint: '点击图片查看刀版图与细节图。',
  },
];

const greenTeaMaskGallerySections = [
  {
    title: '刀版图',
    items: [
      { src: '/assets/green-tea-mask/dieline-1.jpg?v=20260614-155902', label: '刀版图 01' },
      { src: '/assets/green-tea-mask/dieline-2.jpg?v=20260614-155902', label: '刀版图 02' },
    ],
  },
  {
    title: '细节图',
    items: [
      { src: '/assets/green-tea-mask/detail-1.png?v=20260614-151755', label: '细节图 01' },
      { src: '/assets/green-tea-mask/detail-2.png?v=20260614-154401', label: '细节图 02' },
      { src: '/assets/green-tea-mask/detail-3.png?v=20260614-151753', label: '细节图 03' },
      { src: '/assets/green-tea-mask/detail-4.png?v=20260614-151754', label: '细节图 04' },
      { src: '/assets/green-tea-mask/detail-5.png?v=20260614-153205', label: '细节图 05' },
      { src: '/assets/green-tea-mask/detail-6.png?v=20260614-151755', label: '细节图 06' },
      { src: '/assets/green-tea-mask/detail-7.png?v=20260614-155127', label: '细节图 07' },
    ],
  },
];

const greenTeaMaskGalleryImages = greenTeaMaskGallerySections.flatMap((section) =>
  section.items.map((item) => ({ ...item, section: section.title })),
);

const faceCreamConcept = [
  '米白底色搭配暖橙与金色信息层，传递温和、滋养、修护的护肤感受，弱化高功效护肤容易带来的距离感。',
  '胶原蛋白主题结合圆润瓶型和柔和高光，强化饱满、弹润、细腻的产品联想，让面霜定位更偏轻熟与精致护理。',
  '包装留白与竖向信息排版保持清爽秩序，配合局部暖色点缀提升识别度，使产品在洁净感与高级感之间形成平衡。',
];

const faceCreamCards = [
  {
    id: 'face-cream-display',
    tag: 'Hero Display',
    title: '胶原蛋白赋活面霜展示图',
    img: '/assets/face-cream/display.png?v=20260616-033127',
    naturalWidth: 1143,
    naturalHeight: 2048,
    galleryPath: '/face-cream-gallery',
    conceptHeading: {
      cn: '胶原蛋白赋活面霜',
      en: ['Collagen Revitalizing', 'Face Cream'],
    },
    concept: faceCreamConcept,
    conceptHint: '点击图片查看刀版图与细节图。',
  },
];

const faceCreamGallerySections = [
  {
    title: '刀版图',
    items: [
      { src: '/assets/face-cream/dieline-1.jpg?v=20260614-144202', label: '刀版图 01' },
      { src: '/assets/face-cream/dieline-2.jpg?v=20260614-144202', label: '刀版图 02' },
    ],
  },
  {
    title: '细节图',
    items: [
      { src: '/assets/face-cream/detail-1.png?v=20260614-144850', label: '细节图 01' },
      { src: '/assets/face-cream/detail-2.png?v=20260614-144855', label: '细节图 02' },
      { src: '/assets/face-cream/detail-3.png?v=20260614-144901', label: '细节图 03' },
      { src: '/assets/face-cream/detail-4.png?v=20260614-144905', label: '细节图 04' },
      { src: '/assets/face-cream/detail-5.png?v=20260614-144910', label: '细节图 05' },
      { src: '/assets/face-cream/detail-6.png?v=20260614-144915', label: '细节图 06' },
      { src: '/assets/face-cream/detail-7.png?v=20260614-144920', label: '细节图 07' },
      { src: '/assets/face-cream/detail-8.png?v=20260614-144933', label: '细节图 08' },
    ],
  },
];

const faceCreamGalleryImages = faceCreamGallerySections.flatMap((section) =>
  section.items.map((item) => ({ ...item, section: section.title })),
);

const goldEggSoapConcept = [
  '整体采用统一的香槟暖金色系，用金色直接传递奢养、焕亮的高端护肤氛围，同时统一 24K 金成分的价值定位。',
  '用金黄色盒身、烫金文字与内置金蛋皂搭建视觉层级：半透盒子透出产品形态，烫金大字抓品牌识别，黑色小字承载成分信息。',
  '以立体金色蛋皂为核心视觉符号，搭配顶部贯穿的烫金品牌标识，强化“亮肤、奢养”的产品记忆点。',
];

const goldEggSoapCards = [
  {
    id: 'gold-egg-soap-display',
    tag: 'Hero Display',
    title: '24K黄金亮肤蛋皂展示图',
    img: '/assets/gold-egg-soap/display.png?v=20260620-043900',
    naturalWidth: 1675,
    naturalHeight: 3001,
    galleryPath: '/gold-egg-soap-gallery',
    conceptHeading: {
      cn: '24K黄金亮肤蛋皂',
      en: ['24K Gold Brightening', 'Egg Soap'],
    },
    concept: goldEggSoapConcept,
    conceptHint: '点击图片查看刀版图与细节图。',
  },
];

const goldEggSoapGallerySections = [
  {
    title: '刀版图',
    items: [
      { src: '/assets/gold-egg-soap/dieline-1.jpg?v=20260620-043900', label: '刀版图 01' },
    ],
  },
  {
    title: '细节图',
    items: [
      { src: '/assets/gold-egg-soap/detail-1.png?v=20260620-043900', label: '细节图 01' },
      { src: '/assets/gold-egg-soap/detail-2.png?v=20260620-043900', label: '细节图 02' },
      { src: '/assets/gold-egg-soap/detail-3.png?v=20260620-043900', label: '细节图 03' },
      { src: '/assets/gold-egg-soap/detail-4.png?v=20260620-043900', label: '细节图 04' },
    ],
  },
];

const goldEggSoapGalleryImages = goldEggSoapGallerySections.flatMap((section) =>
  section.items.map((item) => ({ ...item, section: section.title })),
);

const monkeyShampooConcept = [
  '整体采用统一的奶杏米白色系，用低饱和浅色调传递温和、亲肤、日常的洗护氛围，锚定“润养、温和”的产品定位。',
  '同色系瓶身、深棕红文字与大嘴猴 IP 形象搭建视觉层级：奶白瓶身做干净基底，深色文字承载产品信息，卡通形象形成视觉焦点。',
  '搭配简洁的无衬线产品文字，靠大众熟悉的 IP 形象快速拉近距离、强化记忆点，让产品在货架上更有辨识度。',
];

const monkeyShampooCards = [
  {
    id: 'monkey-shampoo-display',
    tag: 'Hero Display',
    title: '大嘴猴精粹润养洗发水展示图',
    img: '/assets/monkey-shampoo/display.png?v=20260620-082300',
    naturalWidth: 1676,
    naturalHeight: 3001,
    galleryPath: '/monkey-shampoo-gallery',
    conceptHeading: {
      cn: '大嘴猴精粹润养洗发水',
      en: ['Essence Moisturizing', 'Shampoo'],
    },
    concept: monkeyShampooConcept,
    conceptHint: '点击图片查看刀版图与细节图。',
  },
];

const monkeyShampooGallerySections = [
  {
    title: '刀版图',
    items: [
      { src: '/assets/monkey-shampoo/dieline-1.jpg?v=20260620-082300', label: '刀版图 01' },
    ],
  },
  {
    title: '细节图',
    items: [
      { src: '/assets/monkey-shampoo/detail-1.png?v=20260620-082300', label: '细节图 01' },
      { src: '/assets/monkey-shampoo/detail-2.png?v=20260620-082300', label: '细节图 02' },
      { src: '/assets/monkey-shampoo/detail-3.png?v=20260620-082300', label: '细节图 03' },
      { src: '/assets/monkey-shampoo/detail-4.png?v=20260620-082300', label: '细节图 04' },
      { src: '/assets/monkey-shampoo/detail-5.png?v=20260620-082300', label: '细节图 05' },
      { src: '/assets/monkey-shampoo/detail-6.png?v=20260620-082300', label: '细节图 06' },
    ],
  },
];

const monkeyShampooGalleryImages = monkeyShampooGallerySections.flatMap((section) =>
  section.items.map((item) => ({ ...item, section: section.title })),
);

const lavenderOilConcept = [
  '包装与标贴统一采用大面积米白色搭配薰衣草插画，直接关联天然植物萃取、纯净舒缓的核心联想，契合薰衣草成分的天然属性。',
  '紫色调的深浅层次（淡紫水彩花穗 + 浅紫信息色块 + 米白基底），既呼应薰衣草花穗的自然生长形态，也营造出柔和、高级质感，区别于廉价护肤品的高饱和配色。',
  '搭配纤细衬线文字，用极简排版中和紫色的柔感，提升轻奢定位，同时强化品牌标识的辨识度与整套包装的视觉统一性。',
];

const lavenderOilCards = [
  {
    id: 'lavender-oil-display',
    tag: 'Hero Display',
    title: '薰衣草舒缓润肤精油展示图',
    img: '/assets/lavender-oil/display.png?v=20260614-233221',
    naturalWidth: 1425,
    naturalHeight: 2552,
    galleryPath: '/lavender-oil-gallery',
    conceptHeading: {
      cn: '薰衣草舒缓润肤精油',
      en: ['Lavender Soothing', 'Essential Oil'],
    },
    concept: lavenderOilConcept,
    conceptHint: '点击图片查看刀版图与细节图。',
  },
];

const lavenderOilGallerySections = [
  {
    title: '刀版图',
    items: [
      { src: '/assets/lavender-oil/dieline-1.jpg?v=20260614-232132', label: '刀版图 01' },
      { src: '/assets/lavender-oil/dieline-2.jpg?v=20260614-232132', label: '刀版图 02' },
    ],
  },
  {
    title: '细节图',
    items: [
      { src: '/assets/lavender-oil/detail-1.png?v=20260614-233222', label: '细节图 01' },
      { src: '/assets/lavender-oil/detail-2.png?v=20260614-233222', label: '细节图 02' },
      { src: '/assets/lavender-oil/detail-3.png?v=20260614-233223', label: '细节图 03' },
      { src: '/assets/lavender-oil/detail-4.png?v=20260614-233223', label: '细节图 04' },
      { src: '/assets/lavender-oil/detail-5.png?v=20260614-233224', label: '细节图 05' },
      { src: '/assets/lavender-oil/detail-6.png?v=20260614-233224', label: '细节图 06' },
      { src: '/assets/lavender-oil/detail-7.png?v=20260614-233224', label: '细节图 07' },
      { src: '/assets/lavender-oil/detail-8.png?v=20260614-233225', label: '细节图 08' },
      { src: '/assets/lavender-oil/detail-9.png?v=20260614-233225', label: '细节图 09' },
    ],
  },
];

const lavenderOilGalleryImages = lavenderOilGallerySections.flatMap((section) =>
  section.items.map((item) => ({ ...item, section: section.title })),
);

const riceSerumConcept = [
  '包装与标贴统一采用米白、暖橙与黑色配色，直接关联天然稻米萃取、保湿提亮、温和养肤的核心联想，契合大米原浆成分的护肤属性。',
  '米白暖金的色彩层次（米白基底 + 暖金瓶盖 + 浅棕稻米元素），既呼应大米原浆的自然色泽，也营造出温润纯净的护肤质感。',
  '包装融入真实稻米与木勺的原料视觉元素，是大米原浆成分的直观符号，进一步强化天然植萃与原料溯源的真实感。',
];

const riceSerumCards = [
  {
    id: 'rice-serum-display',
    tag: 'Hero Display',
    title: '大米精华液展示图',
    img: '/assets/rice-serum/display.png?v=20260618-230346',
    naturalWidth: 2275,
    naturalHeight: 4075,
    galleryPath: '/rice-serum-gallery',
    conceptHeading: {
      cn: '大米原浆面部精华',
      en: ['Rice Raw Pulp', 'Face Serum'],
    },
    concept: riceSerumConcept,
    conceptHint: '点击图片查看刀版图与细节图。',
  },
];

const riceSerumGallerySections = [
  {
    title: '刀版图',
    items: [
      { src: '/assets/rice-serum/dieline-1.jpg?v=20260618-231727', label: '刀版图 01' },
      { src: '/assets/rice-serum/dieline-2.jpg?v=20260618-231727', label: '刀版图 02' },
    ],
  },
  {
    title: '细节图',
    items: [
      { src: '/assets/rice-serum/detail-1.png?v=20260621-041919', label: '细节图 01' },
      { src: '/assets/rice-serum/detail-2.png?v=20260621-041919', label: '细节图 02' },
      { src: '/assets/rice-serum/detail-3.png?v=20260621-041919', label: '细节图 03' },
      { src: '/assets/rice-serum/detail-4.png?v=20260621-041919', label: '细节图 04' },
      { src: '/assets/rice-serum/detail-5.png?v=20260621-041919', label: '细节图 05' },
      { src: '/assets/rice-serum/detail-6.png?v=20260621-041919', label: '细节图 06' },
      { src: '/assets/rice-serum/detail-7.png?v=20260621-041919', label: '细节图 07' },
      { src: '/assets/rice-serum/detail-8.png?v=20260621-041919', label: '细节图 08' },
    ],
  },
];

const riceSerumGalleryImages = riceSerumGallerySections.flatMap((section) =>
  section.items.map((item) => ({ ...item, section: section.title })),
);

const moisturizingMaskConcept = [
  '全系列以高饱和马卡龙分色做系列区隔，用色彩直接传递鲜活、轻快的年轻护肤氛围，同时快速锚定各款成分与功效定位。',
  '每款都用同色系深浅搭建视觉层级，高饱和袋身做底色抓眼，深浅撞色文字承载核心信息，形成统一且规整的系列感。',
  '复古衬线艺术字作为产品名主视觉，搭配顶部固定品牌标识位，强化年轻护肤调性，也提升整个系列的视觉连贯性。',
];

const moisturizingMaskCards = [
  {
    id: 'moisturizing-mask-display',
    tag: 'Hero Display',
    title: '系列保湿面膜展示图',
    img: '/assets/moisturizing-mask/display.png?v=20260618-233820',
    naturalWidth: 1675,
    naturalHeight: 3001,
    galleryPath: '/moisturizing-mask-gallery',
    conceptHeading: {
      cn: '系列保湿面膜',
      en: ['Series Of Moisturizing', 'Facial Masks'],
    },
    concept: moisturizingMaskConcept,
    conceptHint: '点击图片查看刀版图与细节图。',
  },
];

const moisturizingMaskGallerySections = [
  {
    title: '刀版图',
    items: [
      { src: '/assets/moisturizing-mask/dieline-1.jpg?v=20260619-072333', label: '刀版图 01' },
    ],
  },
  {
    title: '细节图',
    items: [
      { src: '/assets/moisturizing-mask/detail-1.png?v=20260618-234331', label: '细节图 01' },
      { src: '/assets/moisturizing-mask/detail-2.png?v=20260618-234331', label: '细节图 02' },
      { src: '/assets/moisturizing-mask/detail-3.png?v=20260618-234331', label: '细节图 03' },
      { src: '/assets/moisturizing-mask/detail-4.png?v=20260618-234331', label: '细节图 04' },
      { src: '/assets/moisturizing-mask/detail-5.png?v=20260618-234331', label: '细节图 05' },
    ],
  },
];

const moisturizingMaskGalleryImages = moisturizingMaskGallerySections.flatMap((section) =>
  section.items.map((item) => ({ ...item, section: section.title })),
);

const hairShineMaskConcept = [
  '棕绿透明的色彩层次（深棕信息承载块 + 橄榄绿成分标识 + 透明袋身基底），呼应橄榄果实的自然色泽，也营造出专业可靠的洗护质感。',
  '搭配真人发丝效果展示与烫金品牌标识，用直观视觉传递产品功效，强化高性价比专业护发的定位。',
  '背景融入中东风格线条建筑元素，是橄榄植萃原产地的文化符号，直接关联天然溯源与异域植萃的核心联想。',
];

const hairShineMaskCards = [
  {
    id: 'hair-shine-mask-display',
    tag: 'Hero Display',
    title: '橄榄盈润顺滑发膜展示图',
    img: '/assets/hair-shine-mask/display.png?v=20260619-043230',
    naturalWidth: 2234,
    naturalHeight: 4001,
    galleryPath: '/hair-shine-mask-gallery',
    conceptHeading: {
      cn: '橄榄盈润顺滑发膜',
      en: ['Olive Moisture-Smooth', 'Hair Mask'],
    },
    concept: hairShineMaskConcept,
    conceptHint: '点击图片查看刀版图与细节图。',
  },
];

const hairShineMaskGallerySections = [
  {
    title: '刀版图',
    items: [
      { src: '/assets/hair-shine-mask/dieline-1.jpg?v=20260618-230533', label: '刀版图 01' },
    ],
  },
  {
    title: '细节图',
    items: [
      { src: '/assets/hair-shine-mask/detail-1.png?v=20260618-230533', label: '细节图 01' },
      { src: '/assets/hair-shine-mask/detail-2.png?v=20260618-230533', label: '细节图 02' },
      { src: '/assets/hair-shine-mask/detail-3.png?v=20260618-230533', label: '细节图 03' },
      { src: '/assets/hair-shine-mask/detail-4.png?v=20260618-230533', label: '细节图 04' },
    ],
  },
];

const hairShineMaskGalleryImages = hairShineMaskGallerySections.flatMap((section) =>
  section.items.map((item) => ({ ...item, section: section.title })),
);

const projectCardSets = [
  flowerDepilatoryCards,
  greenTeaCards,
  seaweedCleanserCards,
  greenTeaMaskCards,
  faceCreamCards,
  lavenderOilCards,
  riceSerumCards,
  moisturizingMaskCards,
  hairShineMaskCards,
  goldEggSoapCards,
  monkeyShampooCards,
];

const galleryConfigs = [
  {
    path: 'green-tea-gallery',
    title: '绿茶精华乳图库',
    sections: greenTeaGallerySections,
    images: greenTeaGalleryImages,
  },
  {
    path: 'flower-depilatory-gallery',
    title: '花酿脱毛膏图库',
    sections: flowerDepilatoryGallerySections,
    images: flowerDepilatoryGalleryImages,
  },
  {
    path: 'seaweed-cleanser-gallery',
    title: '海藻净透洁面乳图库',
    sections: seaweedCleanserGallerySections,
    images: seaweedCleanserGalleryImages,
  },
  {
    path: 'green-tea-mask-gallery',
    title: '绿茶保湿润肤面膜图库',
    sections: greenTeaMaskGallerySections,
    images: greenTeaMaskGalleryImages,
  },
  {
    path: 'face-cream-gallery',
    title: '胶原蛋白赋活面霜图库',
    sections: faceCreamGallerySections,
    images: faceCreamGalleryImages,
  },
  {
    path: 'lavender-oil-gallery',
    title: '薰衣草舒缓润肤精油图库',
    sections: lavenderOilGallerySections,
    images: lavenderOilGalleryImages,
  },
  {
    path: 'rice-serum-gallery',
    title: '大米精华液图库',
    sections: riceSerumGallerySections,
    images: riceSerumGalleryImages,
  },
  {
    path: 'moisturizing-mask-gallery',
    title: '系列保湿面膜图库',
    sections: moisturizingMaskGallerySections,
    images: moisturizingMaskGalleryImages,
  },
  {
    path: 'hair-shine-mask-gallery',
    title: '橄榄盈润顺滑发膜图库',
    sections: hairShineMaskGallerySections,
    images: hairShineMaskGalleryImages,
  },
  {
    path: 'gold-egg-soap-gallery',
    title: '24K黄金亮肤蛋皂图库',
    sections: goldEggSoapGallerySections,
    images: goldEggSoapGalleryImages,
  },
  {
    path: 'monkey-shampoo-gallery',
    title: '大嘴猴精粹润养洗发水图库',
    sections: monkeyShampooGallerySections,
    images: monkeyShampooGalleryImages,
  },
];

const getGalleryConfigByPath = (path) =>
  galleryConfigs.find((config) => path.includes(config.path));

const modelRenderItems = Array.from({ length: 15 }, (_, index) => {
  const number = index + 1;
  return {
    id: `model-render-${number}`,
    white: `/assets/model-render/white-${number}.png?v=20260619-055841`,
    render: `/assets/model-render/render-${number}.jpg?v=20260619-080059`,
  };
});

const warmedImageUrls = new Set();

const warmImage = (src) => {
  if (!src || warmedImageUrls.has(src)) return Promise.resolve();
  warmedImageUrls.add(src);

  const image = new Image();
  image.decoding = 'async';
  image.src = src;

  if (image.decode) {
    return image.decode().catch(() => undefined);
  }

  return new Promise((resolve) => {
    image.onload = resolve;
    image.onerror = resolve;
  });
};

const warmImagesGradually = (urls, batchSize = 2) => {
  let cancelled = false;
  let index = 0;
  let idleId = null;

  const schedule = (callback) => {
    if ('requestIdleCallback' in window) {
      idleId = window.requestIdleCallback(callback, { timeout: 900 });
      return;
    }
    idleId = window.setTimeout(callback, 80);
  };

  const runBatch = () => {
    if (cancelled || index >= urls.length) return;
    const batch = urls.slice(index, index + batchSize);
    index += batchSize;
    Promise.all(batch.map(warmImage)).finally(() => {
      if (!cancelled) schedule(runBatch);
    });
  };

  schedule(runBatch);

  return () => {
    cancelled = true;
    if (idleId === null) return;
    if ('cancelIdleCallback' in window) {
      window.cancelIdleCallback(idleId);
    } else {
      window.clearTimeout(idleId);
    }
  };
};

const MODEL_RENDER_MIN_ZOOM = 0.25;
const MODEL_RENDER_MAX_ZOOM = 0.5;
const MODEL_RENDER_ZOOM_STEP = 0.05;

const toolLogos = [
  { name: 'Adobe Photoshop', src: '/assets/tool-logos/photoshop-real.png?v=20260621-1845' },
  { name: 'Adobe Illustrator', src: '/assets/tool-logos/illustrator-real.png' },
  { name: 'CorelDRAW', src: '/assets/tool-logos/coreldraw-real.png' },
  { name: 'Cinema 4D', src: '/assets/tool-logos/cinema4d-real.png' },
  { name: '即梦', src: '/assets/tool-logos/jimeng-real.png' },
  { name: 'LOVART', src: '/assets/tool-logos/lovart-real.png' },
];

const strengths = [
  {
    icon: ScanLine,
    title: '包装落地把控',
    text: '熟悉美妆包装材质、印刷分版、工艺标注与生产跟进，设计不只停留在效果图。',
  },
  {
    icon: Palette,
    title: '品牌审美判断',
    text: '理解美妆行业审美与用户偏好，能让视觉调性、产品气质与市场表达保持一致。',
  },
  {
    icon: PenTool,
    title: 'AI 辅助创意',
    text: '可将 AI 工具用于灵感探索、情绪板、视觉提案和效率提升，拓展设计表达边界。',
  },
  {
    icon: Layers3,
    title: '多场景输出',
    text: '覆盖包装、品牌、电商、展会物料与渲染提案，适合从概念到交付的完整设计链路。',
  },
];

function MotionVideo() {
  const [shouldRenderVideo, setShouldRenderVideo] = useState(() => (
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: no-preference)').matches
      : false
  ));
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [hasVideoError, setHasVideoError] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: no-preference)');
    const update = () => {
      setShouldRenderVideo(media.matches);
      if (!media.matches) {
        setIsVideoReady(false);
      }
    };
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  const canShowVideo = shouldRenderVideo && !hasVideoError;

  return (
    <>
      <div
        className={`hero-video hero-video-fallback${isVideoReady ? ' is-muted' : ''}`}
        aria-hidden="true"
      />
      {canShowVideo ? (
        <video
          className={`hero-video hero-video-media${isVideoReady ? ' is-ready' : ''}`}
          src="/assets/hero-background.mp4"
          muted
          autoPlay
          loop
          playsInline
          preload="auto"
          onLoadedData={() => setIsVideoReady(true)}
          onCanPlay={() => setIsVideoReady(true)}
          onError={() => setHasVideoError(true)}
          aria-hidden="true"
        />
      ) : null}
    </>
  );
}

function TopNav({ isMusicPlaying, onToggleMusic }) {
  const navItems = [
    { label: '关于我', href: '#experience' },
    { label: '项目', href: '#projects' },
    { label: '能力', href: '#strengths' },
    { label: '联系', href: '#contact' },
  ];

  return (
    <nav className="top-nav" aria-label="主导航">
      <a className="nav-logo" href="#home" aria-label="陈程个人作品集首页">
        <img src="/assets/logo.png" alt="陈程 LOGO" />
      </a>
      <div className="nav-tabs">
        {navItems.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </div>
      <button
        className={`music-player ${isMusicPlaying ? 'is-playing' : ''}`}
        type="button"
        aria-label={isMusicPlaying ? '暂停音乐' : '播放音乐'}
        aria-pressed={isMusicPlaying}
        onClick={onToggleMusic}
      >
        <span className="music-bars" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        {isMusicPlaying ? <Pause size={14} /> : <Play size={14} />}
      </button>
    </nav>
  );
}

function SideRail() {
  return (
    <aside className="side-rail" aria-label="快速导航">
      <div className="side-rail-item">
        <span className="side-rail-trigger" aria-label="微信二维码入口">
          <UserRound />
        </span>
        <div className="wechat-popover" role="dialog" aria-label="微信二维码">
          <p>扫一扫，添加微信</p>
          <img src="/assets/wechat-qr.png" alt="微信二维码" loading="lazy" decoding="async" />
        </div>
      </div>
      <a href="#experience" aria-label="经历">
        <Home />
      </a>
      <a href="#projects" aria-label="项目">
        <PackageCheck />
      </a>
    </aside>
  );
}

function ImageTile({ className = '', src, alt, children }) {
  return (
    <div className={`image-tile ${className}`}>
      <img src={src} alt={alt} loading="lazy" decoding="async" />
      {children}
    </div>
  );
}

function ProjectGalleryWindow({ sections, images, title, isOverlay = false, onClose }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const dragState = useRef(null);
  const touchState = useRef({
    mode: null,
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
    originX: 0,
    originY: 0,
    distance: 0,
    zoom: 1,
  });
  const activeImage = images[activeIndex];
  const minZoom = 1;
  const maxZoom = 2.6;
  const clampZoom = (value) => Math.min(maxZoom, Math.max(minZoom, Number(value.toFixed(2))));
  const getTouchDistance = (touches) => {
    const [first, second] = touches;
    return Math.hypot(first.clientX - second.clientX, first.clientY - second.clientY);
  };
  const updateZoom = (nextValue) => {
    setZoom((currentZoom) => {
      const value = typeof nextValue === 'function' ? nextValue(currentZoom) : nextValue;
      return clampZoom(value);
    });
  };
  const showPrevious = () =>
    setActiveIndex((index) => (index === 0 ? images.length - 1 : index - 1));
  const showNext = () =>
    setActiveIndex((index) => (index === images.length - 1 ? 0 : index + 1));
  const handleViewerWheel = (event) => {
    event.preventDefault();
    updateZoom((currentZoom) => currentZoom + (event.deltaY > 0 ? -0.12 : 0.12));
  };
  const handleDragStart = (event) => {
    if (event.pointerType === 'touch') return;
    if (zoom <= 1) {
      return;
    }
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    dragState.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: pan.x,
      originY: pan.y,
    };
  };
  const handleDragMove = (event) => {
    if (!dragState.current) {
      return;
    }
    const { startX, startY, originX, originY } = dragState.current;
    setPan({
      x: originX + event.clientX - startX,
      y: originY + event.clientY - startY,
    });
  };
  const handleDragEnd = (event) => {
    if (!dragState.current) {
      return;
    }
    if (event.currentTarget.hasPointerCapture(dragState.current.pointerId)) {
      event.currentTarget.releasePointerCapture(dragState.current.pointerId);
    }
    dragState.current = null;
  };
  const handleTouchStart = (event) => {
    if (event.touches.length === 2) {
      touchState.current = {
        mode: 'pinch',
        startX: 0,
        startY: 0,
        lastX: 0,
        lastY: 0,
        originX: pan.x,
        originY: pan.y,
        distance: getTouchDistance(event.touches),
        zoom,
      };
      return;
    }

    if (event.touches.length !== 1) return;

    const touch = event.touches[0];
    touchState.current = {
      mode: 'swipe',
      startX: touch.clientX,
      startY: touch.clientY,
      lastX: touch.clientX,
      lastY: touch.clientY,
      originX: pan.x,
      originY: pan.y,
      distance: 0,
      zoom,
    };
  };
  const handleTouchMove = (event) => {
    const currentTouch = touchState.current;

    if (event.touches.length === 2 && currentTouch.mode === 'pinch') {
      event.preventDefault();
      const distance = getTouchDistance(event.touches);
      if (!currentTouch.distance) return;
      updateZoom(currentTouch.zoom * (distance / currentTouch.distance));
      return;
    }

    if (event.touches.length !== 1 || currentTouch.mode !== 'swipe') return;

    const touch = event.touches[0];
    currentTouch.lastX = touch.clientX;
    currentTouch.lastY = touch.clientY;
    const deltaX = currentTouch.lastX - currentTouch.startX;
    const deltaY = currentTouch.lastY - currentTouch.startY;

    if (zoom > 1.02) {
      event.preventDefault();
      setPan({
        x: currentTouch.originX + deltaX,
        y: currentTouch.originY + deltaY,
      });
      return;
    }

    if (zoom <= 1.02 && Math.abs(deltaX) > 14 && Math.abs(deltaX) > Math.abs(deltaY) * 1.15) {
      event.preventDefault();
    }
  };
  const handleTouchEnd = () => {
    const currentTouch = touchState.current;
    if (currentTouch.mode === 'swipe' && zoom <= 1.02) {
      const deltaX = currentTouch.lastX - currentTouch.startX;
      const deltaY = currentTouch.lastY - currentTouch.startY;
      if (Math.abs(deltaX) > 54 && Math.abs(deltaX) > Math.abs(deltaY) * 1.4) {
        if (deltaX < 0) {
          showNext();
        } else {
          showPrevious();
        }
      }
    }

    touchState.current = {
      mode: null,
      startX: 0,
      startY: 0,
      lastX: 0,
      lastY: 0,
      originX: 0,
      originY: 0,
      distance: 0,
      zoom: 1,
    };
  };
  const closeGallery = () => {
    if (onClose) {
      onClose();
      return;
    }
    markProjectGalleryReturn();
    const returnUrl = window.sessionStorage.getItem(PROJECT_GALLERY_RETURN_URL_KEY);
    if (returnUrl && window.history.length > 1) {
      window.history.back();
      window.setTimeout(() => {
        if (window.location.pathname.includes('-gallery')) {
          window.location.replace(returnUrl);
        }
      }, 360);
      return;
    }
    window.location.replace(returnUrl || '/#projects');
  };

  useEffect(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, [activeIndex]);

  useEffect(() => {
    if (zoom <= 1) {
      setPan({ x: 0, y: 0 });
    }
  }, [zoom]);

  return (
    <main className={`gallery-window${isOverlay ? ' gallery-window--overlay' : ''}`}>
      <button className="gallery-close" type="button" aria-label="关闭图库" onClick={closeGallery}>
        <span aria-hidden="true">+</span>
      </button>
      <section className="gallery-stage" aria-label={title}>
        <div className="gallery-zoom-controls" aria-label="图片缩放控制">
          <button type="button" aria-label="缩小图片" onClick={() => updateZoom((value) => value - 0.15)}>
            <ZoomOut />
          </button>
          <input
            type="range"
            min={minZoom}
            max={maxZoom}
            step="0.05"
            value={zoom}
            aria-label="缩放比例"
            onChange={(event) => updateZoom(Number(event.target.value))}
          />
          <button type="button" aria-label="放大图片" onClick={() => updateZoom((value) => value + 0.15)}>
            <ZoomIn />
          </button>
          <span>{Math.round(zoom * 100)}%</span>
        </div>
        <button className="gallery-nav gallery-nav-prev" type="button" aria-label="上一张" onClick={showPrevious}>
          ‹
        </button>
        <figure
          className="gallery-viewer"
          onWheel={handleViewerWheel}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
        >
          <span
            className="gallery-image-card"
            style={{
              '--gallery-zoom': zoom,
              '--gallery-pan-x': `${pan.x}px`,
              '--gallery-pan-y': `${pan.y}px`,
            }}
            onPointerDown={handleDragStart}
            onPointerMove={handleDragMove}
            onPointerUp={handleDragEnd}
            onPointerCancel={handleDragEnd}
          >
            <img src={activeImage.src} alt={activeImage.label} draggable="false" decoding="async" />
          </span>
        </figure>
        <button className="gallery-nav gallery-nav-next" type="button" aria-label="下一张" onClick={showNext}>
          ›
        </button>
        <div className="gallery-thumbs" aria-label="图库缩略图">
          {sections.map((section) => (
            <div className="gallery-thumb-group" key={section.title}>
              <span className="gallery-thumb-label">{section.title}</span>
              <div className="gallery-thumb-row">
                {section.items.map((image) => {
                  const index = images.findIndex((item) => item.src === image.src);
                  return (
                    <button
                      key={image.src}
                      type="button"
                      className={index === activeIndex ? 'is-active' : ''}
                      aria-label={image.label}
                      onClick={() => setActiveIndex(index)}
                    >
                      <img src={image.src} alt="" loading="lazy" decoding="async" />
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default function App() {
  const [isProfileInfoOpen, setIsProfileInfoOpen] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [selectedModelRender, setSelectedModelRender] = useState(null);
  const [activeProjectGallery, setActiveProjectGallery] = useState(null);
  const [modelRenderZoom, setModelRenderZoom] = useState(MODEL_RENDER_MIN_ZOOM);
  const [isModelRenderDragging, setIsModelRenderDragging] = useState(false);
  const musicRef = useRef(null);
  const modelRenderViewportRef = useRef(null);
  const modelRenderDragRef = useRef({
    pointerId: null,
    startX: 0,
    startY: 0,
    scrollLeft: 0,
    scrollTop: 0,
  });
  const modelRenderTouchRef = useRef({
    mode: null,
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
    distance: 0,
    zoom: MODEL_RENDER_MIN_ZOOM,
    scrollLeft: 0,
    scrollTop: 0,
  });
  const mailHref = useMemo(() => `mailto:${profile.email}`, []);
  const telHref = useMemo(() => `tel:${profile.phone}`, []);
  const galleryConfig = galleryConfigs.find((config) => window.location.pathname.includes(config.path));

  useEffect(() => {
    if (!activeProjectGallery) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [activeProjectGallery]);

  useEffect(() => {
    const renderUrls = modelRenderItems.map((item) => item.render);
    const stage = document.querySelector('.model-render-stage');
    let stopWarming;

    const startWarming = () => {
      if (stopWarming) return;
      stopWarming = warmImagesGradually(renderUrls, 3);
    };

    if (!stage || !('IntersectionObserver' in window)) {
      const timer = window.setTimeout(startWarming, 1200);
      return () => {
        window.clearTimeout(timer);
        stopWarming?.();
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        startWarming();
        observer.disconnect();
      },
      { rootMargin: '1600px 0px' },
    );

    observer.observe(stage);

    return () => {
      observer.disconnect();
      stopWarming?.();
    };
  }, []);

  const toggleMusic = async () => {
    const music = musicRef.current;
    if (!music) return;

    if (!music.paused) {
      music.pause();
      setIsMusicPlaying(false);
      return;
    }

    try {
      await music.play();
      setIsMusicPlaying(true);
    } catch {
      setIsMusicPlaying(false);
    }
  };

  useEffect(() => {
    if (!selectedModelRender) return undefined;
    setModelRenderZoom(MODEL_RENDER_MIN_ZOOM);
    setIsModelRenderDragging(false);
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSelectedModelRender(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedModelRender]);

  const handleModelRenderWheel = (event) => {
    event.preventDefault();
    const direction = event.deltaY < 0 ? 1 : -1;
    setModelRenderZoom((currentZoom) => {
      const nextZoom = currentZoom + direction * MODEL_RENDER_ZOOM_STEP;
      return Math.min(MODEL_RENDER_MAX_ZOOM, Math.max(MODEL_RENDER_MIN_ZOOM, Number(nextZoom.toFixed(2))));
    });
  };

  const showAdjacentModelRender = (direction) => {
    if (!selectedModelRender) return;
    const currentIndex = modelRenderItems.findIndex((item) => item.id === selectedModelRender.id);
    if (currentIndex < 0) return;
    const nextIndex = (currentIndex + direction + modelRenderItems.length) % modelRenderItems.length;
    setSelectedModelRender(modelRenderItems[nextIndex]);
  };

  const getModelRenderTouchDistance = (touches) => {
    const [first, second] = touches;
    return Math.hypot(first.clientX - second.clientX, first.clientY - second.clientY);
  };

  const handleModelRenderPointerDown = (event) => {
    if (event.pointerType === 'touch') return;
    if (event.button !== 0) return;
    const viewport = modelRenderViewportRef.current;
    if (!viewport) return;

    modelRenderDragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      scrollLeft: viewport.scrollLeft,
      scrollTop: viewport.scrollTop,
    };
    viewport.setPointerCapture(event.pointerId);
    setIsModelRenderDragging(true);
  };

  const handleModelRenderPointerMove = (event) => {
    const viewport = modelRenderViewportRef.current;
    const drag = modelRenderDragRef.current;
    if (!viewport || drag.pointerId !== event.pointerId) return;

    viewport.scrollLeft = drag.scrollLeft - (event.clientX - drag.startX);
    viewport.scrollTop = drag.scrollTop - (event.clientY - drag.startY);
  };

  const stopModelRenderDrag = (event) => {
    const viewport = modelRenderViewportRef.current;
    const drag = modelRenderDragRef.current;
    if (viewport && drag.pointerId === event.pointerId && viewport.hasPointerCapture(event.pointerId)) {
      viewport.releasePointerCapture(event.pointerId);
    }
    modelRenderDragRef.current.pointerId = null;
    setIsModelRenderDragging(false);
  };

  const handleModelRenderTouchStart = (event) => {
    const viewport = modelRenderViewportRef.current;
    if (!viewport) return;

    if (event.touches.length === 2) {
      modelRenderTouchRef.current = {
        mode: 'pinch',
        startX: 0,
        startY: 0,
        lastX: 0,
        lastY: 0,
        distance: getModelRenderTouchDistance(event.touches),
        zoom: modelRenderZoom,
        scrollLeft: viewport.scrollLeft,
        scrollTop: viewport.scrollTop,
      };
      return;
    }

    if (event.touches.length !== 1) return;

    const touch = event.touches[0];
    modelRenderTouchRef.current = {
      mode: 'swipe',
      startX: touch.clientX,
      startY: touch.clientY,
      lastX: touch.clientX,
      lastY: touch.clientY,
      distance: 0,
      zoom: modelRenderZoom,
      scrollLeft: viewport.scrollLeft,
      scrollTop: viewport.scrollTop,
    };
  };

  const handleModelRenderTouchMove = (event) => {
    const viewport = modelRenderViewportRef.current;
    const state = modelRenderTouchRef.current;
    if (!viewport) return;

    if (event.touches.length === 2 && state.mode === 'pinch') {
      event.preventDefault();
      const distance = getModelRenderTouchDistance(event.touches);
      if (!state.distance) return;
      const nextZoom = state.zoom * (distance / state.distance);
      setModelRenderZoom(Math.min(MODEL_RENDER_MAX_ZOOM, Math.max(MODEL_RENDER_MIN_ZOOM, Number(nextZoom.toFixed(2)))));
      return;
    }

    if (event.touches.length !== 1 || state.mode !== 'swipe') return;

    const touch = event.touches[0];
    state.lastX = touch.clientX;
    state.lastY = touch.clientY;
    const deltaX = state.lastX - state.startX;
    const deltaY = state.lastY - state.startY;

    if (modelRenderZoom > MODEL_RENDER_MIN_ZOOM + 0.02) {
      event.preventDefault();
      viewport.scrollLeft = state.scrollLeft - deltaX;
      viewport.scrollTop = state.scrollTop - deltaY;
      return;
    }

    if (Math.abs(deltaX) > 14 && Math.abs(deltaX) > Math.abs(deltaY) * 1.15) {
      event.preventDefault();
    }
  };

  const handleModelRenderTouchEnd = () => {
    const state = modelRenderTouchRef.current;
    if (state.mode === 'swipe' && modelRenderZoom <= MODEL_RENDER_MIN_ZOOM + 0.02) {
      const deltaX = state.lastX - state.startX;
      const deltaY = state.lastY - state.startY;
      if (Math.abs(deltaX) > 54 && Math.abs(deltaX) > Math.abs(deltaY) * 1.4) {
        showAdjacentModelRender(deltaX < 0 ? 1 : -1);
      }
    }

    modelRenderTouchRef.current = {
      mode: null,
      startX: 0,
      startY: 0,
      lastX: 0,
      lastY: 0,
      distance: 0,
      zoom: MODEL_RENDER_MIN_ZOOM,
      scrollLeft: 0,
      scrollTop: 0,
    };
  };

  useEffect(() => {
    if (galleryConfig) return undefined;
    const shouldSkipProjectIntro = window.sessionStorage.getItem(PROJECT_SKIP_INTRO_KEY) === '1';
    const projectReturnY = Number(window.sessionStorage.getItem(PROJECT_GALLERY_RETURN_Y_KEY));
    const restoreTimers = [];

    if (shouldSkipProjectIntro) {
      window.sessionStorage.removeItem(PROJECT_SKIP_INTRO_KEY);
      [40, 180, 520].forEach((delay, index, delays) => {
        const timer = window.setTimeout(() => {
        if (Number.isFinite(projectReturnY)) {
          window.scrollTo({ top: projectReturnY, left: 0, behavior: 'auto' });
          if (index === delays.length - 1) {
            window.sessionStorage.removeItem(PROJECT_GALLERY_RETURN_Y_KEY);
            window.sessionStorage.removeItem(PROJECT_GALLERY_RETURN_URL_KEY);
          }
        }
        }, delay);
        restoreTimers.push(timer);
      });
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set('.opening-mask', { autoAlpha: 0, pointerEvents: 'none' });
      return () => {
        restoreTimers.forEach((timer) => window.clearTimeout(timer));
      };
    }

    if (window.matchMedia('(max-width: 820px)').matches) {
      gsap.set('.opening-mask', { autoAlpha: 0, pointerEvents: 'none' });
      gsap.set('.hero-kicker, .hero-title-line, .hero-role-title, .hero-role-en, .hero-quote, .hero-quote-cn, .top-nav, .hero-mini-title', {
        y: 0,
        scaleY: 1,
        autoAlpha: 1,
        clipPath: 'inset(0 0 0% 0)',
      });
      gsap.set('.side-rail', { autoAlpha: 0 });
      return () => {
        restoreTimers.forEach((timer) => window.clearTimeout(timer));
      };
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const heroTitleParts = [
        '.hero-kicker',
        '.hero-title-line',
        '.hero-role-title',
        '.hero-role-en',
        '.hero-quote',
        '.hero-quote-cn',
      ];

      if (shouldSkipProjectIntro) {
        gsap.set('.opening-mask', { autoAlpha: 0, clipPath: 'inset(0 0 100% 0)', pointerEvents: 'none' });
        gsap.set(heroTitleParts, {
          y: 0,
          scaleY: 1,
          clipPath: 'inset(0 0 0% 0)',
          transformOrigin: '50% 100%',
        });
        gsap.set('.hero-video-media', { scale: 1, filter: 'saturate(0.82) contrast(1.04) blur(0px)' });
        gsap.set('.top-nav, .side-rail, .hero-mini-title', { y: 0, autoAlpha: 1 });
      } else {
        gsap.set(heroTitleParts, {
          y: 120,
          scaleY: 0.72,
          clipPath: 'inset(0 0 100% 0)',
          transformOrigin: '50% 100%',
        });
        gsap.set('.hero-video-media', { scale: 1.035, filter: 'saturate(0.72) contrast(1.08) blur(2px)' });
        gsap.set('.top-nav, .side-rail, .hero-mini-title', { y: -22, autoAlpha: 0 });
        gsap.set('.opening-mask span', { y: 80, autoAlpha: 0, scaleX: 0.82 });

        const opening = gsap.timeline({ defaults: { ease: 'expo.inOut' } });
        opening
          .to('.opening-mask span', { y: 0, autoAlpha: 1, scaleX: 1, duration: 1.05 })
          .to('.opening-mask span', { y: -42, scaleY: 0.78, duration: 0.72 }, '+=0.08')
          .to('.opening-mask', { clipPath: 'inset(0 0 100% 0)', duration: 1.35 }, '-=0.18')
          .to('.hero-video-media', { scale: 1, filter: 'saturate(0.82) contrast(1.04) blur(0px)', duration: 1.15 }, '<')
          .to(heroTitleParts, {
            y: 0,
            scaleY: 1,
            clipPath: 'inset(0 0 0% 0)',
            duration: 1.25,
            stagger: 0.11,
            ease: 'expo.out',
          }, '-=0.72')
          .to('.top-nav, .side-rail, .hero-mini-title', {
            y: 0,
            autoAlpha: 1,
            duration: 0.95,
            stagger: 0.08,
            ease: 'power3.out',
          }, '-=0.9');
      }

      const revealTitle = (trigger, targets) => {
        const elements = gsap.utils.toArray(targets).filter((element) => trigger.contains(element));
        if (!elements.length) return;
        gsap.fromTo(
          elements,
          {
            y: 110,
            scaleY: 0.78,
            clipPath: 'inset(0 0 100% 0)',
            transformOrigin: '50% 100%',
          },
          {
            y: 0,
            scaleY: 1,
            clipPath: 'inset(0 0 0% 0)',
            duration: 1.25,
            stagger: 0.1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger,
              start: 'top 74%',
              once: true,
            },
          },
        );
      };

      const revealItems = (trigger, targets, options = {}) => {
        if (!trigger) return;
        const elements = gsap.utils.toArray(targets).filter((element) => trigger.contains(element));
        if (!elements.length) return;
        gsap.fromTo(
          elements,
          {
            y: options.y ?? 96,
            autoAlpha: 0,
            clipPath: options.clipPath ?? 'inset(18% 0 18% 0)',
          },
          {
            y: 0,
            autoAlpha: 1,
            clipPath: 'inset(0% 0 0% 0)',
            duration: options.duration ?? 1.1,
            stagger: options.stagger ?? 0.12,
            ease: 'power4.out',
            scrollTrigger: {
              trigger,
              start: options.start ?? 'top 76%',
              once: true,
            },
          },
        );
      };

      gsap.utils.toArray('.about-canvas, .strengths-canvas, .finale-inner').forEach((section) => {
        revealTitle(section, 'h2, .section-heading span, .finale-brand h2');
        revealItems(section, '.about-portrait, .profile-copy p, .stat-strip > div, .tool-logo-card, .strength-index-row, .finale-brand p, .finale-column, .finale-contact-lines, .finale-legal', {
          y: 72,
          stagger: 0.1,
        });
      });

      gsap.utils.toArray('.green-tea-heading').forEach((heading) => {
        if (shouldSkipProjectIntro) {
          const headingElements = gsap.utils
            .toArray('.project-display-heading, .project-display-index, h2 strong, h2 em')
            .filter((element) => heading.contains(element));
          gsap.set(headingElements, {
            y: 0,
            scaleY: 1,
            autoAlpha: 1,
            clipPath: 'inset(0% 0 0% 0)',
          });
          return;
        }
        revealTitle(heading, '.project-display-heading, .project-display-index, h2 strong, h2 em');
      });

      gsap.utils.toArray('.project-card-slot').forEach((slot, index) => {
        if (shouldSkipProjectIntro) {
          gsap.set(slot, {
            y: index % 3 === 1 ? 100 : 0,
            autoAlpha: 1,
            clearProps: 'clipPath',
          });
          return;
        }
        gsap.fromTo(
          slot,
          {
            y: 120,
            autoAlpha: 0,
            clipPath: 'inset(24% 0 18% 0)',
          },
          {
            y: index % 3 === 1 ? 100 : 0,
            autoAlpha: 1,
            clipPath: 'inset(0% 0 0% 0)',
            duration: 1.2,
            delay: (index % 3) * 0.12,
            ease: 'power4.out',
            onComplete: () => {
              gsap.set(slot, { clearProps: 'clipPath' });
            },
            scrollTrigger: {
              trigger: slot,
              start: 'top 82%',
              once: true,
            },
          },
        );
      });

      revealItems(document.querySelector('.model-render-stage'), '.model-render-card', {
        y: 120,
        stagger: 0.055,
        start: 'top 78%',
      });

      gsap.utils.toArray('.about-portrait img, .work-main img, .work-tall img').forEach((image) => {
        const trigger = image.closest('section') || image;
        gsap.fromTo(
          image,
          { yPercent: -5, scale: 1.06 },
          {
            yPercent: 5,
            scale: 1.02,
            ease: 'none',
            scrollTrigger: {
              trigger,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.4,
            },
          },
        );
      });
    });

    const refreshTimer = gsap.delayedCall(1.2, () => ScrollTrigger.refresh());

    return () => {
      restoreTimers.forEach((timer) => window.clearTimeout(timer));
      refreshTimer.kill();
      ctx.revert();
    };
  }, [galleryConfig]);

  if (galleryConfig) {
    return <ProjectGalleryWindow {...galleryConfig} />;
  }

  return (
    <main className="portfolio-page">
      <div className="opening-mask" aria-hidden="true">
        <span>PORTFOLIO</span>
      </div>
      <section className="poster-hero" id="home">
        <MotionVideo />
        <TopNav isMusicPlaying={isMusicPlaying} onToggleMusic={toggleMusic} />
        <audio
          ref={musicRef}
          src="/assets/audio/three-body.mp3?v=20260613-194557"
          preload="metadata"
          onEnded={() => setIsMusicPlaying(false)}
          aria-hidden="true"
        />
        <SideRail />

        <div className="hero-mini-title">
          <span>陈程的作品空间</span>
          <span>Chen Cheng's Work Space</span>
        </div>
        <div className="hero-title-block">
          <BlurText
            as="span"
            text="Chen Cheng's"
            delay={70}
            animateBy="letters"
            direction="top"
            className="hero-kicker"
            style={{ justifyContent: 'center' }}
          />
          <h1 className="hero-main-title">
            <span className="hero-title-line hero-title-line-combo">
              <BlurText
                as="span"
                text="PERSONAL"
                delay={18}
                animateBy="letters"
                direction="top"
                className="hero-title-word"
                style={{ justifyContent: 'center' }}
              />
              <BlurText
                as="span"
                text="DESIGN"
                delay={18}
                animateBy="letters"
                direction="top"
                className="hero-title-word"
                style={{ justifyContent: 'center' }}
              />
            </span>
            <BlurText
              as="span"
              text="PORTFOLIO"
              delay={18}
              animateBy="letters"
              direction="top"
              className="hero-title-line"
              style={{ justifyContent: 'center' }}
            />
          </h1>
          <BlurText
            as="p"
            text={profile.title}
            delay={36}
            animateBy="letters"
            direction="bottom"
            className="hero-role-title"
            style={{ justifyContent: 'center' }}
          />
          <BlurText
            as="small"
            text="Packaging Design / Graphic Design"
            delay={28}
            animateBy="words"
            direction="bottom"
            className="hero-role-en"
            style={{ justifyContent: 'center' }}
          />
        </div>

        <div className="hero-quote">
          <BlurText
            as="span"
            text="Every surface deserves to be respected"
            delay={42}
            animateBy="words"
            direction="bottom"
            style={{ justifyContent: 'center' }}
          />
          <BlurText
            as="span"
            text="Refined and ready for production"
            delay={42}
            animateBy="words"
            direction="bottom"
            style={{ justifyContent: 'center' }}
          />
        </div>
        <BlurText
          as="div"
          text="每个表面都值得被尊重、精炼并准备好投入生产。"
          delay={24}
          animateBy="letters"
          direction="bottom"
          className="hero-quote-cn"
          style={{ justifyContent: 'center' }}
        />
      </section>

      <section className="editorial-section about-poster" id="experience">
        <div className="poster-canvas about-canvas">
          <article className="profile-copy">
            <h2>
              <strong>关于我的自述</strong>
              <em>About My Self-Introduction</em>
            </h2>
            <div className={`profile-info-panel ${isProfileInfoOpen ? 'is-visible' : ''}`}>
              <div className="profile-info-contact">
                <span>
                  <Phone size={18} />
                  <b>{profile.phone}</b>
                </span>
                <span>
                  <Mail size={18} />
                  <b>{profile.email}</b>
                </span>
                <span>
                  <CalendarDays size={18} />
                  <b>{profile.birth}</b>
                </span>
              </div>
              <div className="profile-info-grid">
                <div>
                  <strong>毕业院校</strong>
                  <span>{profile.school}</span>
                </div>
                <div>
                  <strong>籍贯</strong>
                  <span>{profile.hometown}</span>
                </div>
                <div>
                  <strong>所学专业</strong>
                  <span>{profile.major}</span>
                </div>
                <div>
                  <strong>现住址</strong>
                  <span>{profile.residence}</span>
                </div>
              </div>
            </div>
            <p>
              拥有 7
              年资深化妆品平面设计经验，精通美妆产品包装设计、品牌视觉打造，了解化妆品包装材质及生产工艺。能够从创意构思、材质工艺、建模渲染、印刷分版到成品落地进行完整把控，也能兼顾详情页、主图、活动海报、店铺页面与展会物料等电商视觉。
            </p>
          </article>
          <ImageTile className="about-portrait" src="/assets/designer-headshot.png" alt="陈程肖像">
            <button
              className="portrait-info-toggle"
              type="button"
              aria-label="显示个人资料"
              aria-expanded={isProfileInfoOpen}
              onClick={() => setIsProfileInfoOpen((value) => !value)}
            >
              +
            </button>
          </ImageTile>

          <div className="stat-strip">
            {stats.map((item) => (
              <div key={item.label}>
                <strong>
                  {item.value.endsWith('+') ? (
                    <>
                      {item.value.slice(0, -1)}
                      <sup>+</sup>
                    </>
                  ) : (
                    item.value
                  )}
                </strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="editorial-section project-poster green-tea-poster" id="projects">
        <div className="poster-canvas green-tea-canvas">
          <div className="green-tea-heading">
            <div className="project-display-heading">
              <strong>包装设计展示</strong>
              <em>Packaging Design</em>
            </div>
            <div className="project-display-index" aria-hidden="true">01</div>
            <h2>
              <strong>方寸之间，形塑内外</strong>
              <em>
                Within A Limited Space
                <br />
                Shape Both The Exterior And Interior
              </em>
            </h2>
          </div>

          <div className="green-tea-browser project-card-browser">
            {projectCardSets.map((cards) => (
              <div className="project-card-slot" key={cards[0].id}>
                <Masonry
                  items={cards}
                  ease="power4.out"
                  duration={0.6}
                  stagger={0.06}
                  animateFrom="bottom"
                  scaleOnHover
                  hoverScale={0.95}
                  blurToFocus
                  colorShiftOnHover={false}
                  onItemClick={(item) => {
                    rememberProjectGalleryReturn();
                    setActiveProjectGallery(getGalleryConfigByPath(item.galleryPath));
                  }}
                />
              </div>
            ))}
          </div>

          <div className="green-tea-heading project-section-heading project-section-heading--secondary">
            <div className="project-display-heading">
              <strong>包装建模渲染</strong>
              <em>Packaging Modeling Rendering</em>
            </div>
            <div className="project-display-index" aria-hidden="true">02</div>
            <h2>
              <strong>解构塑型，光影赋形</strong>
              <em>
                Deconstruct And Shape
                <br />
                Endow Form With Light And Shadow
              </em>
            </h2>
          </div>

          <div className="model-render-stage" aria-label="包装建模渲染白膜与渲染展示">
            <div className="model-render-track">
              {[...modelRenderItems, ...modelRenderItems].map((item, index) => (
                <button
                  className="model-render-card"
                  key={`${item.id}-${index}`}
                  type="button"
                  aria-label="查看建模渲染原尺寸图片"
                  onPointerEnter={() => {
                    void warmImage(item.render);
                  }}
                  onFocus={() => {
                    void warmImage(item.render);
                  }}
                  onClick={() => setSelectedModelRender(item)}
                >
                  <img className="model-render-white" src={item.white} alt="" loading="lazy" decoding="async" />
                  <img
                    className="model-render-final"
                    src={item.render}
                    alt=""
                    loading={index < modelRenderItems.length ? 'eager' : 'lazy'}
                    decoding="async"
                    fetchPriority="low"
                  />
                </button>
              ))}
            </div>
          </div>

        </div>
      </section>

      <section className="editorial-section project-poster legacy-project-poster" aria-hidden="true">
        <div className="section-rail-label">IMAGES & VIDEO</div>
        <div className="poster-canvas project-canvas">
          <div className="project-dots" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>

          <ImageTile className="work-main" src={projects[0].image} alt={projects[0].title}>
            <div className="caption-card">
              <span>{projects[0].tag}</span>
              <h2>{projects[0].title}</h2>
              <p>{projects[0].text}</p>
            </div>
          </ImageTile>

          <article className="small-copy">
            <span>OEM / ODM</span>
            <p>熟悉包装材质、工艺标注与大货文件，能把审美判断转化为可生产的视觉系统。</p>
          </article>

          <ImageTile className="work-eye" src="/assets/designer-portrait.png" alt="设计过程" />

          <div className="vertical-number">003</div>

          <article className="blue-panel">
            <span>BRAND VISUAL</span>
            <h3>清晰、克制、可延展。</h3>
            <p>{projects[1].text}</p>
          </article>

          <div className="share-line">
            <Send size={22} />
            <span>share</span>
            <i />
          </div>

          <ImageTile className="work-tall" src={projects[1].image} alt={projects[1].title}>
            <Bookmark className="bookmark" size={24} fill="currentColor" />
          </ImageTile>

          <article className="video-card">
            <ImageTile src={projects[2].image} alt={projects[2].title}>
              <button className="play-button large" aria-label="播放项目视频">
                <Play size={22} fill="currentColor" />
              </button>
            </ImageTile>
            <div>
              <span>{projects[2].tag}</span>
              <h3>{projects[2].title}</h3>
              <p>{projects[2].text}</p>
            </div>
          </article>

          <div className="player-panel">
            <Wifi size={20} />
            <div className="player-meta">
              <strong>Packaging</strong>
              <span>Beauty brand system</span>
            </div>
            <div className="progress">
              <i />
            </div>
            <div className="player-controls">
              <span />
              <strong />
              <span />
            </div>
          </div>

          <div className="phone-card">
            <span>DESIGN</span>
            <strong>READY FOR MARKET</strong>
            <Battery size={20} />
          </div>

          <a className="all-chip" href="#contact">
            ALL
            <ArrowUpRight size={16} />
          </a>
        </div>
      </section>

      <section className="editorial-section strength-poster" id="strengths">
        <div className="poster-canvas strengths-canvas">
          <div className="section-heading strength-index-heading">
            <h2>
              <strong>观美于心，造物于实</strong>
              <em>
                <span>Perceive Beauty in Mind</span>
                <span>Create Substance in Craft</span>
              </em>
            </h2>
            <div className="tool-logo-row" aria-label="常用软件与网页工具">
              {toolLogos.map((tool) => (
                <span className={`tool-logo-card${tool.wide ? ' is-wide' : ''}`} key={tool.name} title={tool.name}>
                  <img src={tool.src} alt={tool.name} loading="lazy" decoding="async" />
                </span>
              ))}
            </div>
          </div>
          <div className="strength-index-list">
            {strengths.map(({ icon: Icon, title, text }) => (
              <article className="strength-index-row" key={title}>
                <span>
                  <strong>{title}</strong>
                  <em>{text}</em>
                </span>
                <Icon size={34} strokeWidth={1.25} aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-finale" id="contact">
        <div className="finale-inner">
          <div className="finale-grid" aria-label="联系与作品集导航">
            <div className="finale-brand">
              <h2>陈程的作品空间</h2>
              <p>聚焦美妆包装、平面视觉与建模渲染，把视觉概念推进到可落地的成品表达。</p>
              <div className="finale-contact-lines">
                <a href={telHref}>
                  <Phone size={15} />
                  {profile.phone}
                </a>
                <a href={mailHref}>
                  <Mail size={15} />
                  {profile.email}
                </a>
              </div>
            </div>
            <div className="finale-column">
              <h3>导航</h3>
              <a href="#home">首页</a>
              <a href="#experience">关于我</a>
              <a href="#projects">项目展示</a>
              <a href="#strengths">能力优势</a>
            </div>
            <div className="finale-column">
              <h3>专业技能</h3>
              <span>包装设计</span>
              <span>平面视觉</span>
              <span>建模渲染</span>
              <span>AI 创意提案</span>
            </div>
            <div className="finale-column finale-social">
              <h3>最后说一句</h3>
              <span>感谢浏览，招人不易，找工作也不易，以上作品均是个人设计作品，恳请面试官/负责人慎重考虑我是否符合公司用人需求，再邀约面试。再次感谢！</span>
            </div>
          </div>
          <div className="finale-legal">
            <span>2026 © 陈程个人设计作品集. 保留所有权利。</span>
            <span>作品展示仅用于个人求职与项目沟通</span>
          </div>
          <Info size={26} />
          <p>AVAILABLE FOR BRAND / PACKAGING / AI VISUAL PROJECTS</p>
          <h2>一起把下一组产品视觉，做得更克制、更高级，也更能落地。</h2>
          <div className="contact-actions">
            <a href={mailHref}>
              <Mail size={18} />
              {profile.email}
            </a>
            <a href={telHref}>
              <Phone size={18} />
              {profile.phone}
            </a>
          </div>
          <div className="footer-meta">
            <span>{profile.name}</span>
            <span>{profile.title}</span>
            <span>
              {profile.school} · {profile.major}
            </span>
          </div>
        </div>
      </section>

      {activeProjectGallery ? (
        <ProjectGalleryWindow
          {...activeProjectGallery}
          isOverlay
          onClose={() => {
            window.sessionStorage.removeItem(PROJECT_SKIP_INTRO_KEY);
            window.sessionStorage.removeItem(PROJECT_GALLERY_RETURN_Y_KEY);
            window.sessionStorage.removeItem(PROJECT_GALLERY_RETURN_URL_KEY);
            setActiveProjectGallery(null);
          }}
        />
      ) : null}

      {selectedModelRender ? (
        <div className="model-render-modal" role="dialog" aria-modal="true" aria-label="建模渲染原尺寸图片">
          <button
            className="model-render-modal-close"
            type="button"
            aria-label="关闭原尺寸图片"
            onClick={() => setSelectedModelRender(null)}
          >
            <span aria-hidden="true">+</span>
          </button>
          <button
            className="model-render-modal-backdrop"
            type="button"
            aria-label="关闭原尺寸图片"
            onClick={() => setSelectedModelRender(null)}
          />
          <div
            className={`model-render-modal-viewport ${isModelRenderDragging ? 'is-dragging' : ''}`}
            ref={modelRenderViewportRef}
            onWheel={handleModelRenderWheel}
            onPointerDown={handleModelRenderPointerDown}
            onPointerMove={handleModelRenderPointerMove}
            onPointerUp={stopModelRenderDrag}
            onPointerCancel={stopModelRenderDrag}
            onTouchStart={handleModelRenderTouchStart}
            onTouchMove={handleModelRenderTouchMove}
            onTouchEnd={handleModelRenderTouchEnd}
            onTouchCancel={handleModelRenderTouchEnd}
          >
            <img
              src={selectedModelRender.render}
              alt=""
              draggable="false"
              decoding="async"
              style={{ zoom: modelRenderZoom }}
            />
          </div>
        </div>
      ) : null}
    </main>
  );
}
