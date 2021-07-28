const defaultStyles: any = {
  border: "none",
  "z-index": 2147483647,
  "max-height": "100vh",
  height: "655px",
  width: "100%",
  "max-width": "388px",
  display: "block !important",
  visibility: "visible",
  background: "none transparent",
  opacity: 1,
  "pointer-events": "auto",
  "touch-action": "auto",
  position: "fixed",
  right: "0",
  bottom: "0",
};

interface IConfig {
  readonly email: string;
  siteurl?: string;
}

interface IWidget {
  config: IConfig | null;
  iframe: HTMLIFrameElement | null;
  init: (config: IConfig) => void;
  setupListeners: () => void;
  createIframe: (siteUrl?: string) => void;
  handleMessage: (event: MessageEvent) => void;
}
const Widget: IWidget = {
  iframe: null,
  config: null,
  init: function (config: IConfig) {
    this.config = config;
    this.createIframe(config.siteurl || "");
  },
  createIframe: function (siteUrl?: string) {
    this.iframe = document.createElement("iframe");
    let styles = "";
    for (let key in defaultStyles) {
      styles += key + ": " + defaultStyles[key] + ";";
    }
    this.iframe.setAttribute("style", styles);
    this.iframe.src = siteUrl || "";
    this.iframe.referrerPolicy = "origin";
    document.body.appendChild(this.iframe);
    this.setupListeners();
  },
  setupListeners: function () {
    window.addEventListener("message", this.handleMessage.bind(this));
  },
  handleMessage: function (e) {
    e.preventDefault();
    if (!e.data || typeof e.data !== "string") return;
    let data = JSON.parse(e.data);
    switch (data.action) {
      case "init": {
        if (this.iframe) {
          this.iframe?.contentWindow?.postMessage(
            JSON.stringify(this.config),
            "*"
          );
        }
        break;
      }
      default:
        break;
    }
  },
};

export default Widget;
