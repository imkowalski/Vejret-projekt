async function spotifyPreviewLoad() {
    preview = await fetch("/getPreview")
        .then((res) => res.json())
    return preview
}


function spotify(width, height, tracks) {

}