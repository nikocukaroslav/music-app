const BASE_URL = "https://localhost:7155"

export async function uploadMusic(e) {
    let data = new FormData();
    for (const file of e.target.files) {
        console.log(file)
        data.append('files', file);
    }

    const response = await fetch(`${BASE_URL}/Music/Upload`, {
        method: 'POST',
        body: data
    });

    const result = await response.json();
    console.log(result);
    return result;
}


export async function getMusic() {
    const result = await fetch(`${BASE_URL}/Music/GetAll`);

    if (!result.ok) throw Error("Couldn't find any music");

    return await result.json()
}

export async function deleteMusic(id) {
    const response = await fetch(`${BASE_URL}/Music/Delete/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) throw Error("Couldn't delete music");

    return `Music with id ${id} has been deleted`
}

export async function addAlbum(album) {
    const response = await fetch(`${BASE_URL}/Album/Add`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: album
    })

    const result = await response.json()
    console.log(result)

    return result;
}