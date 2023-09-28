function spotify(width, height, tracks) {
    x = (prc) => {
        return width * prc / 100;
    }
    y = (prc) => {
        return height * prc / 100;
    }
    push()
    TextAlign(CENTER)
    Text("Todays Playlist", x(10), y(10), x(80), y(15))

    pop()
}