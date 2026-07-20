import { ImageResponse } from "next/og";

export const socialImageAlt = "Butcher - Quality meats, expert service";
export const socialImageSize = {
  width: 1200,
  height: 630,
};
export const socialImageContentType = "image/png";

export function createBrandSocialImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#fbf8f3",
          color: "#790f18",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            alignItems: "center",
            border: "2px solid #e7ddd1",
            display: "flex",
            flexDirection: "column",
            height: "540px",
            justifyContent: "center",
            width: "1110px",
          }}
        >
          <div
            style={{
              alignItems: "center",
              background: "#790f18",
              borderRadius: "22px",
              display: "flex",
              height: "122px",
              justifyContent: "center",
              width: "122px",
            }}
          >
            <svg height="108" viewBox="0 0 64 64" width="108">
              <path
                d="M13 18v28M27 18v28M13 32h14M48 18v18c0 7-4 10-10 10-4 0-7-2-9-5"
                fill="none"
                stroke="#ffffff"
                strokeLinejoin="round"
                strokeWidth="5"
              />
              <path d="M15 51h34" fill="none" stroke="#c9a84c" strokeWidth="3" />
            </svg>
          </div>
          <div
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "86px",
              fontWeight: 700,
              letterSpacing: "-3px",
              marginTop: "28px",
            }}
          >
            Butcher
          </div>
          <div
            style={{
              background: "#c9a84c",
              height: "2px",
              margin: "20px 0 20px",
              width: "120px",
            }}
          />
          <div
            style={{
              color: "#59483e",
              fontFamily: "Arial, sans-serif",
              fontSize: "21px",
              fontWeight: 600,
              letterSpacing: "7px",
              textTransform: "uppercase",
            }}
          >
            Quality meats | Expert service
          </div>
        </div>
      </div>
    ),
    socialImageSize,
  );
}
