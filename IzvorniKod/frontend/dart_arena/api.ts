export const apiCall = (url: `${string}`, options: RequestInit = {}) => {
    // popravi .env fajl
    return fetch(`http://localhost:8080${url}`, {
      ...options,
      headers: {
        ...options.headers,
        ...(localStorage.getItem("token")
          ? { Authorization: `Bearer ${localStorage.getItem("token")}` }
          : {}),
      },
    }).then(async (res) => {
      let data = null;
      if (res.status === 200) {
        try {
          data = await res.json();
          console.log(data);
          
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      } else {
        data = await res.text();
        console.log(data);
      }
      return [data, res.status] as const;
    });
  };