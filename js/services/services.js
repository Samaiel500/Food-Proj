const postServer = async (url, data) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    });

    return await res.json();
};

async function getServer(url) {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Error ${url} status ${res.status}`);
    }

    return await res.json();
}

export {postServer, getServer};