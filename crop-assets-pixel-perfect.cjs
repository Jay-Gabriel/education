const { execSync } = require('child_process');
const path = require('path');

const src = '/home/jay/Downloads/Untitled.jpg';
const outDir = '/home/jay/education/public/assets';

const crops = {
  // Course icons
  'course-icon-1': '104x75+168+350',
  'course-icon-2': '104x75+290+350',
  'course-icon-3': '104x75+412+350',
  'course-icon-4': '104x75+532+350',
  'course-icon-5': '104x75+652+350',

  // Step icons
  'step-icon-1': '32x32+195+568',
  'step-icon-2': '32x32+308+568',
  'step-icon-3': '32x32+423+568',
  'step-icon-4': '32x32+538+568',
  'step-icon-5': '32x32+660+568',

  // Teacher avatar
  'teacher-thanh': '26x26+23+484',

  // Rank avatars
  'rank-avatar-1': '18x18+808+448',
  'rank-avatar-2': '18x18+808+478',
  'rank-avatar-3': '18x18+808+508',
  'rank-avatar-4': '18x18+808+538',
  'rank-avatar-5': '18x18+808+568',

  // Audience avatars
  'audience-1': '32x32+162+628',
  'audience-2': '32x32+312+628',
  'audience-3': '32x32+462+628',
  'audience-4': '32x32+630+628',
  'audience-5': '32x32+808+628',

  // Testimonial avatars
  'testimonial-1': '28x28+533+1108',
  'testimonial-2': '28x28+684+1108',
  'testimonial-3': '28x28+847+1108',

  // Motivational banner
  'achieve-banner': '212x54+778+570'
};

for (const [name, geom] of Object.entries(crops)) {
  const dest = path.join(outDir, `${name}.png`);
  try {
    execSync(`magick "${src}" -crop ${geom} +repage "${dest}"`);
  } catch (err) {
    console.error(`Failed ${name}:`, err.message);
  }
}
console.log("Re-cropped with exact pixel coordinates.");
