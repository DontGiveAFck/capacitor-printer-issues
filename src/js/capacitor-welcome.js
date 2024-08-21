import { Browser } from "@capacitor/browser";
import { SplashScreen } from "@capacitor/splash-screen";
import { Printer } from "@capawesome-team/capacitor-printer";
import { Filesystem, Directory } from "@capacitor/filesystem";

window.customElements.define(
  "capacitor-welcome",
  class extends HTMLElement {
    constructor() {
      super();

      SplashScreen.hide();

      const root = this.attachShadow({ mode: "open" });
      root.innerHTML = `
    <main>
      <h1>Capacitor App</h1>
      <p>
        This project is used to create a minimal, reproducible example. Just add
        the affected Capacitor platforms and plugins.
      </p>
      <label for="myInput">Website:</label>
      <input
        type="text"
        id="myInput"
        name="myInput"
        value="https://capacitorjs.com/"
      />
      <button id="open-browser">Open Browser</button>
      <button id="print">Print PDF</button>
    </main>
    `;
    }

    connectedCallback() {
      const self = this;

      self.shadowRoot
        .querySelector("#open-browser")
        .addEventListener("click", async function (event) {
          const input = self.shadowRoot.getElementById("myInput").value;
          if (!input) {
            return;
          }
          await Browser.open({ url: input });
        });

      self.shadowRoot
        .querySelector("#print")
        .addEventListener("click", async function (event) {
          const minimalPDFBase64 = 'JVBERi0xLjEKJcKlwrHDqwoKMSAwIG9iagogIDw8IC9UeXBlIC9DYXRhbG9nCiAgICAgL1BhZ2VzIDIgMCBSCiAgPj4KZW5kb2JqCgoyIDAgb2JqCiAgPDwgL1R5cGUgL1BhZ2VzCiAgICAgL0tpZHMgWzMgMCBSXQogICAgIC9Db3VudCAxCiAgICAgL01lZGlhQm94IFswIDAgMzAwIDE0NF0KICA+PgplbmRvYmoKCjMgMCBvYmoKICA8PCAgL1R5cGUgL1BhZ2UKICAgICAgL1BhcmVudCAyIDAgUgogICAgICAvUmVzb3VyY2VzCiAgICAgICA8PCAvRm9udAogICAgICAgICAgIDw8IC9GMQogICAgICAgICAgICAgICA8PCAvVHlwZSAvRm9udAogICAgICAgICAgICAgICAgICAvU3VidHlwZSAvVHlwZTEKICAgICAgICAgICAgICAgICAgL0Jhc2VGb250IC9UaW1lcy1Sb21hbgogICAgICAgICAgICAgICA+PgogICAgICAgICAgID4+CiAgICAgICA+PgogICAgICAvQ29udGVudHMgNCAwIFIKICA+PgplbmRvYmoKCjQgMCBvYmoKICA8PCAvTGVuZ3RoIDU1ID4+CnN0cmVhbQogIEJUCiAgICAvRjEgMTggVGYKICAgIDAgMCBUZAogICAgKEhlbGxvIFdvcmxkKSBUagogIEVUCmVuZHN0cmVhbQplbmRvYmoKCnhyZWYKMCA1CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDAxOCAwMDAwMCBuIAowMDAwMDAwMDc3IDAwMDAwIG4gCjAwMDAwMDAxNzggMDAwMDAgbiAKMDAwMDAwMDQ1NyAwMDAwMCBuIAp0cmFpbGVyCiAgPDwgIC9Sb290IDEgMCBSCiAgICAgIC9TaXplIDUKICA+PgpzdGFydHhyZWYKNTY1CiUlRU9GCg=='

          const fileName = `My design_${new Date().getTime()}.pdf`;

          const savedFileTemp = await Filesystem.writeFile({
            path: fileName,
            data: minimalPDFBase64,
            directory: Directory.Cache,
          });

          await Printer.printPdf({
            path: savedFileTemp.uri,
          });

          await Filesystem.deleteFile({
            path: savedFileTemp.uri,
          });
        });
    }
  },
);
