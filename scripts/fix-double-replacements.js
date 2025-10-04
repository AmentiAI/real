const fs = require('fs');
const path = require('path');

// Files that might have double replacements
const filesToFix = [
  'app/industries/contractors/page.tsx',
  'app/industries/lawyers/page.tsx',
  'app/industries/roofers/page.tsx',
  'app/industries/page.tsx',
  'app/services/[slug]/page.tsx',
  'app/about/page.tsx',
  'app/payment/success/page.tsx',
  'app/locations/warwick/page.tsx',
  'app/payment/cancel/page.tsx',
  'app/locations/newport/page.tsx'
];

// Fix double replacements
const fixes = [
  {
    pattern: /\{branding\?\.contact_phone \|\| '\{branding\?\.contact_phone \|\| "\(401\) 123-4567"\}'\}/g,
    replacement: '{branding?.contact_phone || "(401) 123-4567"}'
  },
  {
    pattern: /\{branding\?\.contact_email \|\| '\{branding\?\.contact_email \|\| "hello@amentiai\.com"\}'\}/g,
    replacement: '{branding?.contact_email || "hello@amentiai.com"}'
  },
  {
    pattern: /\{branding\?\.company_name \|\| '\{branding\?\.company_name \|\| "Amenti AI"\}'\}/g,
    replacement: '{branding?.company_name || "Amenti AI"}'
  },
  {
    pattern: /\{branding\?\.address \|\| '\{branding\?\.address \|\| "123 Business Ave"\}'\}/g,
    replacement: '{branding?.address || "123 Business Ave"}'
  }
];

function fixFile(filePath) {
  try {
    const fullPath = path.join(process.cwd(), filePath);
    
    if (!fs.existsSync(fullPath)) {
      console.log(`File not found: ${filePath}`);
      return;
    }

    let content = fs.readFileSync(fullPath, 'utf8');
    let hasChanges = false;

    // Apply fixes
    fixes.forEach(({ pattern, replacement }) => {
      const newContent = content.replace(pattern, replacement);
      if (newContent !== content) {
        content = newContent;
        hasChanges = true;
      }
    });

    if (hasChanges) {
      fs.writeFileSync(fullPath, content, 'utf8');
      console.log(`✅ Fixed: ${filePath}`);
    } else {
      console.log(`⏭️  No fixes needed: ${filePath}`);
    }
  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error.message);
  }
}

console.log('🔄 Fixing double replacements...\n');

filesToFix.forEach(fixFile);

console.log('\n✅ Double replacement fixes complete!');


