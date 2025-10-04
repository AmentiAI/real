const fs = require('fs');
const path = require('path');

// Files to update with hardcoded values
const filesToUpdate = [
  'app/contact/page.tsx',
  'app/case-studies/page.tsx',
  'app/blog/page.tsx',
  'app/blog/[slug]/page.tsx',
  'app/industries/page.tsx',
  'app/industries/roofers/page.tsx',
  'app/industries/lawyers/page.tsx',
  'app/industries/contractors/page.tsx',
  'app/seo-example/page.tsx',
  'app/clients/layout.tsx',
  'app/clients/login/page.tsx',
  'app/clients/messages/page.tsx',
  'app/clients/dashboard/page.tsx',
  'app/[...slug]/page.tsx'
];

// Replacements to make
const replacements = [
  {
    pattern: /Amenti AI/g,
    replacement: '{branding?.company_name || "Amenti AI"}'
  },
  {
    pattern: /hello@amentiai\.com/g,
    replacement: '{branding?.contact_email || "hello@amentiai.com"}'
  },
  {
    pattern: /support@amentiai\.com/g,
    replacement: '{branding?.contact_email || "support@amentiai.com"}'
  },
  {
    pattern: /\(401\) 123-4567/g,
    replacement: '{branding?.contact_phone || "(401) 123-4567"}'
  },
  {
    pattern: /123 Business Ave/g,
    replacement: '{branding?.address || "123 Business Ave"}'
  },
  {
    pattern: /Providence, RI 02903/g,
    replacement: '{branding?.address || "Providence, RI 02903"}'
  }
];

function updateFile(filePath) {
  try {
    const fullPath = path.join(process.cwd(), filePath);
    
    if (!fs.existsSync(fullPath)) {
      console.log(`File not found: ${filePath}`);
      return;
    }

    let content = fs.readFileSync(fullPath, 'utf8');
    let hasChanges = false;

    // Apply replacements
    replacements.forEach(({ pattern, replacement }) => {
      const newContent = content.replace(pattern, replacement);
      if (newContent !== content) {
        content = newContent;
        hasChanges = true;
      }
    });

    // Add useBranding import if not present and file has branding references
    if (content.includes('branding?.') && !content.includes('useBranding')) {
      // Check if it's a client component or needs to be converted
      if (content.includes("'use client'") || content.includes('"use client"')) {
        // Add useBranding import
        const importMatch = content.match(/import.*from.*['"]/);
        if (importMatch) {
          const lastImportIndex = content.lastIndexOf('import');
          const lastImportEnd = content.indexOf('\n', lastImportIndex);
          content = content.slice(0, lastImportEnd) + 
                   '\nimport { useBranding } from \'@/components/BrandingProvider\'' + 
                   content.slice(lastImportEnd);
          hasChanges = true;
        }
      }
    }

    if (hasChanges) {
      fs.writeFileSync(fullPath, content, 'utf8');
      console.log(`✅ Updated: ${filePath}`);
    } else {
      console.log(`⏭️  No changes needed: ${filePath}`);
    }
  } catch (error) {
    console.error(`❌ Error updating ${filePath}:`, error.message);
  }
}

console.log('🔄 Starting hardcoded value replacement...\n');

filesToUpdate.forEach(updateFile);

console.log('\n✅ Hardcoded value replacement complete!');


