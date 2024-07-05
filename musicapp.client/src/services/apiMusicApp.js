const BASE_URL = "https://localhost:7155";

export async function uploadMusic(e) {
    let data = new FormData();
    for (const file of e.target.files) {
        console.log(file);
        data.append("files", file);
    }

    const response = await fetch(`${BASE_URL}/Music/Upload`, {
        method: "POST",
        body: data,
    });

    const result = await response.json();
    console.log(result);
    return result;
}

export async function getMusic() {
    const result = await fetch(`${BASE_URL}/Music/GetAll`);

    if (!result.ok) throw Error("Couldn't find any music");

    return await result.json();
}

export async function deleteMusic(id) {
    const response = await fetch(`${BASE_URL}/Music/Delete/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) throw Error("Couldn't delete music");

    return `Music with id ${id} has been deleted`;
}

export async function addAlbum(album) {
    const response = await fetch(`${BASE_URL}/Album/Add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(album),
    });

    const result = await response.json();
    console.log(result);

    return result;
}

export async function getAlbums() {
    const response = await fetch(`${BASE_URL}/Album/GetAll`);

    if (!response.ok) throw Error("Couldn't find any music");

    return await response.json();
}

export async function editAlbum(album) {
    const response = await fetch(`${BASE_URL}/Album/Update`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(album),
    });

    return await response.json();
}

export async function deleteAlbum(id) {
    const response = await fetch(`${BASE_URL}/Album/Delete/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) throw Error("Couldn't delete album");

    return `Music with id ${id} has been deleted`;
}

export async function getAlbum(id) {
    const response = await fetch(`${BASE_URL}/Album/Get/${id}`);

    const result = await response.json();

    return result
}

export async function createUser(user) {
    const response = await fetch(`${BASE_URL}/Authorisation/CreateUser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        }
    );

    const result = await response.json();
    console.log(result)
    return result
}

export async function loginUser(user) {
    const response = await fetch(`${BASE_URL}/Authorisation/Identify`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        }
    );

    const result = await response.json();
   
    return result
}
