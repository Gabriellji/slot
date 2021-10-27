const postRoute = async (path, userObj) => {
    const response = await fetch(path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObj),
    });
  
    const data = await response.json();
    console.log(data, 'DATA')
    return data;
  };

  const putRoute = async (path, userObj) => {
    const response = await fetch(path, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObj),
    });

    const data = await response.json();

    return data;
  };

  const getRoute = async (path) => {
    const response = await fetch(path, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    const data = await response.json();
  
    return data;
  };
  
  export { postRoute, putRoute, getRoute };