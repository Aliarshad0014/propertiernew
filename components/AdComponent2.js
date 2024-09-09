import { useEffect } from "react";

const AdComponent2 = () => {
  useEffect(() => {
    // Load the AdSense script
    const script = document.createElement("script");
    script.src =
      "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9403488694655871";
    script.async = true;
    script.crossOrigin = "anonymous";
    document.head.appendChild(script);

    // Initialize AdSense ads
    script.onload = () => {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block", width: "100%", height: "320px" }}
      data-ad-client="ca-pub-9403488694655871"
      data-ad-slot="8362435355"
      data-ad-format="auto"></ins>
  );
};

export default AdComponent2;
