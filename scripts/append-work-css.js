const fs = require('fs');
const path = require('path');

const globalCssPath = path.join(__dirname, '../public/assets/css/global.css');

const cssToAppend = `
/* ==========================================================================
   WORK PAGE (CASE STUDIES) SPECIFIC STYLES - PROTOTYPE STUDIO SCROLL
   ========================================================================== */

/* The spotlight section uses dark mode and full height */
.spotlight {
    position: relative;
    width: 100%;
    height: 100svh;
    padding: 2rem;
    overflow: hidden;
    background-color: var(--base-200); /* Dark background */
    color: var(--base-100);
}

.spotlight p {
    font-size: 1.5rem;
    font-weight: 500;
    line-height: 1.25;
    font-family: 'Satoshi', sans-serif;
}

.project-images {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 45%;
    padding: 50svh 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    z-index: 1; /* Keep above background, below names */
}

.project-img {
    width: 100%;
    aspect-ratio: 16/9;
    opacity: 0.5;
    transition: all 0.3s ease;
    overflow: hidden;
    border-radius: 8px;
}

.project-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.project-names {
    position: absolute;
    right: 4rem;
    bottom: 2rem;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    z-index: 2;
}

.project-names p {
    color: rgba(255, 255, 255, 0.3);
    transition: color 0.3s ease;
    font-size: clamp(2rem, 4vw, 3rem);
    text-transform: uppercase;
    font-family: 'Host Grotesk', sans-serif;
    font-weight: 700;
    margin-bottom: 0.5rem;
    letter-spacing: -0.01em;
}

.project-index {
    position: absolute;
    left: 4rem;
    top: 50%; /* Start centered */
    transform: translateY(-50%);
    z-index: 2;
}

.project-index h1 {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: clamp(6rem, 12vw, 14rem);
    font-weight: 900;
    color: var(--base-100);
    line-height: 1;
    margin: 0;
    letter-spacing: -0.02em;
}

.project-index h1,
.project-images,
.project-names p {
    will-change: transform;
}

@media (max-width: 1000px) {
    .project-images {
        width: calc(100% - 4rem);
        gap: 25svh;
    }
    .project-names {
        right: 2rem;
    }
    .project-index {
        left: 2rem;
    }
    .project-names p {
        color: var(--base-100) !important;
    }
}
`;

fs.appendFileSync(globalCssPath, cssToAppend);
console.log('Successfully appended Work page CSS to global.css');
