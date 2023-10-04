export function svgUrl(xname){
    const randomColors = [ "#FF5733", "#FFC300", "#85C1E9", "#58D68D", "#9B59B6", "#E74C3C", "#3498DB", "#F39C12",  "#1ABC9C", "#E74C3C", "#2ECC71", "#9B59B6", "#3498DB", "#F39C12",  "#1ABC9C" ];
    const randomColor = randomColors[Math.floor(Math.random() * randomColors.length)];
    function generateSquaredInitialAvatar() {
        const initials = xname ? xname.charAt(0).toUpperCase() : '?';
        return `
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
            <rect width="100" height="100" fill="${randomColor}" />
            <text x="50" y="50" text-anchor="middle" dominant-baseline="central" font-family="Arial, sans-serif" font-size="40" font-weight="bold" fill="white">${initials}</text>
        </svg>
        `;
    }
    const svgMarkup = generateSquaredInitialAvatar(); 
    return `data:image/svg+xml;base64,${btoa(svgMarkup)}`;
}