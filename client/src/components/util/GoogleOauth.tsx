import { IconBrandGoogleFilled } from "@tabler/icons-react";

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
        className="cursor-pointer rounded-lg border-2 border-accent p-2 text-accent hover:bg-secondary md:rounded-xl"
        onClick={handleGoogleOauth}
      >
        <IconBrandGoogleFilled className="size-6 sm:size-8 md:size-10" />
      </div>
    </>
  );
}

export default GoogleOauth;
