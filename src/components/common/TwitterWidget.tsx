import { useEffect } from "react";

interface TwitterWidgetProps {
  username: string;
  width?: number | string;
  height?: number | string;
  theme?: "light" | "dark";
  /** show only the most recent tweets (max 20) */
  tweetLimit?: number;
}

export function TwitterWidget({
  username,
  width = "100%",
  height = 400,
  theme = "light",
}: TwitterWidgetProps) {
  useEffect(() => {
    // load Twitter embed script if not already present
    if ((window as any).twttr) {
      (window as any).twttr.widgets.load();
    } else {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const href = `https://twitter.com/${username}?ref_src=twsrc%5Etfw`;

  return (
    <a
      className="twitter-timeline"
      data-theme={theme}
      data-width={width}
      data-height={height}
      // Twitter supports tweet limit attribute
      {...(tweetLimit ? {"data-tweet-limit": tweetLimit} : {})}
      href={href}
    >
      Tweets by @{username}
    </a>
  );
}
