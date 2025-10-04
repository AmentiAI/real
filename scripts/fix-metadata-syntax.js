const fs = require('fs');
const path = require('path');

// Files with metadata syntax errors
const filesToFix = [
  'app/industries/roofers/page.tsx',
  'app/industries/lawyers/page.tsx',
  'app/industries/contractors/page.tsx',
  'app/industries/page.tsx',
  'app/blog/page.tsx',
  'app/blog/[slug]/page.tsx',
  'app/case-studies/page.tsx',
  'app/contact/page.tsx',
  'app/locations/warwick/page.tsx',
  'app/locations/newport/page.tsx',
  'app/clients/layout.tsx',
  'app/seo-example/page.tsx',
  'app/api/admin/seo/analyze/route.ts'
];

// Fix metadata syntax errors
const fixes = [
  {
    pattern: /\{branding\?\.company_name \|\| "Amenti AI"\}/g,
    replacement: 'Amenti AI'
  },
  {
    pattern: /\{branding\?\.company_name \|\| 'Amenti AI'\}/g,
    replacement: 'Amenti AI'
  },
  {
    pattern: /\{branding\?\.contact_phone \|\| "\(401\) 123-4567"\}/g,
    replacement: '(401) 123-4567'
  },
  {
    pattern: /\{branding\?\.contact_email \|\| "hello@amentiai\.com"\}/g,
    replacement: 'hello@amentiai.com'
  },
  {
    pattern: /\{branding\?\.address \|\| "123 Business Ave"\}/g,
    replacement: '123 Business Ave'
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

console.log('🔄 Fixing metadata syntax errors...\n');

filesToFix.forEach(fixFile);

console.log('\n✅ Metadata syntax fixes complete!');


