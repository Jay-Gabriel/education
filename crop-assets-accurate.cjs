const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const src = '/home/jay/Downloads/Untitled.jpg';
const outDir = '/home/jay/education/public/assets';

const crops = {
  'header-logo': '155x42+15+3',
  'user-avatar': '30x30+876+7',
  'hero-students': '248x126+502+76',
  'sidebar-plane': '118x125+12+215',
  'teacher-thanh': '34x34+22+462',
  'course-icon-1': '112x80+160+346',
  'course-icon-2': '112x80+282+346',
  'course-icon-3': '112x80+405+346',
  'course-icon-4': '112x80+526+346',
  'course-icon-5': '112x80+645+346',
  'step-icon-1': '38x38+185+652',
  'step-icon-2': '38x38+300+652',
  'step-icon-3': '38x38+420+652',
  'step-icon-4': '38x38+540+652',
  'step-icon-5': '38x38+662+652',
  'audience-1': '38x38+155+718',
  'audience-2': '38x38+312+718',
  'audience-3': '38x38+465+718',
  'audience-4': '38x38+622+718',
  'audience-5': '38x38+780+718',
  'book-1': '98x128+38+740',
  'book-2': '98x128+278+740',
  'book-3': '98x128+518+740',
  'book-4': '98x128+758+740',
  'contest-1': '130x90+40+942',
  'contest-2': '130x90+195+942',
  'contest-3': '130x90+350+942',
  'testimonial-1': '32x32+518+1078',
  'testimonial-2': '32x32+676+1078',
  'testimonial-3': '32x32+840+1078',
  'support-mascot': '255x140+715+1185',
  'rank-avatar-1': '24x24+802+432',
  'rank-avatar-2': '24x24+802+462',
  'rank-avatar-3': '24x24+802+492',
  'rank-avatar-4': '24x24+802+522',
  'rank-avatar-5': '24x24+802+552',
  'achieve-banner': '212x56+778+570',
  'footer-logo': '145x42+62+1390'
};

for (const [name, geom] of Object.entries(crops)) {
  const dest = path.join(outDir, `${name}.png`);
  try {
    execSync(`magick "${src}" -crop ${geom} +repage "${dest}"`);
  } catch (err) {
    console.error(`Failed ${name}:`, err.message);
  }
}
console.log("All assets cropped accurately.");
