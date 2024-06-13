const BASE_URL = "https://localhost:7155"

export async function uploadMusic(e) {
    for (const file of e.target.files) {
        console.log(file)
        let data = new FormData();
        data.append('file', file);

        const response = await fetch(`${BASE_URL}/Music/Upload`, {
            method: 'POST',
            body: data
        });

        const result = await response.json();
        console.log(result);
        return result;
    }
}

export async function getMusic() {
    const result = await fetch(`${BASE_URL}/Music/GetAllMusic`);

    if (!result.ok) throw Error("Couldn't find any music");

    return await result.json()
}