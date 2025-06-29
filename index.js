const fs = require('fs-extra');
const path = require('path');
const marked = require('marked');
const ejs = require('ejs');
const fm = require('front-matter');

// Define paths
const srcPath = path.join(__dirname, 'src');
const distPath = path.join(__dirname, 'dist');
const publicPath = path.join(__dirname, 'public');
const layoutTemplatePath = path.join(__dirname, 'templates', 'layout.ejs');
const indexTemplatePath = path.join(__dirname, 'templates', 'index.ejs');

// Robust function to create an excerpt
function createExcerpt(htmlContent, rawBody) {
    const firstParagraph = htmlContent.match(/<p>(.*?)<\/p>/);
    if (firstParagraph && firstParagraph[1].trim()) {
        return firstParagraph[1].replace(/<[^>]*>/g, '').substring(0, 150) + '...';
    }

    // Fallback: find the first meaningful text block
    const firstH2 = htmlContent.match(/<h2>(.*?)<\/h2>/);
    if (firstH2 && firstH2[1].trim()) {
        return firstH2[1].replace(/<[^>]*>/g, '').substring(0, 150) + '...';
    }
    
    // Fallback: use the raw text body
    if (rawBody) {
        return rawBody.replace(/<[^>]*>/g, '').substring(0, 150) + '...';
    }

    return '';
}

async function build() {
    try {
        const allPosts = [];

        // 1. Clean and create dist directory
        await fs.emptyDir(distPath);
        console.log('Cleaned the dist directory.');

        // 2. Copy public assets
        await fs.copy(publicPath, distPath);
        console.log('Copied public assets.');

        // 3. Read layout template
        const layout = await fs.readFile(layoutTemplatePath, 'utf-8');
        console.log('Loaded HTML template.');

        // 4. Read all markdown files
        const files = await fs.readdir(srcPath);
        const markdownFiles = files.filter(file => path.extname(file) === '.md');
        console.log(`Found ${markdownFiles.length} markdown files.`);

        // 5. Process each markdown file
        for (const file of markdownFiles) {
            const filePath = path.join(srcPath, file);
            const fileContent = await fs.readFile(filePath, 'utf-8');

            // a. Parse front-matter and provide defaults
            const { attributes, body } = fm(fileContent);
            attributes.title = attributes.title || path.basename(file, '.md');
            attributes.author = attributes.author || 'User';
            // Ensure date is a valid and comparable ISO string
            attributes.date = (attributes.date && !isNaN(new Date(attributes.date))) ? new Date(attributes.date).toISOString() : new Date().toISOString();

            // b. Convert markdown to HTML
            const contentHtml = marked.parse(body);

            // c. Render with EJS template
            const renderedHtml = ejs.render(layout, {
                ...attributes,
                theme: attributes.theme || 'fresh', // Default to 'fresh' theme if not specified
                content: contentHtml,
            });

            // d. Write the final HTML to dist
            const outputFileName = path.basename(file, '.md') + '.html';
            const outputPath = path.join(distPath, outputFileName);
            await fs.writeFile(outputPath, renderedHtml);
            console.log(`- Generated: ${outputFileName}`);

            // e. Collect post data for index page
            allPosts.push({
                ...attributes,
                filename: outputFileName,
                excerpt: createExcerpt(contentHtml, body)
            });
        }

        // 6. Generate index page
        const indexTemplate = await fs.readFile(indexTemplatePath, 'utf-8');
        // Sort posts by date robustly
        allPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
        const indexHtml = ejs.render(indexTemplate, { posts: allPosts });
        await fs.writeFile(path.join(distPath, 'index.html'), indexHtml);
        console.log('- Generated: index.html');

        console.log('\n✅ Build successful!');

    } catch (error) {
        console.error('Build failed:');
        console.error(error);
    }
}

build();