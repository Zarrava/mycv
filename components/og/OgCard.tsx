import { roleLine } from "@/data/site";

export function OgCard({
  title,
  kicker,
  subtitle,
  portrait,
}: {
  title: string;
  kicker: string;
  subtitle: string;
  portrait?: string;
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "stretch",
        justifyContent: "space-between",
        gap: 48,
        padding: "72px",
        backgroundColor: "#12110f",
        backgroundImage:
          "radial-gradient(circle at 12% 0%, rgba(198,176,138,0.22), transparent 40%), radial-gradient(circle at 100% 12%, rgba(168,144,104,0.14), transparent 34%)",
        color: "#f4efe6",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 4, color: "#c6b08a" }}>
          {kicker.toUpperCase()}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              display: "flex",
              fontSize: portrait ? 60 : 68,
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: -1.5,
            }}
          >
            {title}
          </div>
          <div style={{ display: "flex", fontSize: 28, lineHeight: 1.35, color: "#d9d0c2", maxWidth: 760 }}>
            {subtitle}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 22, color: "#b7ad9e" }}>{roleLine()}</div>
      </div>
      {portrait ? (
        <img
          src={portrait}
          alt=""
          width={340}
          height={460}
          style={{
            width: 340,
            height: 460,
            objectFit: "cover",
            objectPosition: "center top",
            borderRadius: 28,
          }}
        />
      ) : null}
    </div>
  );
}
