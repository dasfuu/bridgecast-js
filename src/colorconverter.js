
function indexToRGB(index) {
    index = index % 192;

    const segment = Math.floor(index / 32);
    const t = (index % 32) / 31; // normalize 0–1

    let r = 0, g = 0, b = 0;

    switch (segment) {
        case 0: // Red → Yellow
            r = 255;
            g = Math.round(255 * t);
            b = 0;
            break;

        case 1: // Yellow → Green
            r = Math.round(255 * (1 - t));
            g = 255;
            b = 0;
            break;

        case 2: // Green → Cyan
            r = 0;
            g = 255;
            b = Math.round(255 * t);
            break;

        case 3: // Cyan → Blue
            r = 0;
            g = Math.round(255 * (1 - t));
            b = 255;
            break;

        case 4: // Blue → Magenta
            r = Math.round(255 * t);
            g = 0;
            b = 255;
            break;

        case 5: // Magenta → Red
            r = 255;
            g = 0;
            b = Math.round(255 * (1 - t));
            break;
    }

    return { r, g, b };
}
function indexToBytes(index) {
    index = index % 192;

    const segment = Math.floor(index / 32);
    const t = index % 32;

    let B1, B3, base;

    switch (segment) {
        case 0: // 0–31
            B1 = 2;
            B3 = t;
            base = 108;
            break;

        case 1: // 32–63
            B1 = 0;
            B3 = 32 - t;
            base = 110;
            break;

        case 2: // 64–95
            B1 = 4;
            B3 = t;
            base = 106;
            break;

        case 3: // 96–127
            B1 = 2;
            B3 = 32 - t;
            base = 108;
            break;

        case 4: // 128–159
            B1 = 0;
            B3 = t;
            base = 110;
            break;

        case 5: // 160–191
            B1 = 4;
            B3 = 32 - t;
            base = 106;
            break;
    }

    const B2 = 0;
    const B4 = base - B3;

    return [B1, B2, B3, B4];
}
function rgbToIndex(r, g, b) {
    // normalize to 0–1
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;

    let hue;

    if (delta === 0) {
        hue = 0; // grayscale → treat as red
    } else if (max === r) {
        hue = ((g - b) / delta) % 6;
    } else if (max === g) {
        hue = (b - r) / delta + 2;
    } else {
        hue = (r - g) / delta + 4;
    }

    hue *= 60; // degrees

    if (hue < 0) hue += 360;

    // map 0–360 → 0–192
    let index = Math.round((hue / 360) * 192);

    // wrap edge case (360° == 0°)
    if (index === 192) index = 0;

    return index;
}