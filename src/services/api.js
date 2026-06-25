export async function fetchData() {
  const url = "https://call-center-mu.vercel.app/calls";
  const response = await fetch(url, {
    headers: {
      "X-User-Id": "Aris",
    },
  });

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  return response.json();
}

export async function fetchSpecificData(identification) {
  const url = `https://call-center-mu.vercel.app/calls/${identification}`;
  const response = await fetch(url, {
    headers: {
      "X-User-Id": "Aris",
    },
  });

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  return response.json();
}

export async function updateDeleteCalls(id) {
  const url = `https://call-center-mu.vercel.app/calls/${id}/archive`;
  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      "X-User-Id": "Aris",
    },

    body: JSON.stringify({
      is_archived: true,
    }),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response;
}
