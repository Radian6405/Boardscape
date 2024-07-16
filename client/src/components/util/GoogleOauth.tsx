function GoogleOauth() {
  async function getOAuthURL() {
    const response = await fetch("http://localhost:8000/google-oauth/url", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("failed to fetch");
    }

    const data = await response.json();
    return data.url;
  }

  async function handleGoogleOauth() {
    const redirectURL: string = await getOAuthURL();
    console.log(redirectURL);
    window.location.href = redirectURL;
  }

  return (
    <>
      <div
        className="size-14 cursor-pointer bg-white"
        onClick={handleGoogleOauth}
      ></div>
    </>
  );
}

export default GoogleOauth;
