const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const src = '/home/jay/Downloads/Untitled.jpg';
const outDir = '/home/jay/education/public/assets';

const crops = {
  'logo': '145x45+15+3',
  'user-avatar': '32x32+880+9',
  'sidebar-plane': '115x78+15+235',
  'teacher-thanh': '38x38+22+305',
  'hero-illustration': '265x145+505+62',
  'course-icon-1': '90x75+165+240',
  'course-icon-2': '90x75+285+240',
  'course-icon-3': '90x75+410+240',
  'course-icon-4': '90x75+530+240',
  'course-icon-5': '90x75+650+240',
  'book-1': '105x120+28+475',
  'book-2': '105x120+282+475',
  'book-3': '105x120+505+475',
  'book-4': '105x120+750+475',
  'contest-1': '125x75+32+620',
  'contest-2': '125x75+188+620',
  'contest-3': '125x75+342+620',
  'testi-1': '32x32+517+720',
  'testi-2': '32x32+674+720',
  'testi-3': '32x32+840+720',
  'support-mascot': '195x160+780+770',
  'rank-1': '22x22+802+285',
  'rank-2': '22x22+802+308',
  'rank-3': '22x22+802+328',
  'rank-4': '22x22+802+348',
  'rank-5': '22x22+802+368',
  'achieve-banner': '190x50+790+385',
  'step-1': '45x45+160+380',
  'step-2': '45x45+280+380',
  'step-3': '45x45+400+380',
  'step-4': '45x45+520+380',
  'step-5': '45x45+640+380',
  'aud-1': '36x36+305+410',
  'aud-2': '36x36+455+410',
  'aud-3': '36x36+627+410',
  'aud-4': '36x36+802+410'
};

for (const [name, geom] of Object.entries(crops)) {
  const dest = path.join(outDir, `${name}.png`);
  try {
    execSync(`magick "${src}" -crop ${geom} +repage "${dest}"`);
    console.log(`Saved ${name}`);
  } catch (err) {
    console.error(`Error cropping ${name}:`, err.message);
  }
}
