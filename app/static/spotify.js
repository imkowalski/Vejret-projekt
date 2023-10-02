let loaded_images = []
let button_add_playlist = false

function drawSpotify(startX, startY, widthX, heightY, tracks) {
    x = (prc) => {
        return widthX * prc / 100;
    }
    y = (prc) => {
        return heightY * prc / 100;
    }
    push()
    fill(0)
    stroke(255)
    rect(startX + x(0), startY + y(0), x(100), y(100), 20)
    fill(255)
    stroke(0)
    textSize(30)
    textAlign(CENTER)
    text("TODAY'S PLAYLIST", startX + x(10), startY + y(5), x(80), y(5))
    if (tracks.length > 0 && loaded_images.length < 4) {
        for (let i = 0; i < 4; i++) {
            loadImage(tracks[i]["album"]["images"][0].url, img => { loaded_images[i] = img; })
        }
    }
    if (loaded_images.length == 4) {
        for (let i = 0; i < 4; i++) {
            if (loaded_images[i] == undefined) {
                break;
            }
            image(loaded_images[i], startX + x(10), startY + y(15)+y(19)*i, x(14), x(14))
            textAlign(LEFT,TOP)
            textSize(22)
            fill(255)
            text(tracks[i]["name"], startX + x(25), startY + y(15) + y(19)*i,x(60), y(5))
            textSize(16)
            fill(200)
            text(tracks[i]["artists"][0]["name"],startX + x(25), startY + y(20) + y(19)*i,x(60), y(5))
        }
    }
    fill(30, 215, 96)
    rect(startX + x(30), startY + y(90), x(40), y(8), 20)
    fill(255)
    noStroke()
    textSize(25)
    textAlign(CENTER, CENTER)
    text("Add Playlist", startX + x(30), startY + y(90), x(40), y(8))
    if (mouseIsPressed && mouseX > startX + x(30) && mouseX < startX + x(70) && mouseY > startY + y(90) && mouseY < startY + y(98) && button_add_playlist == false) {
        print("add playlist")
        fetch("/addPlaylist")
        .then(response => response.json())
        .then(data => window.open(data.external_urls.spotify, "_blank"))

        button_add_playlist = true
    } else if (!mouseIsPressed) {
        button_add_playlist = false
    }
    pop()
}