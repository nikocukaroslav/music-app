const BASE_URL = "https://localhost:7155";

export async function uploadMusic(e, userId) {
    let data = new FormData();
    for (const file of e.target.files) {
        console.log(file);
        data.append("files", file);

        let audio = new Audio(URL.createObjectURL(file));

        audio.onloadedmetadata = function () {
            data.append("duration", audio.duration);
        }
    }

    data.append("userId", userId);

    const response = await fetch(`${BASE_URL}/Music/Upload`, {
        method: "POST",
        body: data,
    });

    const result = await response.json();

    return result
}

export async function getMusic(userId) {
    const result = await fetch(`${BASE_URL}/Music/GetAll/${userId}`);

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

export async function getAlbums(userId) {
    const response = await fetch(`${BASE_URL}/Album/GetAll/${userId}`);

    if (!response.ok) throw Error("Couldn't find any albums");

    return await response.json();
}

export async function addAlbum(album) {
    const response = await fetch(`${BASE_URL}/Album/Add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(album),
    });

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

    return await response.json()
}

export async function createUser(user) {
    const response = await fetch(`${BASE_URL}/Authorization/CreateUser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        }
    );

    return await response.json()
}

export async function loginUser(user) {
    const response = await fetch(`${BASE_URL}/Authorization/Identify`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        }
    );

    return await response.json()
}

export async function changeLogin(user) {
    const response = await fetch(`${BASE_URL}/Authorization/ChangeLogin`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    })

    return await response.json();
}

export async function changePassword(user) {
    const response = await fetch(`${BASE_URL}/Authorization/ChangePassword`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    })

    return await response.json();
}

export async function deleteUser(id) {
    const response = await fetch(`${BASE_URL}/Authorization/DeleteUser/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })
    if (!response.ok) throw Error("Couldn't delete user");

    return `Music with id ${id} has been deleted`;
}