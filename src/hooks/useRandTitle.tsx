const randText = async () => {
    const chars = ['j', 'e', 'a', 'p', 'o', 'r', 'd', 'y']
    const len = chars.length;
    for (let i = len - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [chars[i], chars[j]] = [chars[j], chars[i]];
    }
    chars[0] = chars[0].toUpperCase();
    // setTitle(chars.join(''));
    return chars.join('')
}

export { randText };