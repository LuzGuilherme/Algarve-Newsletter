/**
 * Image Optimization Script
 * Optimizes images in public/images directory using Sharp
 * - Converts large images to WebP format
 * - Resizes images over 2000px width
 * - Compresses to target quality
 * - Keeps originals as backup with .original extension
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const CONFIG = {
    inputDir: path.join(__dirname, '../public/images'),
    maxWidth: 1920,
    maxHeight: 1080,
    jpegQuality: 80,
    webpQuality: 80,
    pngCompressionLevel: 9,
    sizeThresholdKB: 300, // Only optimize files larger than this
    keepOriginals: false, // Set to true to keep .original backups
};

const stats = {
    processed: 0,
    skipped: 0,
    totalSavedBytes: 0,
    errors: [],
};

async function getImageFiles(dir, files = []) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            await getImageFiles(fullPath, files);
        } else if (/\.(jpg|jpeg|png|webp)$/i.test(entry.name)) {
            files.push(fullPath);
        }
    }

    return files;
}

async function optimizeImage(filePath) {
    const fileStats = fs.statSync(filePath);
    const fileSizeKB = fileStats.size / 1024;
    const ext = path.extname(filePath).toLowerCase();
    const relativePath = path.relative(CONFIG.inputDir, filePath);

    // Skip small files
    if (fileSizeKB < CONFIG.sizeThresholdKB) {
        console.log(`  SKIP (${fileSizeKB.toFixed(0)}KB < ${CONFIG.sizeThresholdKB}KB): ${relativePath}`);
        stats.skipped++;
        return;
    }

    console.log(`  Processing: ${relativePath} (${fileSizeKB.toFixed(0)}KB)`);

    try {
        // Read file into buffer first to avoid file locking issues
        const inputBuffer = fs.readFileSync(filePath);
        const image = sharp(inputBuffer);
        const metadata = await image.metadata();

        // Determine if resize is needed
        let pipeline = image;
        if (metadata.width > CONFIG.maxWidth || metadata.height > CONFIG.maxHeight) {
            pipeline = pipeline.resize(CONFIG.maxWidth, CONFIG.maxHeight, {
                fit: 'inside',
                withoutEnlargement: true,
            });
            console.log(`    Resizing from ${metadata.width}x${metadata.height}`);
        }

        // Determine output format and options
        let outputBuffer;
        let outputPath = filePath;

        if (ext === '.png') {
            // Convert PNG to WebP for better compression
            outputBuffer = await pipeline
                .webp({ quality: CONFIG.webpQuality })
                .toBuffer();
            outputPath = filePath.replace(/\.png$/i, '.webp');
            console.log(`    Converting PNG to WebP`);
        } else if (ext === '.webp') {
            outputBuffer = await pipeline
                .webp({ quality: CONFIG.webpQuality })
                .toBuffer();
        } else {
            // JPEG
            outputBuffer = await pipeline
                .jpeg({ quality: CONFIG.jpegQuality, mozjpeg: true })
                .toBuffer();
        }

        const newSizeKB = outputBuffer.length / 1024;
        const savedKB = fileSizeKB - newSizeKB;
        const savedPercent = ((savedKB / fileSizeKB) * 100).toFixed(1);

        // Only save if we actually reduced size
        if (savedKB > 0) {
            // Write to temp file first to avoid corruption
            const tempPath = outputPath + '.tmp';
            fs.writeFileSync(tempPath, outputBuffer);

            // Backup original if configured
            if (CONFIG.keepOriginals) {
                fs.renameSync(filePath, filePath + '.original');
            }

            // Replace with optimized version
            if (fs.existsSync(outputPath) && outputPath !== filePath) {
                // New file (e.g., PNG -> WebP), remove old
                fs.unlinkSync(filePath);
            } else if (fs.existsSync(outputPath)) {
                fs.unlinkSync(outputPath);
            }
            fs.renameSync(tempPath, outputPath);

            console.log(`    ✓ ${fileSizeKB.toFixed(0)}KB → ${newSizeKB.toFixed(0)}KB (saved ${savedPercent}%)`);
            stats.totalSavedBytes += savedKB * 1024;
            stats.processed++;
        } else {
            console.log(`    ✗ No size reduction, skipping`);
            stats.skipped++;
        }

    } catch (error) {
        console.error(`    ✗ Error: ${error.message}`);
        stats.errors.push({ file: relativePath, error: error.message });
    }
}

async function main() {
    console.log('\n🖼️  Image Optimization Script');
    console.log('================================\n');
    console.log(`Config:`);
    console.log(`  - Max dimensions: ${CONFIG.maxWidth}x${CONFIG.maxHeight}`);
    console.log(`  - JPEG quality: ${CONFIG.jpegQuality}`);
    console.log(`  - WebP quality: ${CONFIG.webpQuality}`);
    console.log(`  - Size threshold: ${CONFIG.sizeThresholdKB}KB`);
    console.log(`  - Keep originals: ${CONFIG.keepOriginals}\n`);

    console.log(`Scanning ${CONFIG.inputDir}...\n`);

    const imageFiles = await getImageFiles(CONFIG.inputDir);
    console.log(`Found ${imageFiles.length} image files\n`);

    for (const file of imageFiles) {
        await optimizeImage(file);
    }

    console.log('\n================================');
    console.log('Summary:');
    console.log(`  - Processed: ${stats.processed} files`);
    console.log(`  - Skipped: ${stats.skipped} files`);
    console.log(`  - Total saved: ${(stats.totalSavedBytes / 1024 / 1024).toFixed(2)} MB`);

    if (stats.errors.length > 0) {
        console.log(`  - Errors: ${stats.errors.length}`);
        stats.errors.forEach(e => console.log(`    - ${e.file}: ${e.error}`));
    }

    console.log('\n✅ Done!\n');
}

main().catch(console.error);
