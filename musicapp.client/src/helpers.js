export function generateGUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export function toShortTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds}`;
}

export function randomColor() {
    const colors = [
        "song-logo-one",
        "song-logo-two",
        "song-logo-three",
        "song-logo-four"
    ];

    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}
