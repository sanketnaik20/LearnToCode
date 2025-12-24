/**
 * SEO Component using React 19's native head support
 */
export const SEO = ({ title, description, path, ogType = 'website' }) => {
    const siteTitle = "LearnToCode";
    const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
    const siteUrl = window.location.origin;
    const fullUrl = `${siteUrl}${path || ''}`;
    const defaultDescription = "Master C++ and logic through a gamified, terminal-themed learning experience. Elevate your code architecture skills today.";

    return (
        <>
            <title>{fullTitle}</title>
            <meta name="description" content={description || defaultDescription} />
            
            {/* Open Graph / Facebook */}
            <meta property="og:type" content={ogType} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description || defaultDescription} />
            <meta property="og:image" content={`${siteUrl}/og-image.png`} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={fullUrl} />
            <meta property="twitter:title" content={fullTitle} />
            <meta property="twitter:description" content={description || defaultDescription} />
            <meta property="twitter:image" content={`${siteUrl}/og-image.png`} />

            {/* Canonical Link */}
            <link rel="canonical" href={fullUrl} />
        </>
    );
};
